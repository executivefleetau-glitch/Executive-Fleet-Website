import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Force dynamic rendering - this route queries the database
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const adminExists = await prisma.user.findFirst({
      where: { isAdmin: true },
    });

    return NextResponse.json({ 
      hasAdmin: !!adminExists,
      message: adminExists 
        ? "Admin login required" 
        : "Ready for first-time admin setup"
    });
  } catch (error) {
    console.error('Error checking admin setup:', error);
    return NextResponse.json(
      { error: 'Failed to check admin setup' },
      { status: 500 }
    );
  }
}
