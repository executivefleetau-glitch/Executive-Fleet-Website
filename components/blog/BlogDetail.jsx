"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatBlogDate, truncateText } from "@/lib/blog-utils";

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

  return (
    <div className="blog-detail">
      <article className="article-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/blog">Blog</Link>
          <span>/</span>
          <span>{blog.title}</span>
        </div>

        {/* Hero Section */}
        {blog.featuredImage && (
          <div className="featured-image">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              width={1200}
              height={600}
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}

        {/* Article Header */}
        <header className="article-header">
          <div className="header-meta">
            <span className="category">{blog.category}</span>
            <span className="date">{formatBlogDate(blog.publishedAt || blog.createdAt)}</span>
          </div>

          <h1 className="article-title">{blog.title}</h1>

          <div className="article-info">
            <div className="author-info">
              <div className="author-avatar">
                {blog.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="author-name">{blog.author}</div>
                <div className="read-info">
                  {blog.readTime} min read • {blog.views} views
                </div>
              </div>
            </div>

            <div className="share-buttons">
              <button onClick={handleShare} className="share-btn" title="Share">
                {copied ? '✓ Copied!' : '🔗 Share'}
              </button>
              <button onClick={shareOnTwitter} className="social-btn twitter" title="Share on Twitter">
                𝕏
              </button>
              <button onClick={shareOnFacebook} className="social-btn facebook" title="Share on Facebook">
                f
              </button>
              <button onClick={shareOnLinkedIn} className="social-btn linkedin" title="Share on LinkedIn">
                in
              </button>
            </div>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="article-tags">
              {blog.tags.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </header>

        {/* Article Excerpt */}
        <div className="article-excerpt">
          {blog.excerpt}
        </div>

        {/* Article Content */}
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Article Footer */}
        <footer className="article-footer">
          <div className="footer-share">
            <h3>Share this article</h3>
            <div className="share-buttons-large">
              <button onClick={shareOnTwitter} className="share-btn-large twitter">
                <span>𝕏</span>
                Twitter
              </button>
              <button onClick={shareOnFacebook} className="share-btn-large facebook">
                <span>f</span>
                Facebook
              </button>
              <button onClick={shareOnLinkedIn} className="share-btn-large linkedin">
                <span>in</span>
                LinkedIn
              </button>
            </div>
          </div>

          <Link href="/blog" className="back-to-blog">
            ← Back to all articles
          </Link>
        </footer>
      </article>

      {/* Related Blogs */}
      {relatedBlogs && relatedBlogs.length > 0 && (
        <section className="related-blogs">
          <div className="related-container">
            <h2 className="related-title">Related Articles</h2>
            <div className="related-grid">
              {relatedBlogs.map((relatedBlog) => (
                <Link 
                  key={relatedBlog.id} 
                  href={`/blog/${relatedBlog.slug}`}
                  className="related-card"
                >
                  <div className="related-image">
                    {relatedBlog.featuredImage ? (
                      <Image
                        src={relatedBlog.featuredImage}
                        alt={relatedBlog.title}
                        width={400}
                        height={250}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="placeholder-image">📷</div>
                    )}
                  </div>
                  <div className="related-content">
                    <span className="related-category">{relatedBlog.category}</span>
                    <h3 className="related-blog-title">{relatedBlog.title}</h3>
                    <p className="related-excerpt">
                      {truncateText(relatedBlog.excerpt, 100)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .blog-detail {
          background: #ffffff;
          padding: 40px 0 80px;
        }

        .article-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 40px;
          font-size: 14px;
          color: #666;
        }

        .breadcrumb a {
          color: #ce9b28;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .breadcrumb a:hover {
          color: #E8B429;
        }

        .breadcrumb span:last-child {
          color: #333;
          font-weight: 600;
        }

        .featured-image {
          width: 100%;
          height: 500px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 50px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .featured-image img {
          width: 100%;
          height: 100%;
        }

        .article-header {
          margin-bottom: 40px;
        }

        .header-meta {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .category {
          padding: 8px 18px;
          background: linear-gradient(90deg, rgba(206, 155, 40, 0.1) 0%, rgba(232, 180, 41, 0.1) 100%);
          color: #ce9b28;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .date {
          color: #888;
          font-size: 15px;
        }

        .article-title {
          font-size: 52px;
          font-weight: 800;
          color: #000;
          line-height: 1.2;
          margin: 0 0 30px 0;
        }

        .article-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          border-top: 2px solid rgba(206, 155, 40, 0.1);
          border-bottom: 2px solid rgba(206, 155, 40, 0.1);
          margin-bottom: 25px;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
        }

        .author-name {
          font-weight: 700;
          color: #333;
          margin-bottom: 4px;
        }

        .read-info {
          color: #888;
          font-size: 14px;
        }

        .share-buttons {
          display: flex;
          gap: 10px;
        }

        .share-btn,
        .social-btn {
          padding: 10px 18px;
          border: 2px solid rgba(206, 155, 40, 0.3);
          border-radius: 8px;
          background: #ffffff;
          color: #333;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .share-btn:hover {
          background: rgba(206, 155, 40, 0.1);
          border-color: #ce9b28;
        }

        .social-btn {
          width: 42px;
          height: 42px;
          padding: 0;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-btn.twitter:hover {
          background: #000;
          color: #fff;
          border-color: #000;
        }

        .social-btn.facebook:hover {
          background: #1877F2;
          color: #fff;
          border-color: #1877F2;
        }

        .social-btn.linkedin:hover {
          background: #0A66C2;
          color: #fff;
          border-color: #0A66C2;
        }

        .article-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 25px;
        }

        .tag {
          padding: 8px 18px;
          background: rgba(33, 150, 243, 0.1);
          color: #2196F3;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .article-excerpt {
          font-size: 22px;
          line-height: 1.6;
          color: #666;
          font-style: italic;
          padding: 30px;
          background: rgba(206, 155, 40, 0.05);
          border-left: 4px solid #ce9b28;
          border-radius: 8px;
          margin-bottom: 50px;
        }

        .article-content {
          font-size: 18px;
          line-height: 1.8;
          color: #333;
          margin-bottom: 60px;
        }

        .article-content :global(h1),
        .article-content :global(h2),
        .article-content :global(h3),
        .article-content :global(h4) {
          color: #000;
          font-weight: 700;
          margin-top: 40px;
          margin-bottom: 20px;
          line-height: 1.3;
        }

        .article-content :global(h2) {
          font-size: 36px;
        }

        .article-content :global(h3) {
          font-size: 28px;
        }

        .article-content :global(p) {
          margin-bottom: 20px;
        }

        .article-content :global(a) {
          color: #ce9b28;
          text-decoration: underline;
          transition: color 0.3s ease;
        }

        .article-content :global(a:hover) {
          color: #E8B429;
        }

        .article-content :global(img) {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 30px 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .article-content :global(ul),
        .article-content :global(ol) {
          margin: 20px 0;
          padding-left: 30px;
        }

        .article-content :global(li) {
          margin-bottom: 10px;
        }

        .article-content :global(blockquote) {
          padding: 20px 30px;
          margin: 30px 0;
          background: rgba(206, 155, 40, 0.05);
          border-left: 4px solid #ce9b28;
          border-radius: 8px;
          font-style: italic;
          color: #666;
        }

        .article-content :global(table) {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .article-content :global(td),
        .article-content :global(th) {
          border: 1px solid #e0e0e0;
          padding: 15px;
          text-align: left;
        }

        .article-content :global(th) {
          background: linear-gradient(90deg, rgba(206, 155, 40, 0.1) 0%, rgba(232, 180, 41, 0.1) 100%);
          font-weight: 700;
          color: #000;
        }

        .article-content :global(tr:nth-child(even)) {
          background: #f9f9f9;
        }

        .article-content :global(code) {
          background: #f5f5f5;
          padding: 3px 8px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 16px;
          color: #d63384;
        }

        .article-content :global(pre) {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 20px 0;
        }

        .article-content :global(pre code) {
          background: none;
          padding: 0;
          color: #333;
        }

        .article-footer {
          padding: 40px 0;
          border-top: 2px solid rgba(206, 155, 40, 0.1);
        }

        .footer-share {
          margin-bottom: 30px;
        }

        .footer-share h3 {
          font-size: 20px;
          font-weight: 700;
          color: #333;
          margin: 0 0 20px 0;
        }

        .share-buttons-large {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .share-btn-large {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 28px;
          border: 2px solid rgba(206, 155, 40, 0.3);
          border-radius: 8px;
          background: #ffffff;
          color: #333;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .share-btn-large span {
          font-size: 20px;
        }

        .share-btn-large.twitter:hover {
          background: #000;
          color: #fff;
          border-color: #000;
          transform: translateY(-2px);
        }

        .share-btn-large.facebook:hover {
          background: #1877F2;
          color: #fff;
          border-color: #1877F2;
          transform: translateY(-2px);
        }

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

        @media (max-width: 992px) {
          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
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
    </div>
  );
}

