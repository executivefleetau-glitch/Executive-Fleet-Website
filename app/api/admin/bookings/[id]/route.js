import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// DELETE a booking
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.booking.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Booking deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { message: 'Failed to delete booking', error: error.message },
      { status: 500 }
    );
  }
}

// PATCH/UPDATE a booking
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    // Check if we are confirming a booking
    if (data.status && data.status.toLowerCase() === 'confirmed') {
      const currentBooking = await prisma.booking.findUnique({ where: { id } });

      console.log('=== BOOKING CONFIRMATION DEBUG ===');
      console.log('Booking Reference:', currentBooking?.bookingReference);
      console.log('isReturnTrip:', currentBooking?.isReturnTrip);
      console.log('returnDate:', currentBooking?.returnDate);
      console.log('Already ends with -R?:', currentBooking?.bookingReference?.endsWith('-R'));

      // Check if it needs splitting (Return Trip is ON OR has Return Date)
      // Also ensure we don't recursively split a return leg (check reference ending)
      const hasReturnDetails = currentBooking.isReturnTrip || !!currentBooking.returnDate;
      const isAlreadySplit = currentBooking.bookingReference.endsWith('-R');

      console.log('hasReturnDetails:', hasReturnDetails);
      console.log('isAlreadySplit:', isAlreadySplit);
      console.log('Will split?:', currentBooking && hasReturnDetails && !isAlreadySplit);

      if (currentBooking && hasReturnDetails && !isAlreadySplit) {
        console.log(`🔀 Splitting Booking ${currentBooking.bookingReference} into Outbound & Return...`);

        // Transaction: Create Return + Update Outbound
        const [returnLeg, updatedOutbound] = await prisma.$transaction([
          // 1. Create Return Leg Booking
          prisma.booking.create({
            data: {
              bookingReference: `${currentBooking.bookingReference}-R`, // Unique Ref
              bookingType: currentBooking.bookingType,
              serviceType: currentBooking.serviceType,
              vehicleId: currentBooking.vehicleId,
              vehicleName: currentBooking.vehicleName,
              vehicleType: currentBooking.vehicleType,

              // Swap Locations
              pickupLocation: currentBooking.returnPickupLocation || currentBooking.dropoffLocation,
              pickupLat: currentBooking.returnPickupLat || currentBooking.dropoffLat,
              pickupLng: currentBooking.returnPickupLng || currentBooking.dropoffLng,
              dropoffLocation: currentBooking.returnDropoffLocation || currentBooking.pickupLocation,
              dropoffLat: currentBooking.returnDropoffLat || currentBooking.pickupLat,
              dropoffLng: currentBooking.returnDropoffLng || currentBooking.pickupLng,

              // Return Date/Time becomes Main Date/Time
              pickupDate: currentBooking.returnDate || new Date(), // Fallback (shouldn't happen if hasReturnDetails)
              pickupTime: currentBooking.returnTime || new Date(),

              // Customer Details (Same)
              customerName: currentBooking.customerName,
              customerEmail: currentBooking.customerEmail,
              customerPhone: currentBooking.customerPhone,
              numberOfPassengers: currentBooking.numberOfPassengers,
              hasChildren: currentBooking.hasChildren,
              babyCapsule: currentBooking.babyCapsule,
              babySeat: currentBooking.babySeat,
              boosterSeat: currentBooking.boosterSeat,

              // Pricing
              outboundFare: currentBooking.returnFare,
              returnFare: null,
              subtotal: currentBooking.returnFare,

              // Status & Flags
              status: 'confirmed',
              contactStatus: 'contacted', // Customer has been contacted via quote email
              isReturnTrip: false,
              specialInstructions: `Return leg of ${currentBooking.bookingReference}. ${currentBooking.specialInstructions || ''}`.trim()
            }
          }),

          // 2. Update Outbound (Original) Booking
          prisma.booking.update({
            where: { id },
            data: {
              status: 'confirmed',
              isReturnTrip: false, // Remove return flag
              returnDate: null,
              returnTime: null,
              returnPickupLocation: null,
              returnDropoffLocation: null,
              returnFare: null,
              specialInstructions: `Outbound leg. ${currentBooking.specialInstructions || ''}`.trim()
            }
          })
        ]);

        return NextResponse.json({ booking: updatedOutbound, split: true, returnLeg }, { status: 200 });
      }
    }

    // Standard Update (No Split)
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data,
    });

    return NextResponse.json({ booking: updatedBooking }, { status: 200 });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { message: 'Failed to update booking', error: error.message },
      { status: 500 }
    );
  }
}

