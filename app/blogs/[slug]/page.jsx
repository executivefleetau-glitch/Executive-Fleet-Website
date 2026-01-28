import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Header2 from "@/components/headers/Header2";
import Footer9 from "@/components/footers/Footer9";
import BlogDetail from "@/components/blog/BlogDetail";
import prisma from "@/lib/prisma";

async function checkIsAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) return false;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    return !!decoded.isAdmin; // Ensure boolean
  } catch (error) {
    return false;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const isAdmin = await checkIsAdmin();

  const where = { slug: params.slug };
  if (!isAdmin) {
    where.published = true;
  }

  const blog = await prisma.blog.findUnique({ where });

  if (!blog) {
    return {
      title: "Blog Not Found | Executive Fleet",
    };
  }

  return {
    title: `${blog.title} | Executive Fleet Blog`,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.metaKeywords || blog.tags.join(', '),
    openGraph: {
      title: blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: blog.featuredImage ? [blog.featuredImage] : [],
      type: 'article',
      publishedTime: blog.publishedAt?.toISOString(),
      authors: [blog.author],
      tags: blog.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
  };
}

// Fetch blog data
async function getBlog(slug) {
  const isAdmin = await checkIsAdmin();

  const where = { slug };
  if (!isAdmin) {
    where.published = true;
  }

  const blog = await prisma.blog.findUnique({ where });

  if (!blog) {
    return null;
  }

  // Increment view count (fire and forget)
  prisma.blog.update({
    where: { id: blog.id },
    data: {
      views: {
        increment: 1
      }
    }
  }).catch(err => console.error('Error incrementing views:', err));

  return blog;
}

// Fetch related blogs
async function getRelatedBlogs(blog) {
  if (!blog) return [];

  const relatedBlogs = await prisma.blog.findMany({
    where: {
      published: true,
      NOT: {
        id: blog.id
      },
      OR: [
        { category: blog.category },
        { tags: { hasSome: blog.tags } }
      ]
    },
    take: 3,
    orderBy: {
      publishedAt: 'desc'
    }
  });

  return relatedBlogs;
}

export default async function BlogDetailPage({ params }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog);

  return (
    <>
      <Header2 />
      <main className="main">
        <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />
      </main>
      <Footer9 />
    </>
  );
}

// Make this page dynamic to avoid database connection issues during build
export const dynamic = 'force-dynamic';

// Revalidate on each request (ISR disabled for dynamic pages)
export const revalidate = 0;

