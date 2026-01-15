import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { calculateReadTime, sanitizeHtml } from '@/lib/blog-utils';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET all blogs with filtering, search, and pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Filters
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');

    // Build where clause
    const where = {};

    // For public-facing requests, check BOTH status and published fields
    if (status === 'published') {
      where.OR = [
        { status: 'published' },
        { published: true }
      ];
    } else if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = {
        has: tag
      };
    }

    if (search) {
      // If OR already exists (from status check), we need to combine
      const searchConditions = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ];

      if (where.OR) {
        // Combine status OR with search OR using AND
        where.AND = [
          { OR: where.OR },
          { OR: searchConditions }
        ];
        delete where.OR;
      } else {
        where.OR = searchConditions;
      }
    }

    console.log('🔍 Blog API Query:', JSON.stringify(where, null, 2));

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
    });

    console.log(`✅ Found ${blogs.length} blogs (Total: ${totalCount})`);

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
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blogs', error: error.message },
      { status: 500 }
    );
  }
}

// CREATE a new blog
export async function POST(request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { message: 'Missing required fields: title, slug, content' },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existingBlog = await prisma.blog.findUnique({
      where: { slug: data.slug }
    });

    if (existingBlog) {
      return NextResponse.json(
        { message: 'A blog with this slug already exists' },
        { status: 409 }
      );
    }

    // Calculate read time if not provided
    if (!data.readTime) {
      data.readTime = calculateReadTime(data.content);
    }

    // Sanitize content
    data.content = sanitizeHtml(data.content);

    // Set published timestamp if publishing
    if (data.status === 'published' && !data.publishedAt) {
      data.publishedAt = new Date();
      data.published = true;
    }

    // Generate excerpt if not provided
    const excerpt = data.excerpt || data.metaDescription || (data.content ? data.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...' : '');

    // Create blog
    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: excerpt,
        content: data.content,
        featuredImage: data.featuredImage || null,
        category: data.category || 'General',

        tags: data.tags || [],
        author: data.author || 'Executive Fleet',
        status: data.status || 'draft',
        metaDescription: data.metaDescription || null,
        metaKeywords: data.metaKeywords || null,
        readTime: data.readTime,
        published: data.published || false,
        scheduledPublishAt: data.scheduledPublishAt ? new Date(data.scheduledPublishAt) : null,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      },
    });

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { message: 'Failed to create blog', error: error.message },
      { status: 500 }
    );
  }
}

