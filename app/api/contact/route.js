import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import { adminNotificationTemplate, clientConfirmationTemplate } from '@/lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, subject, message } = body;

    // Validation
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Save to database using Prisma
    let contactSubmission;
    try {
      contactSubmission = await prisma.contactSubmission.create({
        data: {
          fullName: fullName,
          email: email,
          subject: subject,
          message: message,
        }
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue with email sending even if database fails
    }

    // Format submission date
    const submittedAt = new Date().toLocaleString('en-AU', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Australia/Melbourne',
    });

    // Send email to admin
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.RESEND_TO_EMAIL || 'executivefleet.au@gmail.com',
        subject: `New Contact Form Submission: ${subject}`,
        html: adminNotificationTemplate({
          fullName,
          email,
          subject,
          message,
          submittedAt,
        }),
      });
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
      // Don't fail the request if email fails
    }

    // Send confirmation email to client
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: email,
        subject: 'Thank You for Contacting Executive Fleet',
        html: clientConfirmationTemplate({
          fullName,
        }),
      });
    } catch (emailError) {
      console.error('Failed to send client confirmation:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.',
        data: contactSubmission,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again.' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve submissions (for admin panel)
export async function GET(request) {
  try {
    // You might want to add authentication here
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    });

    return NextResponse.json(
      {
        success: true,
        data: submissions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

