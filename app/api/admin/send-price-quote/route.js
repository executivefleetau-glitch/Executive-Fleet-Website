import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { priceQuoteEmailTemplate } from '@/lib/price-quote-email-template';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Generate unique confirmation token
function generateConfirmationToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Helper to reconstruct a full Melbourne Date from separate Date and Time parts
function getReconstructedTimestamp(dateValue, timeValue) {
  if (!dateValue || !timeValue) return null;
  try {
    const d = new Date(dateValue);
    const t = new Date(timeValue);
    if (isNaN(d.getTime()) || isNaN(t.getTime())) return null;

    // Create a string: YYYY-MM-DDTHH:mm:ss
    // Prisma stores @db.Time as "1970-01-01T[Time]Z"
    const dateStr = d.toISOString().split('T')[0];
    const timeStr = t.toISOString().split('T')[1];

    const combinedIso = `${dateStr}T${timeStr}`;
    return new Date(combinedIso); // This is now a proper absolute timestamp
  } catch (e) {
    return null;
  }
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Australia/Melbourne'
  });
}

// Format time for display
function formatTime(timeValue) {
  if (!timeValue) return 'N/A';

  console.log('🕐 formatTime called with:', timeValue, 'Type:', typeof timeValue);

  try {
    // If it's already a simple time string like "10:30", parse it
    if (typeof timeValue === 'string' && timeValue.match(/^\d{2}:\d{2}/)) {
      const [hours, minutes] = timeValue.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      const result = `${displayHour}:${minutes} ${ampm}`;
      console.log('✅ Simple time string result:', result);
      return result;
    }

    // If it's a Date object or ISO string, parse it
    const date = new Date(timeValue);
    if (isNaN(date.getTime())) return 'N/A';

    console.log('📅 Parsed Date object:', date.toISOString());

    // Use Intl to force Melbourne time and AM/PM format (matches admin dashboard)
    const result = new Intl.DateTimeFormat('en-AU', {
      timeZone: 'Australia/Melbourne',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);

    console.log('✅ Formatted result:', result);
    return result;
  } catch (error) {
    console.error('❌ Error formatting time:', error);
    return 'N/A';
  }
}

export async function POST(request) {
  try {
    const {
      bookingId,
      outboundFare,
      returnFare,
      babyCapsulePrice,
      babySeatPrice,
      boosterSeatPrice,
      extraCharges,
      discountType,
      discountValue,
      discountReason,
      additionalNotes
    } = await request.json();

    // Validate required fields
    if (!bookingId || !outboundFare) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get booking details from database
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Calculate base fare
    const outbound = parseFloat(outboundFare);
    const returnTrip = booking.isReturnTrip && returnFare ? parseFloat(returnFare) : 0;
    const baseFare = outbound + returnTrip;

    // Calculate child seat costs
    let childSeatTotal = 0;
    const childSeatBreakdown = [];

    if (babyCapsulePrice && booking.babyCapsule > 0) {
      const price = parseFloat(babyCapsulePrice);
      const total = price * booking.babyCapsule;
      childSeatTotal += total;
      childSeatBreakdown.push({
        name: 'Baby Capsule',
        quantity: booking.babyCapsule,
        priceEach: price,
        total: total
      });
    }

    if (babySeatPrice && booking.babySeat > 0) {
      const price = parseFloat(babySeatPrice);
      const total = price * booking.babySeat;
      childSeatTotal += total;
      childSeatBreakdown.push({
        name: 'Baby Seat',
        quantity: booking.babySeat,
        priceEach: price,
        total: total
      });
    }

    if (boosterSeatPrice && booking.boosterSeat > 0) {
      const price = parseFloat(boosterSeatPrice);
      const total = price * booking.boosterSeat;
      childSeatTotal += total;
      childSeatBreakdown.push({
        name: 'Booster Seat',
        quantity: booking.boosterSeat,
        priceEach: price,
        total: total
      });
    }

    // Add extra charges
    let extraChargesTotal = 0;
    if (extraCharges && Array.isArray(extraCharges)) {
      extraCharges.forEach(item => {
        extraChargesTotal += parseFloat(item.price);
      });
    }

    const subtotal = baseFare + childSeatTotal + extraChargesTotal;

    // Calculate discount based on frontend input
    let discount = 0;
    if (discountValue !== undefined && discountValue !== null && discountValue !== '') {
      const dVal = parseFloat(discountValue);
      if (discountType === 'percentage') {
        discount = subtotal * (dVal / 100);
      } else {
        discount = dVal;
      }
    }

    const total = Math.max(0, subtotal - discount);

    // Generate confirmation token
    const confirmationToken = generateConfirmationToken();

    // Update booking in database with pricing and token
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        outboundFare: outbound,
        returnFare: returnTrip > 0 ? returnTrip : null,
        babyCapsulePrice: babyCapsulePrice ? parseFloat(babyCapsulePrice) : null,
        babySeatPrice: babySeatPrice ? parseFloat(babySeatPrice) : null,
        boosterSeatPrice: boosterSeatPrice ? parseFloat(boosterSeatPrice) : null,
        extraCharges: extraCharges && extraCharges.length > 0 ? extraCharges : null,
        subtotal: subtotal,
        discount: discount > 0 ? discount : null,
        finalPrice: total,
        confirmationToken: confirmationToken,
        contactStatus: 'contacted',
        quotedPrice: total,
        quoteSentAt: new Date()
      }
    });

    // Optimized: DB update merged above. Removed redundant $executeRaw query.

    // Prepare email data
    const emailData = {
      bookingReference: booking.bookingReference,
      customerName: booking.customerName,
      pickupLocation: booking.pickupLocation,
      dropoffLocation: booking.dropoffLocation,
      pickupDate: formatDate(booking.pickupDate),
      pickupTime: formatTime(getReconstructedTimestamp(booking.pickupDate, booking.pickupTime)),
      vehicleName: booking.vehicleName,
      numberOfPassengers: booking.numberOfPassengers,
      isReturnTrip: booking.isReturnTrip,
      returnPickupLocation: booking.returnPickupLocation || booking.dropoffLocation,
      returnDropoffLocation: booking.returnDropoffLocation || booking.pickupLocation,
      returnDate: booking.returnDate ? formatDate(booking.returnDate) : null,
      returnTime: booking.returnTime ? formatTime(getReconstructedTimestamp(booking.returnDate, booking.returnTime)) : null,
      outboundFare: outbound,
      returnFare: returnTrip,
      childSeatBreakdown: childSeatBreakdown,
      extraCharges: extraCharges || [],
      subtotal: subtotal,
      discount: discount,
      total: total,
      confirmationToken: confirmationToken,
      // Pass discount details for email display
      discountType: discountType,
      discountValue: discountValue,
      discountReason: discountReason
    };

    // Send price quote email to customer
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: booking.customerEmail,
      subject: `Your Quote - ${booking.bookingReference} - Executive Fleet`,
      html: priceQuoteEmailTemplate(emailData),
    });

    return NextResponse.json({
      message: 'Price quote sent successfully!',
      total: total
    }, { status: 200 });

  } catch (error) {
    console.error('Send price quote error:', error);

    return NextResponse.json({
      message: 'Failed to send price quote',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}



