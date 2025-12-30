import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// PUBLIC API - Get published blogs only (no authentication required)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const skip = (page - 1) * limit;
    
    // Filters
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');
    
    // Build where clause - ONLY published blogs
    const where = {
      OR: [
        { status: 'published' },
        { published: true }
      ]
    };
    
    if (category) {
      where.category = category;
    }
    
    if (tag) {
      where.tags = {
        has: tag
      };
    }
    
    if (search) {
      where.AND = [
        {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { excerpt: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } }
          ]
        }
      ];
    }
    
    console.log('🌐 Public Blog API Query:', JSON.stringify(where, null, 2));
    
    // Get total count
    const totalCount = await prisma.blog.count({ where });
    
    // Get blogs
    const blogs = await prisma.blog.findMany({
      where,
      orderBy: {
        publishedAt: 'desc',
      },
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        category: true,
        tags: true,
        author: true,
        readTime: true,
        views: true,
        publishedAt: true,
        createdAt: true,
      }
    });

    console.log(`✅ Public API: Found ${blogs.length} published blogs (Total: ${totalCount})`);

    // Return with no-cache headers
    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error) {
    console.error('❌ Public Blog API Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blogs', error: error.message },
      { status: 500 }
    );
  }
}

