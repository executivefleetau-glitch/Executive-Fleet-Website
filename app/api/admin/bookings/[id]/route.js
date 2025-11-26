import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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

