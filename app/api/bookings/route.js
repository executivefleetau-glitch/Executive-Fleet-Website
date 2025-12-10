import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { adminBookingNotificationTemplate, clientBookingConfirmationTemplate } from '@/lib/booking-email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

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

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'bookingType', 'pickupDate', 'pickupTime', 'pickupLocation', 
      'dropoffLocation', 'vehicleId', 'vehicleName', 'customerName', 
      'customerEmail', 'customerPhone', 'numberOfPassengers', 'serviceType'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` }, 
          { status: 400 }
        );
      }
    }
    
    // Generate unique booking reference
    const bookingReference = generateBookingReference();
    
    // Calculate distance between locations (optional - don't fail booking if this fails)
    let distanceKm = null;
    let durationMinutes = null;
    
    try {
      const waypoints = formData.additionalDestination ? [formData.additionalDestination] : [];
      const distanceData = await calculateDistance(
        formData.pickupLocation,
        formData.dropoffLocation,
        waypoints
      );
      distanceKm = distanceData.distanceKm;
      durationMinutes = distanceData.durationMinutes;
    } catch (distanceError) {
      console.warn('Distance calculation failed, continuing with booking:', distanceError);
      // Continue with booking even if distance calculation fails
    }
    
    // Save to database using Prisma
    const savedBooking = await prisma.booking.create({
      data: {
        bookingReference: bookingReference,
        
        // Trip Details
        bookingType: formData.bookingType,
        pickupDate: new Date(formData.pickupDate),
        pickupTime: new Date(`1970-01-01T${formData.pickupTime}`),
        pickupLocation: formData.pickupLocation,
        pickupLat: formData.pickupLat || null,
        pickupLng: formData.pickupLng || null,
        dropoffLocation: formData.dropoffLocation,
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
        returnTime: formData.returnTime ? new Date(`1970-01-01T${formData.returnTime}`) : null,
        
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
        serviceType: formData.serviceType,
        specialInstructions: formData.specialInstructions || null,
        
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
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      pickupDate: formatDate(formData.pickupDate),
      pickupTime: formData.pickupTime,
      vehicleName: formData.vehicleName,
      serviceType: formData.serviceType,
      numberOfPassengers: formData.numberOfPassengers,
      isReturnTrip: formData.isReturnTrip,
      returnPickupLocation: formData.returnPickupLocation || null,
      returnDropoffLocation: formData.returnDropoffLocation || null,
      returnDate: formData.returnDate ? formatDate(formData.returnDate) : null,
      returnTime: formData.returnTime || null,
      additionalDestination: formData.additionalDestination || null,
      specialInstructions: formData.specialInstructions || null,
      createdAt: new Date().toLocaleString('en-AU', { 
        dateStyle: 'full', 
        timeStyle: 'short' 
      })
    };
    
    // Send Admin Notification Email
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.RESEND_TO_EMAIL || 'executivefleet.au@gmail.com',
        subject: `New Booking: ${bookingReference} - ${formData.serviceType}`,
        html: adminBookingNotificationTemplate(emailData),
      });
    } catch (emailError) {
      console.error('Failed to send admin email:', emailError);
      // Don't fail the request if email fails
    }
    
    // Send Client Confirmation Email
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: formData.customerEmail,
        subject: `Booking Confirmation - ${bookingReference} - Executive Fleet`,
        html: clientBookingConfirmationTemplate(emailData),
      });
    } catch (emailError) {
      console.error('Failed to send client email:', emailError);
      // Don't fail the request if email fails
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

