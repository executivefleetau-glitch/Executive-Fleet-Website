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
async function getRelatedBlogs(currentBlogId, category, tags) {
  const relatedBlogs = await prisma.blog.findMany({
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
        {/* Breadcrumb */}
        <div className="section pt-60 pb-60 bg-primary">
          <div className="container-sub">
            <h1 className="heading-44-medium color-white mb-5">{blog.title}</h1>
            <div className="box-breadcrumb">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/blogs">Blog</Link>
                </li>
                <li>
                  <Link href={`/${slug}`}>{blog.title}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <section className="section pt-80 pb-80 bg-white">
          <div className="container-sub">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                {/* Featured Image */}
                {blog.featuredImage && (
                  <div className="featured-image-wrapper mb-50">
                    <Image
                      src={blog.featuredImage}
                      alt={blog.title}
                      width={1200}
                      height={600}
                      style={{ objectFit: 'cover', borderRadius: '16px', width: '100%', height: 'auto' }}
                      priority
                    />
                  </div>
                )}

                {/* Blog Meta */}
                <div className="blog-meta mb-40">
                  <div className="meta-row">
                    <span className="category-badge">
                      <i className="fas fa-folder"></i>
                      {blog.category}
                    </span>
                    <span className="meta-item">
                      <i className="fas fa-calendar-alt"></i>
                      {formatDate(blog.publishedAt || blog.createdAt)}
                    </span>
                    <span className="meta-item">
                      <i className="fas fa-clock"></i>
                      {blog.readTime} min read
                    </span>
                    <span className="meta-item">
                      <i className="fas fa-eye"></i>
                      {blog.views} views
                    </span>
                  </div>
                </div>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="tags-section mb-40">
                    {blog.tags.map((tag, idx) => (
                      <span key={idx} className="tag-badge">
                        <i className="fas fa-tag"></i>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Blog Content */}
                <div 
                  className="blog-content" 
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Author & Date Footer */}
                <div className="blog-footer mt-60 pt-40">
                  <div className="author-section">
                    <div className="author-info">
                      <div className="author-avatar">
                        <i className="fas fa-user-circle"></i>
                      </div>
                      <div className="author-details">
                        <h6>Written by</h6>
                        <p className="author-name">{blog.author || 'Executive Fleet'}</p>
                      </div>
                    </div>
                    <div className="share-section">
                      <span>Share:</span>
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`} target="_blank" rel="noopener noreferrer" className="share-btn facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href={`https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? window.location.href : ''}&text=${blog.title}`} target="_blank" rel="noopener noreferrer" className="share-btn twitter">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? window.location.href : ''}`} target="_blank" rel="noopener noreferrer" className="share-btn linkedin">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Back to Blog */}
                <div className="text-center mt-60">
                  <Link href="/blogs" className="btn-back-blog">
                    <i className="fas fa-arrow-left"></i>
                    Back to Blog List
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Blogs */}
            {relatedBlogs && relatedBlogs.length > 0 && (
              <div className="row mt-80">
                <div className="col-12">
                  <h3 className="related-title">Related Articles</h3>
                  <div className="related-blogs-grid">
                    {relatedBlogs.map((relatedBlog) => (
                      <Link key={relatedBlog.id} href={`/${relatedBlog.slug}`} className="related-blog-card">
                        {relatedBlog.featuredImage && (
                          <div className="related-image">
                            <Image
                              src={relatedBlog.featuredImage}
                              alt={relatedBlog.title}
                              width={400}
                              height={250}
                              style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                            />
                          </div>
                        )}
                        <div className="related-content">
                          <span className="related-category">{relatedBlog.category}</span>
                          <h4 className="related-blog-title">{relatedBlog.title}</h4>
                          <p className="related-excerpt">{relatedBlog.excerpt}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer9 />

      
      <link rel="stylesheet" href="/styles/blog-post.css" />
    </>
  );
}

