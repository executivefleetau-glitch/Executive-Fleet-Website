import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { returnBookingEmailTemplate } from '@/lib/return-booking-email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { bookingId } = await request.json();

    if (!bookingId) {
      return NextResponse.json(
        { message: 'Booking ID is required' },
        { status: 400 }
      );
    }

    // Get the booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check if a return trip already exists
    // Look for booking with reference ending in -R or same email with return reference
    const existingReturn = await prisma.booking.findFirst({
      where: {
        OR: [
          { bookingReference: `${booking.bookingReference}-R` },
          {
            AND: [
              { customerEmail: booking.customerEmail },
              { pickupLocation: { contains: booking.dropoffLocation.split(',')[0] } },
              { dropoffLocation: { contains: booking.pickupLocation.split(',')[0] } },
              { status: { in: ['pending', 'confirmed'] } }
            ]
          }
        ]
      }
    });

    if (existingReturn) {
      return NextResponse.json(
        { message: 'A return booking already exists for this trip', existingReturn: existingReturn.bookingReference },
        { status: 400 }
      );
    }

    // Format the pickup date
    const pickupDate = new Date(booking.pickupDate);
    const formattedDate = pickupDate.toLocaleDateString('en-AU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Australia/Melbourne'
    });

    // Build the return booking URL with pre-filled data
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://executivefleet.com.au';
    const returnParams = new URLSearchParams({
      pickupLocation: booking.dropoffLocation,
      dropoffLocation: booking.pickupLocation,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      vehicleName: booking.vehicleName,
      passengers: booking.numberOfPassengers.toString(),
      returnFor: booking.bookingReference,
    });
    const returnBookingUrl = `${baseUrl}/get-quote?${returnParams.toString()}`;

    // Generate the email HTML
    const emailHtml = returnBookingEmailTemplate({
      bookingReference: booking.bookingReference,
      customerName: booking.customerName,
      originalPickupDate: formattedDate,
      originalPickupLocation: booking.pickupLocation,
      originalDropoffLocation: booking.dropoffLocation,
      vehicleName: booking.vehicleName,
      returnBookingUrl
    });

    console.log('📧 Sending return booking request email...');
    console.log('   From:', process.env.RESEND_FROM_EMAIL);
    console.log('   To:', booking.customerEmail);
    console.log('   Booking Ref:', booking.bookingReference);

    // Send the email
    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: booking.customerEmail,
      subject: `Book Your Return Journey - Executive Fleet (Ref: ${booking.bookingReference})`,
      html: emailHtml,
    });

    console.log('✅ Return booking request email sent successfully:', emailResult);

    // Update the booking to track that return request was sent
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        followUpTags: {
          push: `Return Request (${new Date().toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit' })})`
        }
      }
    });

    return NextResponse.json({
      message: 'Return booking request email sent successfully',
      emailId: emailResult.data?.id
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Failed to send return booking request email:', {
      error: error.message,
      statusCode: error.statusCode,
      name: error.name
    });
    return NextResponse.json(
      { message: 'Failed to send email', error: error.message },
      { status: 500 }
    );
  }
}
