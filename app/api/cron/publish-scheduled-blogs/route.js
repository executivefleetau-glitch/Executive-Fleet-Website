import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Cron job to publish scheduled blogs
 * This endpoint should be called periodically (e.g., every 15 minutes)
 * via Vercel Cron or other cron service
 */
export async function GET(request) {
  try {
    // Verify cron secret (optional but recommended for security)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const now = new Date();

    // Find all blogs that are:
    // 1. Status is "scheduled"
    // 2. scheduledPublishAt is in the past or now
    // 3. Not yet published
    const scheduledBlogs = await prisma.blog.findMany({
      where: {
        status: 'scheduled',
        published: false,
        scheduledPublishAt: {
          lte: now
        }
      }
    });

    if (scheduledBlogs.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No blogs to publish',
        publishedCount: 0
      }, { status: 200 });
    }

    // Update all scheduled blogs to published
    const updatePromises = scheduledBlogs.map(blog => 
      prisma.blog.update({
        where: { id: blog.id },
        data: {
          status: 'published',
          published: true,
          publishedAt: now
        }
      })
    );

    await Promise.all(updatePromises);

    console.log(`✅ Published ${scheduledBlogs.length} scheduled blog(s)`);

    return NextResponse.json({
      success: true,
      message: `Successfully published ${scheduledBlogs.length} blog(s)`,
      publishedCount: scheduledBlogs.length,
      publishedBlogs: scheduledBlogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        scheduledPublishAt: blog.scheduledPublishAt
      }))
    }, { status: 200 });

  } catch (error) {
    console.error('Error publishing scheduled blogs:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to publish scheduled blogs', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// POST method for manual triggering (for testing/admin use)
export async function POST(request) {
  return GET(request);
}

