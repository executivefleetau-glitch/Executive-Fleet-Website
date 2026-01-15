import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { bookingConfirmationEmailTemplate } from '@/lib/booking-confirmation-email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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

export async function POST(request, { params }) {
  try {
    const { token } = params;

    if (!token) {
      return NextResponse.json(
        { message: 'Invalid confirmation token' },
        { status: 400 }
      );
    }

    // Find booking by confirmation token
    const booking = await prisma.booking.findUnique({
      where: { confirmationToken: token }
    });

    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found or token expired' },
        { status: 404 }
      );
    }

    // Check if already confirmed (don't send email again)
    if (booking.status === 'confirmed') {
      console.log('Booking already confirmed, skipping email');
      return NextResponse.json({
        message: 'Booking already confirmed',
        booking: {
          bookingReference: booking.bookingReference,
          status: booking.status,
          alreadyConfirmed: true
        }
      }, { status: 200 });
    }

    // Check if it needs splitting (Return Trip is ON OR has Return Date)
    console.log('=== EMAIL CONFIRMATION DEBUG ===');
    console.log('Booking Reference:', booking.bookingReference);
    console.log('isReturnTrip:', booking.isReturnTrip);
    console.log('returnDate:', booking.returnDate);
    console.log('returnTime:', booking.returnTime);
    console.log('returnPickupLocation:', booking.returnPickupLocation);
    console.log('Already ends with -R?:', booking.bookingReference.endsWith('-R'));

    const hasReturnDetails = booking.isReturnTrip || !!booking.returnDate;
    const isAlreadySplit = booking.bookingReference.endsWith('-R');

    console.log('hasReturnDetails:', hasReturnDetails);
    console.log('isAlreadySplit:', isAlreadySplit);
    console.log('Will split?:', hasReturnDetails && !isAlreadySplit);

    if (hasReturnDetails && !isAlreadySplit) {
      console.log(`🔀 Splitting Booking ${booking.bookingReference} into Outbound & Return...`);

      // Transaction: Create Return + Update Outbound
      const [returnLeg, updatedBooking] = await prisma.$transaction([
        // 1. Create Return Leg Booking
        prisma.booking.create({
          data: {
            bookingReference: `${booking.bookingReference}-R`,
            bookingType: booking.bookingType,
            serviceType: booking.serviceType,
            vehicleId: booking.vehicleId,
            vehicleName: booking.vehicleName,
            vehicleType: booking.vehicleType,

            // Swap Locations
            pickupLocation: booking.returnPickupLocation || booking.dropoffLocation,
            pickupLat: booking.returnPickupLat || booking.dropoffLat,
            pickupLng: booking.returnPickupLng || booking.dropoffLng,
            dropoffLocation: booking.returnDropoffLocation || booking.pickupLocation,
            dropoffLat: booking.returnDropoffLat || booking.pickupLat,
            dropoffLng: booking.returnDropoffLng || booking.pickupLng,

            // Return Date/Time becomes Main Date/Time
            pickupDate: booking.returnDate || new Date(),
            pickupTime: booking.returnTime || new Date(),

            // Customer Details (Same)
            customerName: booking.customerName,
            customerEmail: booking.customerEmail,
            customerPhone: booking.customerPhone,
            numberOfPassengers: booking.numberOfPassengers,
            hasChildren: booking.hasChildren,
            babyCapsule: booking.babyCapsule,
            babySeat: booking.babySeat,
            boosterSeat: booking.boosterSeat,

            // Pricing
            outboundFare: booking.returnFare,
            returnFare: null,
            subtotal: booking.returnFare,

            // Status & Flags
            status: 'confirmed',
            contactStatus: 'contacted', // Customer has been contacted via email
            isReturnTrip: false,
            confirmedAt: new Date(),
            specialInstructions: `Return leg of ${booking.bookingReference}. ${booking.specialInstructions || ''}`.trim()
          }
        }),

        // 2. Update Outbound (Original) Booking
        prisma.booking.update({
          where: { id: booking.id },
          data: {
            status: 'confirmed',
            confirmedAt: new Date(),
            isReturnTrip: false,
            returnDate: null,
            returnTime: null,
            returnPickupLocation: null,
            returnDropoffLocation: null,
            returnFare: null,
            specialInstructions: `Outbound leg. ${booking.specialInstructions || ''}`.trim()
          }
        })
      ]);

      // Send confirmation email to customer
      try {
        console.log(`Sending confirmation email to ${updatedBooking.customerEmail}`);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: updatedBooking.customerEmail,
          subject: `Booking Confirmed - ${updatedBooking.bookingReference} - Executive Fleet`,
          html: bookingConfirmationEmailTemplate({
            bookingReference: updatedBooking.bookingReference,
            customerName: updatedBooking.customerName,
            pickupDate: formatDate(updatedBooking.pickupDate),
            pickupLocation: updatedBooking.pickupLocation,
            dropoffLocation: updatedBooking.dropoffLocation,
            vehicleName: updatedBooking.vehicleName
          }),
        });
        console.log('Confirmation email sent successfully');
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
      }

      return NextResponse.json({
        message: 'Booking confirmed and split into Outbound and Return legs!',
        booking: {
          bookingReference: updatedBooking.bookingReference,
          customerName: updatedBooking.customerName,
          status: updatedBooking.status,
          confirmedAt: updatedBooking.confirmedAt,
          split: true
        }
      }, { status: 200 });
    }

    // Standard Update (No Split)
    const updatedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: 'confirmed',
        confirmedAt: new Date()
      }
    });

    // Send confirmation email to customer (ONLY ONCE)
    try {
      console.log(`Sending confirmation email to ${updatedBooking.customerEmail}`);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: updatedBooking.customerEmail,
        subject: `Booking Confirmed - ${updatedBooking.bookingReference} - Executive Fleet`,
        html: bookingConfirmationEmailTemplate({
          bookingReference: updatedBooking.bookingReference,
          customerName: updatedBooking.customerName,
          pickupDate: formatDate(updatedBooking.pickupDate),
          pickupLocation: updatedBooking.pickupLocation,
          dropoffLocation: updatedBooking.dropoffLocation,
          vehicleName: updatedBooking.vehicleName
        }),
      });
      console.log('Confirmation email sent successfully');
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      message: 'Booking confirmed successfully!',
      booking: {
        bookingReference: updatedBooking.bookingReference,
        customerName: updatedBooking.customerName,
        status: updatedBooking.status,
        confirmedAt: updatedBooking.confirmedAt
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Booking confirmation error:', error);

    return NextResponse.json({
      message: 'Failed to confirm booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

// GET method to retrieve booking details
export async function GET(request, { params }) {
  try {
    const { token } = params;

    if (!token) {
      return NextResponse.json(
        { message: 'Invalid confirmation token' },
        { status: 400 }
      );
    }

    // Find booking by confirmation token
    const booking = await prisma.booking.findUnique({
      where: { confirmationToken: token }
    });

    if (!booking) {
      return NextResponse.json(
        { message: 'Booking not found or token expired' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      booking: {
        bookingReference: booking.bookingReference,
        customerName: booking.customerName,
        status: booking.status,
        pickupDate: booking.pickupDate,
        pickupLocation: booking.pickupLocation,
        dropoffLocation: booking.dropoffLocation,
        vehicleName: booking.vehicleName,
        finalPrice: booking.finalPrice
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Get booking error:', error);

    return NextResponse.json({
      message: 'Failed to retrieve booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

