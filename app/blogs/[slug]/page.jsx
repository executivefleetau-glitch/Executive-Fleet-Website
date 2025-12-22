import { notFound } from "next/navigation";
import Header2 from "@/components/headers/Header2";
import Footer9 from "@/components/footers/Footer9";
import BlogDetail from "@/components/blog/BlogDetail";
import prisma from "@/lib/prisma";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const blog = await prisma.blog.findUnique({
    where: { 
      slug: params.slug,
      published: true 
    },
  });

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
  const blog = await prisma.blog.findUnique({
    where: { 
      slug,
      published: true 
    },
  });

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

// Generate static params for all published blogs (optional, for static generation)
export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: { slug: true }
  });

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Revalidate every hour
export const revalidate = 3600;

