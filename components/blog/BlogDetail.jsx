"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatBlogDate, truncateText } from "@/lib/blog-utils";
import { socials } from "@/data/socials";

export default function BlogDetail({ blog, relatedBlogs }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      }).catch((err) => console.log('Error sharing:', err));
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  // Render Modern Theme (The only theme)
  return (
    <div className="blog-detail modern-theme">
      <div className="modern-hero">
        <div className="modern-container">
          <div className="modern-header">
            <span className="modern-category">{blog.category}</span>
            <h1 className="modern-title">{blog.title}</h1>
            <div className="modern-meta">
              <span>By {blog.author}</span>
              <span className="dot">•</span>
              <span>{formatBlogDate(blog.publishedAt || blog.createdAt)}</span>
            </div>
          </div>
        </div>
        {blog.featuredImage && (
          <div className="modern-container">
            <div className="modern-image-container">
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                width={1200}
                height={600}
                style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                priority
              />
            </div>
          </div>
        )}
      </div>

      <article className="modern-container article-body">
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="modern-tags">
          {blog.tags && blog.tags.map((tag, idx) => (
            <span key={idx} className="modern-tag">#{tag}</span>
          ))}
        </div>
      </article>

      <div className="modern-container" style={{ marginTop: '20px', paddingTop: '20px' }}>
        <div className="modern-socials">
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Follow Executive Fleet</h3>
          <div style={{ display: 'flex', gap: '15px' }}>
            {socials.map((platform) => (
              <a
                key={platform.id}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="modern-social-icon"
              >
                <i className={platform.className}></i>
              </a>
            ))}
          </div>
        </div>
        <Link href="/blogs" className="modern-back" style={{ marginTop: '30px', display: 'inline-block', color: '#ce9b28', textDecoration: 'none', fontWeight: 'bold' }}>
          <span>←</span> Back to Blog
        </Link>
      </div>

      {relatedBlogs && relatedBlogs.length > 0 && (
        <section className="modern-related-section">
          <div className="modern-container">
            <h2 className="modern-title" style={{ fontSize: '32px', textAlign: 'center' }}>Related Articles</h2>
            <div className="modern-related-grid">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  href={`/blogs/${relatedBlog.slug}`}
                  className="modern-card"
                >
                  <div className="modern-card-image-wrapper">
                    {relatedBlog.featuredImage ? (
                      <Image
                        src={relatedBlog.featuredImage}
                        alt={relatedBlog.title}
                        width={400}
                        height={250}
                        className="modern-card-image"
                      />
                    ) : (
                      <div className="placeholder-image" style={{ height: '200px', background: '#f3f4f6' }}></div>
                    )}
                  </div>
                  <div className="modern-card-content">
                    <span className="modern-card-cat">{relatedBlog.category}</span>
                    <h3 className="modern-card-title">{relatedBlog.title}</h3>
                    <div className="modern-card-read">
                      Read Article <span>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <style jsx>{`
        .share-btn-large.linkedin:hover {
          background: #0A66C2;
          color: #fff;
          border-color: #0A66C2;
          transform: translateY(-2px);
        }

        .back-to-blog {
          display: inline-flex;
          align-items: center;
          padding: 12px 24px;
          background: rgba(206, 155, 40, 0.1);
          color: #ce9b28;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .back-to-blog:hover {
          background: rgba(206, 155, 40, 0.2);
          transform: translateX(-5px);
        }

        .related-blogs {
          background: #f9f9f9;
          padding: 80px 0;
          margin-top: 60px;
        }

        .related-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .related-title {
          font-size: 36px;
          font-weight: 800;
          color: #000;
          text-align: center;
          margin: 0 0 50px 0;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .related-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid rgba(206, 155, 40, 0.1);
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .related-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(206, 155, 40, 0.2);
          border-color: rgba(206, 155, 40, 0.3);
        }

        .related-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: #f5f5f5;
        }

        .related-image img {
          width: 100%;
          height: 100%;
          transition: transform 0.3s ease;
        }

        .related-card:hover .related-image img {
          transform: scale(1.1);
        }

        .placeholder-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.1) 0%, rgba(232, 180, 41, 0.05) 100%);
          font-size: 48px;
        }

        .related-content {
          padding: 25px;
        }

        .related-category {
          display: inline-block;
          padding: 5px 12px;
          background: rgba(206, 155, 40, 0.1);
          color: #ce9b28;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .related-blog-title {
          font-size: 20px;
          font-weight: 700;
          color: #000;
          margin: 0 0 12px 0;
          line-height: 1.3;
          transition: color 0.3s ease;
        }

        .related-card:hover .related-blog-title {
          color: #ce9b28;
        }

        .related-excerpt {
          color: #666;
          font-size: 15px;
          line-height: 1.5;
          margin: 0;
        }

        @media(max-width: 992px) {
          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media(max-width: 768px) {
          .blog-detail {
            padding: 20px 0 60px;
          }

          .featured-image {
            height: 300px;
            margin-bottom: 30px;
          }

          .article-title {
            font-size: 36px;
          }

          .article-info {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }

          .share-buttons {
            width: 100%;
            justify-content: space-between;
          }

          .article-excerpt {
            font-size: 18px;
            padding: 20px;
          }

          .article-content {
            font-size: 16px;
          }

          .article-content :global(h2) {
            font-size: 28px;
          }

          .article-content :global(h3) {
            font-size: 22px;
          }

          .share-buttons-large {
            flex-direction: column;
          }

          .share-btn-large {
            justify-content: center;
          }

          .related-grid {
            grid-template-columns: 1fr;
          }
        }
  `}</style>
    </div >
  );
}

