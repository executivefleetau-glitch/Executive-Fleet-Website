import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all contact submissions
export async function GET() {
  try {
    const contacts = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { message: 'Failed to fetch contacts', error: error.message },
      { status: 500 }
    );
  }
}

