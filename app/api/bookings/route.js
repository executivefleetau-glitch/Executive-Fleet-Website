import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { adminBookingNotificationTemplate, clientBookingConfirmationTemplate } from '@/lib/booking-email-templates';
import webpush from 'web-push';
import { getMelbourneOffset, formatDateMelbourne, formatTimeMelbourne } from '@/lib/timezone';

const resend = new Resend(process.env.RESEND_API_KEY);

// Configure web-push for automatic notifications
const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

if (vapidPublicKey && vapidPrivateKey) {
  webpush.setVapidDetails(
    'mailto:admin@executivefleet.com.au',
    vapidPublicKey,
    vapidPrivateKey
  );
}

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Generate unique booking reference (e.g., EF-2024-AB12CD)
function generateBookingReference() {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `EF-${year}-${randomChars}`;
}

// Calculate distance using Google Maps Distance Matrix API
async function calculateDistance(origin, destination, waypoints = []) {
  // Use server-side API key (without referer restrictions) or fallback to public key
  const apiKey = process.env.GOOGLE_MAPS_API_KEY_SERVER || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  try {
    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    // If there are waypoints (additional destinations), add them
    if (waypoints.length > 0) {
      const waypointsStr = waypoints.map(w => encodeURIComponent(w)).join('|');
      url += `&waypoints=${waypointsStr}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
      const distanceMeters = data.rows[0].elements[0].distance.value;
      const durationSeconds = data.rows[0].elements[0].duration.value;

      return {
        distanceKm: (distanceMeters / 1000).toFixed(2),
        durationMinutes: Math.round(durationSeconds / 60)
      };
    }

    console.error('Google Maps API error:', data);
    return { distanceKm: null, durationMinutes: null };
  } catch (error) {
    console.error('Error calculating distance:', error);
    return { distanceKm: null, durationMinutes: null };
  }
}

// Local aliases for the shared helpers (used in email data preparation below)
const formatDate = formatDateMelbourne;
const formatTime = (timeStr, dateStr) => formatTimeMelbourne(timeStr, dateStr);

export async function POST(request) {
  try {
    const formData = await request.json();

    // Validate required fields
    // dropoffLocation is optional for hourly bookings
    const baseRequiredFields = [
      'bookingType', 'pickupDate', 'pickupTime', 'pickupLocation',
      'vehicleId', 'vehicleName', 'customerName',
      'customerEmail', 'customerPhone', 'numberOfPassengers', 'serviceType'
    ];
    
    const requiredFields = formData.bookingType === 'hourly' 
      ? baseRequiredFields 
      : [...baseRequiredFields, 'dropoffLocation'];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Server-side format validation (prevents bypassing client-side checks)
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.customerEmail.trim())) {
      return NextResponse.json({ message: 'Invalid email address format' }, { status: 400 });
    }

    const phoneRaw = formData.customerPhone.trim();
    const phoneDigits = phoneRaw.startsWith('+')
      ? '+' + phoneRaw.slice(1).replace(/[^0-9]/g, '')
      : phoneRaw.replace(/[^0-9]/g, '');
    const isAUPhone = /^(\+61\d{9}|0[2-9]\d{8})$/.test(phoneDigits);
    const isIntlPhone = /^\+?\d{8,15}$/.test(phoneDigits);
    if (!isAUPhone && !isIntlPhone) {
      return NextResponse.json({ message: 'Invalid phone number format' }, { status: 400 });
    }

    const nameTrimmed = formData.customerName.trim();
    if (nameTrimmed.length < 2 || /^\d+$/.test(nameTrimmed)) {
      return NextResponse.json({ message: 'Invalid name' }, { status: 400 });
    }
    
    // For hourly bookings without dropoff, use a default value
    const dropoffLocation = formData.dropoffLocation || (formData.bookingType === 'hourly' ? 'As directed by client' : null);
    if (!dropoffLocation) {
      return NextResponse.json(
        { message: 'Missing required field: dropoffLocation' },
        { status: 400 }
      );
    }

    // Generate unique booking reference
    const bookingReference = generateBookingReference();

    // Calculate distance between locations (optional - don't fail booking if this fails)
    // Skip distance calculation for hourly bookings without real dropoff address
    let distanceKm = null;
    let durationMinutes = null;

    const shouldCalculateDistance = formData.bookingType !== 'hourly' || 
      (formData.dropoffLocation && !formData.dropoffLocation.includes('As directed'));

    if (shouldCalculateDistance && dropoffLocation && !dropoffLocation.includes('As directed')) {
      try {
        const waypoints = formData.additionalDestination ? [formData.additionalDestination] : [];
        const distanceData = await calculateDistance(
          formData.pickupLocation,
          dropoffLocation,
          waypoints
        );
        distanceKm = distanceData.distanceKm;
        durationMinutes = distanceData.durationMinutes;
      } catch (distanceError) {
        console.warn('Distance calculation failed, continuing with booking:', distanceError);
        // Continue with booking even if distance calculation fails
      }
    }

    // Save to database using Prisma
    const savedBooking = await prisma.booking.create({
      data: {
        bookingReference: bookingReference,

        // Trip Details
        bookingType: formData.bookingType,

        pickupDate: new Date(formData.pickupDate),
        pickupTime: new Date(`${formData.pickupDate}T${formData.pickupTime}:00${getMelbourneOffset(new Date(`${formData.pickupDate}T${formData.pickupTime}`))}`),
        expectedEndTime: formData.expectedEndTime ? new Date(`${formData.pickupDate}T${formData.expectedEndTime}:00${getMelbourneOffset(new Date(`${formData.pickupDate}T${formData.expectedEndTime}`))}`) : null,
        pickupLocation: formData.pickupLocation,
        pickupLat: formData.pickupLat || null,
        pickupLng: formData.pickupLng || null,
        dropoffLocation: dropoffLocation,  // Use resolved value for hourly bookings
        dropoffLat: formData.dropoffLat || null,
        dropoffLng: formData.dropoffLng || null,

        // Additional Destination
        additionalDestination: formData.additionalDestination || null,
        additionalDestinationLat: formData.additionalDestinationLat || null,
        additionalDestinationLng: formData.additionalDestinationLng || null,

        // Return Trip
        isReturnTrip: formData.isReturnTrip || false,
        returnPickupLocation: formData.returnPickupLocation || null,
        returnPickupLat: formData.returnPickupLat || null,
        returnPickupLng: formData.returnPickupLng || null,
        returnDropoffLocation: formData.returnDropoffLocation || null,
        returnDropoffLat: formData.returnDropoffLat || null,
        returnDropoffLng: formData.returnDropoffLng || null,
        returnDate: formData.returnDate ? new Date(formData.returnDate) : null,

        returnTime: formData.returnTime ? new Date(`${formData.returnDate}T${formData.returnTime}:00${getMelbourneOffset(new Date(`${formData.returnDate}T${formData.returnTime}`))}`) : null,

        // Calculated Route Info
        calculatedDistanceKm: distanceKm ? parseFloat(distanceKm) : null,
        calculatedDurationMinutes: durationMinutes,

        // Vehicle Selection
        vehicleId: parseInt(formData.vehicleId),
        vehicleName: formData.vehicleName,
        vehicleType: formData.vehicleType || null,

        // Personal Details
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        numberOfPassengers: parseInt(formData.numberOfPassengers),

        // Child Seat Details
        hasChildren: formData.hasChildren || false,
        babyCapsule: parseInt(formData.babyCapsule) || 0,
        babySeat: parseInt(formData.babySeat) || 0,
        boosterSeat: parseInt(formData.boosterSeat) || 0,


        serviceType: formData.serviceType,
        specialInstructions: formData.specialInstructions || null,

        // Airport Transfer specific fields
        flightNumber: formData.flightNumber || null,
        terminalType: formData.terminalType || null,

        // Pricing (to be set by admin later)
        outboundFare: null,
        returnFare: null,
        subtotal: null,
        discount: null,
        finalPrice: null,
        currency: 'AUD',
        confirmationToken: null,

        // Status
        status: 'pending',
        contactStatus: 'uncontacted'
      }
    });

    // Prepare email data
    const emailData = {
      bookingReference,
      bookingType: formData.bookingType,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: dropoffLocation,  // Use resolved value for hourly bookings
      pickupDate: formatDate(formData.pickupDate),
      pickupTime: formatTime(formData.pickupTime, formData.pickupDate),
      expectedEndTime: formData.expectedEndTime ? formatTime(formData.expectedEndTime, formData.pickupDate) : null,
      vehicleName: formData.vehicleName,
      serviceType: formData.serviceType,
      numberOfPassengers: formData.numberOfPassengers,
      hasChildren: formData.hasChildren || false,
      babyCapsule: formData.babyCapsule || 0,
      babySeat: formData.babySeat || 0,
      boosterSeat: formData.boosterSeat || 0,
      isReturnTrip: formData.isReturnTrip,
      returnPickupLocation: formData.returnPickupLocation || null,
      returnDropoffLocation: formData.returnDropoffLocation || null,
      returnDate: formData.returnDate ? formatDate(formData.returnDate) : null,
      returnTime: formData.returnTime ? formatTime(formData.returnTime, formData.returnDate) : null,
      additionalDestination: formData.additionalDestination || null,
      specialInstructions: formData.specialInstructions || null,
      createdAt: new Date().toLocaleString('en-AU', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Australia/Melbourne'
      })
    };

    // Send Admin Notification Email
    try {
      console.log('📧 Sending admin notification email...');
      console.log('   From:', process.env.RESEND_FROM_EMAIL);
      console.log('   To:', process.env.RESEND_TO_EMAIL || 'admin@executive.com.au');
      
      const adminEmailResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.RESEND_TO_EMAIL || 'admin@executive.com.au',
        subject: `New Booking: ${bookingReference} - ${formData.serviceType}`,
        html: adminBookingNotificationTemplate(emailData),
      });
      
      console.log('✅ Admin email sent successfully:', adminEmailResult);
    } catch (emailError) {
      console.error('❌ Failed to send admin email:', {
        error: emailError.message,
        statusCode: emailError.statusCode,
        name: emailError.name,
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.RESEND_TO_EMAIL
      });
      // Don't fail the request if email fails
    }

    // Send Client Confirmation Email (Quote Request)
    try {
      console.log('📧 Sending customer quote request email...');
      console.log('   From:', process.env.RESEND_FROM_EMAIL);
      console.log('   To:', formData.customerEmail);
      
      const customerEmailResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: formData.customerEmail,
        subject: `Quote Request Received - ${bookingReference} - Executive Fleet`,
        html: clientBookingConfirmationTemplate(emailData),
      });
      
      console.log('✅ Customer email sent successfully:', customerEmailResult);
    } catch (emailError) {
      console.error('❌ Failed to send customer email:', {
        error: emailError.message,
        statusCode: emailError.statusCode,
        name: emailError.name,
        from: process.env.RESEND_FROM_EMAIL,
        to: formData.customerEmail
      });
      // Don't fail the request if email fails
    }

    // Send Push Notifications to all admin subscribers
    if (vapidPublicKey && vapidPrivateKey) {
      try {
        const subscriptions = await prisma.pushSubscription.findMany();
        
        if (subscriptions.length > 0) {
          const pickupDateFormatted = new Date(formData.pickupDate).toLocaleDateString('en-AU', {
            day: 'numeric',
            month: 'short',
            timeZone: 'Australia/Melbourne'
          });
          
          const payload = JSON.stringify({
            title: 'New Booking Request',
            body: `${formData.customerName} - ${formData.serviceType} on ${pickupDateFormatted}`,
            url: '/admin/bookings',
            tag: `booking-${bookingReference}`,
            timestamp: Date.now(),
          });

          // Send to all subscribers asynchronously
          await Promise.allSettled(
            subscriptions.map(async (sub) => {
              try {
                await webpush.sendNotification(
                  {
                    endpoint: sub.endpoint,
                    keys: sub.keys,
                  },
                  payload
                );
              } catch (error) {
                // If subscription is invalid (410/404), remove it
                if (error.statusCode === 410 || error.statusCode === 404) {
                  await prisma.pushSubscription.delete({
                    where: { id: sub.id },
                  }).catch(() => {});
                }
                console.error('Push notification failed for endpoint:', sub.endpoint, error.message);
              }
            })
          );
          
          console.log(`Push notifications sent to ${subscriptions.length} subscriber(s)`);
        }
      } catch (pushError) {
        console.error('Failed to send push notifications:', pushError);
        // Don't fail the request if push fails
      }
    }

    // Return success response
    return NextResponse.json({
      message: 'Booking submitted successfully!',
      bookingReference,
      booking: savedBooking
    }, { status: 200 });

  } catch (error) {
    console.error('Booking API error:', error);

    // Provide more specific error messages
    let errorMessage = 'An error occurred while processing your booking.';

    if (error.message?.includes('database server') || error.code === 'P1001') {
      errorMessage = 'Database connection error. Please ensure your database is running and properly configured.';
    } else if (error.message?.includes('Prisma')) {
      errorMessage = 'Database error. Please contact support or try again later.';
    }

    return NextResponse.json({
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

