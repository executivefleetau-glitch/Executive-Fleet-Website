"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import Link from "next/link";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/admin/blogs");
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.blogs || []);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogs(blogs.filter((b) => b.id !== id));
        alert("Blog post deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog post");
    }
  };

  const handleTogglePublish = async (blog) => {
    try {
      const response = await fetch(`/api/admin/blogs/${blog.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          published: !blog.published,
          publishedAt: !blog.published ? new Date().toISOString() : null,
        }),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog.blog : b)));
        alert(`Blog ${!blog.published ? "published" : "unpublished"} successfully!`);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog");
    }
  };

  return (
    <DashboardLayout>
      <div className="blogs-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Blog Management</h1>
            <p className="page-subtitle">Create and manage blog posts</p>
          </div>
          <div className="header-actions">
            <button className="refresh-btn" onClick={fetchBlogs}>
              🔄 Refresh
            </button>
            <Link href="/admin/blogs/new" className="create-btn">
              ➕ Create New Blog
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📝</span>
            <h3>No Blog Posts</h3>
            <p>Start creating amazing content for your audience.</p>
            <Link href="/admin/blogs/new" className="create-btn">
              ➕ Create Your First Blog
            </Link>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <div className="blog-status">
                  <span className={`status-badge ${blog.published ? "published" : "draft"}`}>
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>
                {blog.featuredImage && (
                  <div className="blog-image">
                    <img src={blog.featuredImage} alt={blog.title} />
                  </div>
                )}
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-category">{blog.category}</span>
                    <span className="blog-date">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-excerpt">{blog.excerpt}</p>
                  <div className="blog-author">
                    <span>By {blog.author}</span>
                  </div>
                </div>
                <div className="blog-actions">
                  <Link
                    href={`/admin/blogs/edit/${blog.id}`}
                    className="btn-edit"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    className="btn-publish"
                    onClick={() => handleTogglePublish(blog)}
                  >
                    {blog.published ? "📌 Unpublish" : "🚀 Publish"}
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(blog.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .blogs-page {
          max-width: 1600px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .page-title {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 10px 0;
        }

        .page-subtitle {
          color: #888888;
          font-size: 16px;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 15px;
        }

        .refresh-btn,
        .create-btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          border: none;
        }

        .refresh-btn {
          background: rgba(206, 155, 40, 0.2);
          color: #E8B429;
          border: 2px solid rgba(206, 155, 40, 0.3);
        }

        .refresh-btn:hover {
          background: rgba(206, 155, 40, 0.3);
          border-color: #E8B429;
        }

        .create-btn {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          color: #000000;
        }

        .create-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.4);
        }

        .loading-state,
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          color: #E8B429;
          gap: 20px;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(206, 155, 40, 0.2);
          border-top-color: #E8B429;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .empty-icon {
          font-size: 64px;
        }

        .empty-state h3 {
          color: #ffffff;
          margin: 0;
        }

        .empty-state p {
          color: #888888;
          margin: 0;
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }

        .blog-card {
          background: #1a1a1a;
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
        }

        .blog-card:hover {
          transform: translateY(-5px);
          border-color: #E8B429;
          box-shadow: 0 10px 40px rgba(206, 155, 40, 0.3);
        }

        .blog-status {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 10;
        }

        .status-badge {
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-badge.published {
          background: linear-gradient(135deg, #4ade80, #22c55e);
          color: #000000;
        }

        .status-badge.draft {
          background: rgba(136, 136, 136, 0.3);
          color: #ffffff;
          border: 1px solid #888888;
        }

        .blog-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.4);
        }

        .blog-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .blog-card:hover .blog-image img {
          transform: scale(1.05);
        }

        .blog-content {
          padding: 25px;
        }

        .blog-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .blog-category {
          background: rgba(206, 155, 40, 0.2);
          color: #E8B429;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .blog-date {
          color: #888888;
          font-size: 13px;
        }

        .blog-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 12px 0;
          line-height: 1.4;
        }

        .blog-excerpt {
          color: #cccccc;
          font-size: 14px;
          line-height: 1.6;
          margin: 0 0 15px 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-author {
          color: #888888;
          font-size: 13px;
          font-style: italic;
        }

        .blog-actions {
          display: flex;
          gap: 8px;
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .blog-actions button,
        .blog-actions a {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-decoration: none;
          text-align: center;
        }

        .btn-edit {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: #ffffff;
        }

        .btn-edit:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }

        .btn-publish {
          background: linear-gradient(135deg, #4ade80, #22c55e);
          color: #000000;
        }

        .btn-publish:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(74, 222, 128, 0.4);
        }

        .btn-delete {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: #ffffff;
        }

        .btn-delete:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
        }

        @media (max-width: 768px) {
          .blogs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}

