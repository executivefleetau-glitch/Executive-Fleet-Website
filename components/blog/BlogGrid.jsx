"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatBlogDate, truncateText } from "@/lib/blog-utils";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function BlogGrid() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    totalPages: 0,
  });

  useEffect(() => {
    fetchBlogs();
  }, [filters, pagination.page]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        status: 'published', // Only show published blogs
        ...(filters.category && { category: filters.category }),
        ...(filters.search && { search: filters.search }),
      });

      const response = await fetch(`/api/admin/blogs?${params}`);
      const data = await response.json();

      if (response.ok) {
        setBlogs(data.blogs);
        setPagination(prev => ({
          ...prev,
          totalPages: data.pagination.totalPages,
        }));
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return (
    <section className="blog-section">
      <div className="container">

        {/* Blog Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading articles...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-newspaper"></i>
            </div>
            <h2>No articles found</h2>
            <p>Check back soon for new content!</p>
          </div>
        ) : (
          <>
            <div className="blog-grid">
              {blogs.map((blog) => (
                <article key={blog.id} className="blog-card">
                  <Link href={`/${blog.slug}`} className="card-image-link">
                    <div className="card-image">
                      {blog.featuredImage ? (
                        <Image
                          src={blog.featuredImage}
                          alt={blog.title}
                          width={400}
                          height={280}
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="placeholder-image">
                          <span>📷</span>
                        </div>
                      )}
                      <div className="date-badge">
                        {formatBlogDate(blog.publishedAt || blog.createdAt)}
                      </div>
                    </div>
                  </Link>

                  <div className="card-content">
                    <div className="card-meta">
                      <span className="category">
                        <i className="fas fa-folder"></i>
                        {blog.category}
                      </span>
                      <span className="read-time">
                        <i className="fas fa-clock"></i>
                        {blog.readTime} min
                      </span>
                    </div>

                    <Link href={`/${blog.slug}`}>
                      <h3 className="card-title">{blog.title}</h3>
                    </Link>

                    <p className="card-excerpt">
                      {truncateText(blog.excerpt, 120)}
                    </p>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="card-tags">
                        {blog.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="tag">
                            <i className="fas fa-tag"></i>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link href={`/${blog.slug}`} className="read-more">
                      <span>Read Article</span>
                      <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="page-btn"
                >
                  <i className="fas fa-chevron-left"></i>
                  Previous
                </button>
                <div className="page-numbers">
                  {[...Array(pagination.totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPagination(prev => ({ ...prev, page: idx + 1 }))}
                      className={`page-number ${pagination.page === idx + 1 ? 'active' : ''}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.totalPages}
                  className="page-btn"
                >
                  Next
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        .blog-section {
          padding: 80px 0 120px;
          background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
          position: relative;
        }

        .blog-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(206, 155, 40, 0.3) 50%, 
            transparent 100%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 80px 20px;
          color: #666;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(206, 155, 40, 0.2);
          border-top-color: #ce9b28;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .empty-state {
          text-align: center;
          padding: 100px 20px;
          background: #ffffff;
          border-radius: 16px;
          border: 2px dashed rgba(206, 155, 40, 0.3);
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 24px;
          color: #ce9b28;
          display: inline-block;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .empty-icon i {
          font-size: 64px;
        }

        .empty-state h2 {
          color: #333;
          margin: 0 0 12px 0;
          font-size: 28px;
          font-weight: 700;
        }

        .empty-state p {
          color: #666;
          margin: 0;
          font-size: 16px;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-bottom: 60px;
        }

        .blog-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(206, 155, 40, 0.1);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .blog-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .blog-card:hover::before {
          opacity: 1;
        }

        .blog-card:hover {
          transform: translateY(-12px);
          box-shadow: 
            0 25px 50px -12px rgba(206, 155, 40, 0.25),
            0 0 0 1px rgba(206, 155, 40, 0.1);
          border-color: rgba(206, 155, 40, 0.3);
        }

        .card-image-link {
          display: block;
        }

        .card-image {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
          background: #f5f5f5;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          transition: transform 0.4s ease;
        }

        .blog-card:hover .card-image img {
          transform: scale(1.1);
        }

        .placeholder-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.15) 0%, rgba(232, 180, 41, 0.08) 100%);
          font-size: 60px;
          color: rgba(206, 155, 40, 0.3);
        }

        .date-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          color: #E8B429;
          padding: 10px 18px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          border: 1px solid rgba(232, 180, 41, 0.3);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .card-content {
          padding: 32px;
          display: flex;
          flex-direction: column;
          flex: 1;
          background: #ffffff;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .category {
          padding: 8px 16px;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.12) 0%, rgba(232, 180, 41, 0.08) 100%);
          color: #ce9b28;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(206, 155, 40, 0.2);
        }

        .category i {
          font-size: 10px;
        }

        .read-time {
          color: #999;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .read-time i {
          color: #ce9b28;
          font-size: 12px;
        }

        .card-title {
          font-size: 22px;
          font-weight: 800;
          color: #000;
          margin: 0 0 16px 0;
          line-height: 1.35;
          transition: all 0.3s ease;
          letter-spacing: -0.3px;
        }

        .blog-card:hover .card-title {
          color: #ce9b28;
          transform: translateX(4px);
        }

        .card-excerpt {
          color: #666;
          line-height: 1.7;
          margin: 0 0 22px 0;
          flex: 1;
          font-size: 15px;
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 22px;
        }

        .tag {
          padding: 6px 14px;
          background: linear-gradient(135deg, rgba(33, 150, 243, 0.08) 0%, rgba(33, 150, 243, 0.12) 100%);
          color: #2196F3;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 700;
          border: 1px solid rgba(33, 150, 243, 0.15);
          display: inline-flex;
          align-items: center;
          gap: 5px;
          letter-spacing: 0.3px;
        }

        .tag i {
          font-size: 9px;
        }

        .read-more {
          color: #ce9b28 !important;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none !important;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          padding: 12px 20px;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.08) 0%, rgba(232, 180, 41, 0.05) 100%) !important;
          border-radius: 50px;
          border: 1.5px solid rgba(206, 155, 40, 0.2) !important;
        }

        .read-more:hover {
          color: #E8B429 !important;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.15) 0%, rgba(232, 180, 41, 0.1) 100%) !important;
          border-color: rgba(206, 155, 40, 0.4) !important;
          gap: 12px;
        }

        .read-more i {
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        .blog-card:hover .read-more {
          gap: 12px;
          color: #E8B429 !important;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.15) 0%, rgba(232, 180, 41, 0.1) 100%) !important;
          border-color: rgba(206, 155, 40, 0.4) !important;
        }

        .blog-card:hover .read-more i {
          transform: translateX(4px);
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }

        .page-btn {
          padding: 14px 28px;
          background: #ffffff;
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 50px;
          font-weight: 700;
          font-size: 14px;
          color: #333;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .page-btn i {
          font-size: 12px;
        }

        .page-btn:hover:not(:disabled) {
          background: rgba(206, 155, 40, 0.1);
          border-color: #ce9b28;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(206, 155, 40, 0.2);
        }

        .page-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none;
        }

        .page-numbers {
          display: flex;
          gap: 10px;
        }

        .page-number {
          width: 44px;
          height: 44px;
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 50%;
          background: #ffffff;
          color: #333;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page-number:hover {
          border-color: #ce9b28;
          background: rgba(206, 155, 40, 0.1);
          transform: translateY(-2px);
        }

        .page-number.active {
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          color: #000;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.4);
          transform: scale(1.1);
        }

        @media (max-width: 992px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .blog-section {
            padding: 60px 0 80px;
          }

          .blog-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .pagination {
            flex-wrap: wrap;
          }

          .page-numbers {
            order: 3;
            width: 100%;
            justify-content: center;
            margin-top: 10px;
          }
        }
      `}</style>
    </section>
  );
}

