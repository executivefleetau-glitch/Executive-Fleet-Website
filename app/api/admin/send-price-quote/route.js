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
    const { bookingId, outboundFare, returnFare } = await request.json();

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

    // Calculate pricing
    const outbound = parseFloat(outboundFare);
    const returnTrip = booking.isReturnTrip && returnFare ? parseFloat(returnFare) : 0;
    const subtotal = outbound + returnTrip;
    const discount = booking.isReturnTrip && returnTrip > 0 ? subtotal * 0.04 : 0; // 4% discount for return trips
    const total = subtotal - discount;

    // Generate confirmation token
    const confirmationToken = generateConfirmationToken();

    // Update booking in database with pricing and token
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        outboundFare: outbound,
        returnFare: returnTrip > 0 ? returnTrip : null,
        subtotal: subtotal,
        discount: discount > 0 ? discount : null,
        finalPrice: total,
        confirmationToken: confirmationToken
      }
    });

    // Prepare email data
    const emailData = {
      bookingReference: booking.bookingReference,
      customerName: booking.customerName,
      pickupLocation: booking.pickupLocation,
      dropoffLocation: booking.dropoffLocation,
      pickupDate: formatDate(booking.pickupDate),
      pickupTime: booking.pickupTime ? new Date(`1970-01-01T${booking.pickupTime}`).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' }) : 'N/A',
      vehicleName: booking.vehicleName,
      numberOfPassengers: booking.numberOfPassengers,
      isReturnTrip: booking.isReturnTrip,
      returnPickupLocation: booking.returnPickupLocation || booking.dropoffLocation,
      returnDropoffLocation: booking.returnDropoffLocation || booking.pickupLocation,
      returnDate: booking.returnDate ? formatDate(booking.returnDate) : null,
      returnTime: booking.returnTime ? new Date(`1970-01-01T${booking.returnTime}`).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' }) : null,
      outboundFare: outbound,
      returnFare: returnTrip,
      subtotal: subtotal,
      discount: discount,
      total: total,
      confirmationToken: confirmationToken
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



