import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { driverEmailTemplate } from '@/lib/driver-email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { bookingId, recipientEmail, message } = await request.json();

    if (!bookingId || !recipientEmail) {
      return NextResponse.json(
        { message: 'Booking ID and recipient email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Fetch full booking details
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found' },
        { status: 404 }
      );
    }

    // Generate driver-focused email template
    const emailHtml = driverEmailTemplate(booking, message);

    console.log('📧 Sending booking details email...');
    console.log('   From:', process.env.RESEND_FROM_EMAIL);
    console.log('   To:', recipientEmail);
    console.log('   Booking Ref:', booking.bookingReference);

    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: recipientEmail,
      subject: `Trip Assignment - ${booking.bookingReference} | ${booking.customerName}`,
      html: emailHtml,
    });

    console.log('✅ Booking details email sent successfully:', emailResult);

    return NextResponse.json(
      {
        message: 'Email sent successfully',
        emailId: emailResult.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Failed to send driver email:', {
      error: error.message,
      statusCode: error.statusCode,
      name: error.name,
    });
    return NextResponse.json(
      { message: 'Failed to send email', error: error.message },
      { status: 500 }
    );
  }
}
