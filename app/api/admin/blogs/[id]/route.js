import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET a single blog
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const blog = await prisma.blog.findUnique({
      where: { id },
    });

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

    const blog = await prisma.blog.update({
      where: { id },
      data,
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

    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { message: 'Failed to delete blog', error: error.message },
      { status: 500 }
    );
  }
}

