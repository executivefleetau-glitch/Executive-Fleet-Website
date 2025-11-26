import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all blogs
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ blogs }, { status: 200 });
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

    const blog = await prisma.blog.create({
      data,
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

