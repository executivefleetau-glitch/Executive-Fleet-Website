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

    // Process date/time fields if they're strings
    const updateData = { ...data };
    
    // Handle pickupDate - convert string to Date
    if (updateData.pickupDate && typeof updateData.pickupDate === 'string') {
      updateData.pickupDate = new Date(updateData.pickupDate);
    }
    
    // Handle pickupTime - convert HH:MM string to Date (using 1970-01-01 as base)
    if (updateData.pickupTime && typeof updateData.pickupTime === 'string' && updateData.pickupTime.match(/^\d{2}:\d{2}$/)) {
      const [hours, minutes] = updateData.pickupTime.split(':');
      updateData.pickupTime = new Date(`1970-01-01T${hours}:${minutes}:00.000Z`);
    }
    
    // Handle returnDate
    if (updateData.returnDate && typeof updateData.returnDate === 'string') {
      updateData.returnDate = new Date(updateData.returnDate);
    }
    
    // Handle returnTime
    if (updateData.returnTime && typeof updateData.returnTime === 'string' && updateData.returnTime.match(/^\d{2}:\d{2}$/)) {
      const [hours, minutes] = updateData.returnTime.split(':');
      updateData.returnTime = new Date(`1970-01-01T${hours}:${minutes}:00.000Z`);
    }

    // Handle numeric fields
    if (updateData.numberOfPassengers) {
      updateData.numberOfPassengers = parseInt(updateData.numberOfPassengers, 10) || 1;
    }
    if (updateData.quotedPrice) {
      updateData.quotedPrice = parseFloat(updateData.quotedPrice) || null;
    }
    if (updateData.babyCapsule !== undefined) {
      updateData.babyCapsule = parseInt(updateData.babyCapsule, 10) || 0;
    }
    if (updateData.babySeat !== undefined) {
      updateData.babySeat = parseInt(updateData.babySeat, 10) || 0;
    }
    if (updateData.boosterSeat !== undefined) {
      updateData.boosterSeat = parseInt(updateData.boosterSeat, 10) || 0;
    }

    // Check if we are confirming a booking
    if (updateData.status && updateData.status.toLowerCase() === 'confirmed') {
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

    // Get current booking for audit comparison
    const currentBooking = await prisma.booking.findUnique({ where: { id } });
    
    // Determine which fields changed for audit trail
    const auditRecords = [];
    const fieldsToTrack = [
      'customerName', 'customerEmail', 'customerPhone', 'numberOfPassengers',
      'pickupLocation', 'dropoffLocation', 'pickupDate', 'pickupTime',
      'vehicleName', 'serviceType', 'specialInstructions', 'quotedPrice',
      'status', 'contactStatus', 'flightNumber', 'terminalType',
      'babyCapsule', 'babySeat', 'boosterSeat'
    ];

    for (const field of fieldsToTrack) {
      if (updateData[field] !== undefined) {
        const oldValue = currentBooking[field];
        const newValue = updateData[field];
        
        // Convert dates to strings for comparison
        const oldStr = oldValue instanceof Date ? oldValue.toISOString() : String(oldValue ?? '');
        const newStr = newValue instanceof Date ? newValue.toISOString() : String(newValue ?? '');
        
        if (oldStr !== newStr) {
          auditRecords.push({
            bookingId: id,
            fieldChanged: field,
            oldValue: oldStr || null,
            newValue: newStr || null,
            changedBy: 'admin',
          });
        }
      }
    }

    // Standard Update (No Split) with audit trail
    const [updatedBooking] = await prisma.$transaction([
      prisma.booking.update({
        where: { id },
        data: updateData,
      }),
      // Create audit records if any changes were made
      ...(auditRecords.length > 0 
        ? [prisma.bookingAudit.createMany({ data: auditRecords })]
        : []
      )
    ]);

    return NextResponse.json({ booking: updatedBooking, auditsCreated: auditRecords.length }, { status: 200 });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { message: 'Failed to update booking', error: error.message },
      { status: 500 }
    );
  }
}

