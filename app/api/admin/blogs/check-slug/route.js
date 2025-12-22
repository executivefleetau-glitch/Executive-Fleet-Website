import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Check if slug is available
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const excludeId = searchParams.get('excludeId'); // For edit mode

    if (!slug) {
      return NextResponse.json(
        { available: false, message: 'Slug is required' },
        { status: 400 }
      );
    }

    const whereClause = excludeId
      ? { slug, NOT: { id: excludeId } }
      : { slug };

    const existingBlog = await prisma.blog.findFirst({
      where: whereClause,
    });

    return NextResponse.json({
      available: !existingBlog,
      slug: slug,
    }, { status: 200 });

  } catch (error) {
    console.error('Error checking slug:', error);
    return NextResponse.json(
      { available: false, message: 'Failed to check slug', error: error.message },
      { status: 500 }
    );
  }
}

