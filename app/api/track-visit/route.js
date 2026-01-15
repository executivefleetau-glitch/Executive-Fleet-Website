import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const { pathname } = await request.json();

        // Get IP from headers (works with Vercel/proxies)
        const forwardedFor = request.headers.get('x-forwarded-for');
        const ip = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';

        const userAgent = request.headers.get('user-agent') || 'Unknown';

        // Log the visit
        await prisma.websiteVisit.create({
            data: {
                ipAddress: ip,
                userAgent: userAgent,
                path: pathname || '/',
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error logging visit:', error);
        // Fail silently to not impact user experience
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
