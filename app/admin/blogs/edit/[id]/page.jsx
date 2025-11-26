"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { useRouter, useParams } from "next/navigation";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    category: "General",
    author: "Executive Fleet",
    published: false,
  });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/admin/blogs/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data.blog);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      alert("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/blogs/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          publishedAt: formData.published && !formData.publishedAt ? new Date().toISOString() : formData.publishedAt,
        }),
      });

      if (response.ok) {
        alert("Blog post updated successfully!");
        router.push("/admin/blogs");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading blog...</p>
        </div>
        <style jsx>{`
          .loading-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 80px 20px;
            color: #E8B429;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(206, 155, 40, 0.2);
            border-top-color: #E8B429;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="edit-blog-page">
        <div className="page-header">
          <h1 className="page-title">Edit Blog Post</h1>
          <p className="page-subtitle">Update your blog content</p>
        </div>

        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-grid">
            {/* Title */}
            <div className="form-group full-width">
              <label className="form-label">
                <span className="label-icon">📝</span>
                Blog Title *
              </label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Slug */}
            <div className="form-group full-width">
              <label className="form-label">
                <span className="label-icon">🔗</span>
                URL Slug *
              </label>
              <input
                type="text"
                name="slug"
                className="form-input"
                placeholder="url-friendly-slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
              <span className="form-hint">
                Preview: /blog/{formData.slug || "your-slug"}
              </span>
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📂</span>
                Category
              </label>
              <select
                name="category"
                className="form-input"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="General">General</option>
                <option value="News">News</option>
                <option value="Travel Tips">Travel Tips</option>
                <option value="Luxury Travel">Luxury Travel</option>
                <option value="Events">Events</option>
              </select>
            </div>

            {/* Author */}
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">✍️</span>
                Author
              </label>
              <input
                type="text"
                name="author"
                className="form-input"
                placeholder="Author name"
                value={formData.author}
                onChange={handleChange}
              />
            </div>

            {/* Featured Image */}
            <div className="form-group full-width">
              <label className="form-label">
                <span className="label-icon">🖼️</span>
                Featured Image URL
              </label>
              <input
                type="url"
                name="featuredImage"
                className="form-input"
                placeholder="https://example.com/image.jpg"
                value={formData.featuredImage || ""}
                onChange={handleChange}
              />
            </div>

            {/* Excerpt */}
            <div className="form-group full-width">
              <label className="form-label">
                <span className="label-icon">📄</span>
                Excerpt *
              </label>
              <textarea
                name="excerpt"
                className="form-textarea"
                placeholder="Brief description (150-200 characters)"
                value={formData.excerpt}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            {/* Content */}
            <div className="form-group full-width">
              <label className="form-label">
                <span className="label-icon">📰</span>
                Content *
              </label>
              <textarea
                name="content"
                className="form-textarea content"
                placeholder="Write your blog content here..."
                value={formData.content}
                onChange={handleChange}
                rows="15"
                required
              />
            </div>

            {/* Published Checkbox */}
            <div className="form-group full-width">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <span className="checkbox-text">
                  Publish this post
                </span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => router.push("/admin/blogs")}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={saving}>
              {saving ? "Saving..." : "Update Blog Post"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .edit-blog-page {
          max-width: 1200px;
        }

        .page-header {
          margin-bottom: 40px;
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

        .blog-form {
          background: #1a1a1a;
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 16px;
          padding: 40px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #E8B429;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .label-icon {
          font-size: 18px;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 14px 18px;
          background: rgba(0, 0, 0, 0.4);
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 8px;
          color: #ffffff;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #E8B429;
          background: rgba(0, 0, 0, 0.6);
        }

        .form-textarea.content {
          min-height: 400px;
          font-family: monospace;
          line-height: 1.6;
        }

        .form-hint {
          display: block;
          margin-top: 6px;
          color: #888888;
          font-size: 13px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding: 15px;
          background: rgba(206, 155, 40, 0.1);
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .checkbox-label:hover {
          background: rgba(206, 155, 40, 0.15);
          border-color: #E8B429;
        }

        .checkbox-input {
          width: 22px;
          height: 22px;
          cursor: pointer;
        }

        .checkbox-text {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
        }

        .form-actions {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
          margin-top: 40px;
        }

        .btn-cancel,
        .btn-submit {
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .btn-cancel {
          background: transparent;
          color: #888888;
          border: 2px solid rgba(136, 136, 136, 0.3);
        }

        .btn-cancel:hover {
          background: rgba(136, 136, 136, 0.1);
          border-color: #888888;
        }

        .btn-submit {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          color: #000000;
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.4);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .blog-form {
            padding: 25px;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn-cancel,
          .btn-submit {
            width: 100%;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}

