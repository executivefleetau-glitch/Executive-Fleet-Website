import Header2 from "@/components/headers/Header2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Footer9 from "@/components/footers/Footer9";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params;

  const blog = await prisma.blog.findUnique({
    where: { slug, published: true, status: 'published' },
    select: {
      title: true,
      excerpt: true,
      metaDescription: true,
      metaKeywords: true,
      featuredImage: true
    },
  });

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${blog.title} | Executive Fleet Blog`,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.metaKeywords ? blog.metaKeywords.split(',').map(k => k.trim()) : [],
    openGraph: {
      title: blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: blog.featuredImage ? [{ url: blog.featuredImage }] : [],
      type: 'article',
    },
  };
}

// Get blog data
async function getBlogBySlug(slug) {
  const blog = await prisma.blog.findUnique({
    where: { slug, published: true, status: 'published' },
  });

  if (!blog) {
    return null;
  }

  // Increment views
  await prisma.blog.update({
    where: { id: blog.id },
    data: { views: { increment: 1 } },
  });

  return blog;
}

// Get related blogs
// Get related blogs (Fallback to recent if needed)
async function getRelatedBlogs(currentBlogId, category, tags) {
  let relatedBlogs = await prisma.blog.findMany({
    where: {
      id: { not: currentBlogId },
      published: true,
      status: 'published',
      OR: [
        { category: category },
        { tags: { hasSome: tags || [] } }
      ]
    },
    take: 3,
    orderBy: {
      publishedAt: 'desc',
    },
  });

  // If we don't have 3 related blogs, fetch more recent ones to fill the gap
  if (relatedBlogs.length < 3) {
    const existingIds = relatedBlogs.map(b => b.id);
    existingIds.push(currentBlogId);

    const additionalBlogs = await prisma.blog.findMany({
      where: {
        id: { notIn: existingIds },
        published: true,
        status: 'published',
      },
      take: 3 - relatedBlogs.length,
      orderBy: {
        publishedAt: 'desc',
      },
    });

    relatedBlogs = [...relatedBlogs, ...additionalBlogs];
  }

  return relatedBlogs;
}

// Format date
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

import BlogDetail from "@/components/blog/BlogDetail";

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog.id, blog.category, blog.tags);

  return (
    <>
      <Header2 />
      <MobailHeader1 />
      <main className="main">
        <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />
      </main>
      <Footer9 />

      <link rel="stylesheet" href="/styles/blog-post.css" />
    </>
  );
}


