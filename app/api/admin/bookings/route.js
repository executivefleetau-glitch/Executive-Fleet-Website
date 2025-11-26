import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all bookings
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { message: 'Failed to fetch bookings', error: error.message },
      { status: 500 }
    );
  }
}

