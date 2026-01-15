import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { calculateReadTime, sanitizeHtml, extractImageUrls } from '@/lib/blog-utils';
import { supabaseAdmin } from '@/lib/supabase';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET a single blog (optionally increment view count)
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const incrementView = searchParams.get('incrementView') === 'true';

    let blog;

    if (incrementView) {
      // Increment view count
      blog = await prisma.blog.update({
        where: { id },
        data: {
          views: {
            increment: 1
          }
        }
      });
    } else {
      blog = await prisma.blog.findUnique({
        where: { id },
      });
    }

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blog', error: error.message },
      { status: 500 }
    );
  }
}

// UPDATE a blog
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    // Get existing blog
    const existingBlog = await prisma.blog.findUnique({
      where: { id }
    });

    if (!existingBlog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // If slug is being changed, check uniqueness
    if (data.slug && data.slug !== existingBlog.slug) {
      const slugExists = await prisma.blog.findFirst({
        where: {
          slug: data.slug,
          NOT: { id }
        }
      });

      if (slugExists) {
        return NextResponse.json(
          { message: 'A blog with this slug already exists' },
          { status: 409 }
        );
      }
    }

    // Recalculate read time if content changed
    if (data.content && data.content !== existingBlog.content) {
      data.readTime = calculateReadTime(data.content);
      data.content = sanitizeHtml(data.content);
    }

    // Update published status and timestamp if status changes
    if (data.status === 'published' && existingBlog.status !== 'published') {
      data.published = true;
      if (!data.publishedAt) {
        data.publishedAt = new Date();
      }
    } else if (data.status === 'draft' || data.status === 'scheduled') {
      data.published = false;
    }

    // Handle scheduled publishing
    if (data.scheduledPublishAt) {
      data.scheduledPublishAt = new Date(data.scheduledPublishAt);
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage,
        category: data.category,

        tags: data.tags,
        author: data.author,
        status: data.status,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        readTime: data.readTime,
        published: data.published,
        publishedAt: data.publishedAt,
        scheduledPublishAt: data.scheduledPublishAt,
      },
    });

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { message: 'Failed to update blog', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE a blog
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Get blog to find images
    const blog = await prisma.blog.findUnique({
      where: { id }
    });

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Extract image URLs to delete from Supabase
    const imageUrls = [];

    if (blog.featuredImage) {
      imageUrls.push(blog.featuredImage);
    }

    // Extract inline images from content
    const contentImages = extractImageUrls(blog.content);
    imageUrls.push(...contentImages);

    // Delete blog from database
    await prisma.blog.delete({
      where: { id },
    });

    // Delete images from Supabase (don't fail if image deletion fails)
    for (const url of imageUrls) {
      try {
        // Extract path from URL
        const urlObj = new URL(url);
        const path = urlObj.pathname.split('/storage/v1/object/public/Executive%20Fleet%20Bucket/')[1];

        if (path) {
          await supabaseAdmin.storage
            .from('Executive Fleet Bucket')
            .remove([decodeURIComponent(path)]);
        }
      } catch (imgError) {
        console.error('Error deleting image:', imgError);
        // Continue even if image deletion fails
      }
    }

    return NextResponse.json({
      message: 'Blog deleted successfully',
      imagesDeleted: imageUrls.length
    }, { status: 200 });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { message: 'Failed to delete blog', error: error.message },
      { status: 500 }
    );
  }
}

