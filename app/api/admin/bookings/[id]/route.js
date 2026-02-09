import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { fromMelbourneHHMM } from '@/lib/timezone';

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
    
    // Handle pickupTime - convert Melbourne HH:MM to UTC Date
    // Must use the booking's pickupDate for DST-correct offset (same logic as POST handler)
    if (updateData.pickupTime && typeof updateData.pickupTime === 'string' && updateData.pickupTime.match(/^\d{2}:\d{2}$/)) {
      // Determine the date context: use the incoming pickupDate, or fall back to existing booking's date
      const dateCtx = updateData.pickupDate
        ? (typeof data.pickupDate === 'string' ? data.pickupDate : new Date(updateData.pickupDate).toISOString().split('T')[0])
        : null;
      if (dateCtx) {
        updateData.pickupTime = fromMelbourneHHMM(updateData.pickupTime, dateCtx);
      } else {
        // Fetch the existing booking's pickupDate for context
        const existing = await prisma.booking.findUnique({ where: { id }, select: { pickupDate: true } });
        const existingDate = existing?.pickupDate ? new Date(existing.pickupDate).toISOString().split('T')[0] : null;
        if (existingDate) {
          updateData.pickupTime = fromMelbourneHHMM(updateData.pickupTime, existingDate);
        }
      }
    }
    
    // Handle returnDate
    if (updateData.returnDate && typeof updateData.returnDate === 'string') {
      updateData.returnDate = new Date(updateData.returnDate);
    }
    
    // Handle returnTime - convert Melbourne HH:MM to UTC Date (same approach as pickupTime)
    if (updateData.returnTime && typeof updateData.returnTime === 'string' && updateData.returnTime.match(/^\d{2}:\d{2}$/)) {
      const returnDateCtx = updateData.returnDate
        ? (typeof data.returnDate === 'string' ? data.returnDate : new Date(updateData.returnDate).toISOString().split('T')[0])
        : null;
      if (returnDateCtx) {
        updateData.returnTime = fromMelbourneHHMM(updateData.returnTime, returnDateCtx);
      } else {
        const existing = await prisma.booking.findUnique({ where: { id }, select: { returnDate: true } });
        const existingReturnDate = existing?.returnDate ? new Date(existing.returnDate).toISOString().split('T')[0] : null;
        if (existingReturnDate) {
          updateData.returnTime = fromMelbourneHHMM(updateData.returnTime, existingReturnDate);
        }
      }
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

        // --- Proportional pricing split ---
        const outboundFare = parseFloat(currentBooking.outboundFare) || 0;
        const returnFare = parseFloat(currentBooking.returnFare) || 0;
        const totalFares = outboundFare + returnFare;
        const totalDiscount = parseFloat(currentBooking.discount) || 0;
        const totalFinalPrice = parseFloat(currentBooking.finalPrice) || 0;
        const totalSubtotal = parseFloat(currentBooking.subtotal) || totalFares;

        // Proportional ratios (handle edge case where totalFares is 0)
        const outboundRatio = totalFares > 0 ? outboundFare / totalFares : 0.5;
        const returnRatio = totalFares > 0 ? returnFare / totalFares : 0.5;

        // Split pricing proportionally
        const outboundDiscount = Math.round(totalDiscount * outboundRatio * 100) / 100;
        const returnDiscount = Math.round(totalDiscount * returnRatio * 100) / 100;
        const outboundSubtotal = outboundFare;
        const returnSubtotal = returnFare;
        const outboundFinalPrice = Math.max(0, outboundSubtotal - outboundDiscount);
        const returnFinalPrice = Math.max(0, returnSubtotal - returnDiscount);

        // Child seat prices go to outbound only (they're for the vehicle, typically set once)
        const outboundChildSeatPrices = {
          babyCapsulePrice: currentBooking.babyCapsulePrice,
          babySeatPrice: currentBooking.babySeatPrice,
          boosterSeatPrice: currentBooking.boosterSeatPrice,
        };

        console.log(`  Pricing split: Outbound $${outboundFinalPrice} (discount $${outboundDiscount}), Return $${returnFinalPrice} (discount $${returnDiscount})`);

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
              pickupDate: currentBooking.returnDate || new Date(),
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

              // Proportional Pricing for return leg
              outboundFare: returnFare,
              returnFare: null,
              subtotal: returnSubtotal,
              discount: returnDiscount > 0 ? returnDiscount : null,
              finalPrice: returnFinalPrice,
              quotedPrice: returnFinalPrice,
              confirmationToken: currentBooking.confirmationToken ? `${currentBooking.confirmationToken}-R` : null,

              // Status & Flags
              status: 'confirmed',
              contactStatus: 'contacted',
              isReturnTrip: false,
              specialInstructions: `Return leg of ${currentBooking.bookingReference}. ${currentBooking.specialInstructions || ''}`.trim()
            }
          }),

          // 2. Update Outbound (Original) Booking with proportional pricing
          prisma.booking.update({
            where: { id },
            data: {
              status: 'confirmed',
              isReturnTrip: false,
              returnDate: null,
              returnTime: null,
              returnPickupLocation: null,
              returnDropoffLocation: null,
              returnFare: null,
              // Update outbound pricing to its proportional share
              outboundFare: outboundFare,
              subtotal: outboundSubtotal,
              discount: outboundDiscount > 0 ? outboundDiscount : null,
              finalPrice: outboundFinalPrice,
              quotedPrice: outboundFinalPrice,
              ...outboundChildSeatPrices,
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
      'babyCapsule', 'babySeat', 'boosterSeat',
      'driverName', 'driverPhone', 'shareDriverDetails'
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

    // Update the booking first
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: updateData,
    });

    // Try to create audit records (non-blocking - don't fail the update if audit fails)
    let auditsCreated = 0;
    if (auditRecords.length > 0) {
      try {
        await prisma.bookingAudit.createMany({ data: auditRecords });
        auditsCreated = auditRecords.length;
      } catch (auditError) {
        console.error('Audit trail creation failed (non-blocking):', auditError.message);
      }
    }

    return NextResponse.json({ booking: updatedBooking, auditsCreated }, { status: 200 });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { message: 'Failed to update booking', error: error.message },
      { status: 500 }
    );
  }
}

