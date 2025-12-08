"use client";
import { useState } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData({
        ...formData,
        title: value,
        slug: slug,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          publishedAt: formData.published ? new Date().toISOString() : null,
        }),
      });

      if (response.ok) {
        alert("Blog post created successfully!");
        router.push("/admin/blogs");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="create-blog-page">
        {/* Coming Soon Message */}
        <div className="coming-soon-container">
          {/* Icon */}
          <div className="icon-wrapper">
            <svg 
              className="coming-soon-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M14 2V8H20" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M16 13H8" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M16 17H8" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M10 9H8" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Main Heading */}
          <h1 className="coming-soon-title">
            Create New Blog
          </h1>

          {/* Coming Soon Badge */}
          <div className="coming-soon-badge">
            <svg 
              className="badge-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <path 
                d="M12 6V12L16 14" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span>Coming Soon</span>
          </div>

          {/* Description */}
          <p className="coming-soon-description">
            The blog creation feature is currently under development. Soon you'll be able to create engaging blog posts with our powerful editor, complete with rich text formatting, image uploads, and SEO optimization.
          </p>

          {/* Features Preview */}
          <div className="features-preview">
            <div className="feature-item">
              <svg 
                className="feature-icon" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M9 11L12 14L22 4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span>WYSIWYG Editor</span>
            </div>
            <div className="feature-item">
              <svg 
                className="feature-icon" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M9 11L12 14L22 4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span>Media Management</span>
            </div>
            <div className="feature-item">
              <svg 
                className="feature-icon" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M9 11L12 14L22 4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span>Auto-Save Drafts</span>
            </div>
          </div>
        </div>

        {/* Hidden Form - Keeping for future use */}
        <div className="page-header hidden-content">
          <h1 className="page-title">Create New Blog Post</h1>
          <p className="page-subtitle">Share your insights and updates</p>
        </div>

        <form onSubmit={handleSubmit} className="blog-form hidden-content">
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
                value={formData.featuredImage}
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
                  Publish immediately
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
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Creating..." : "Create Blog Post"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        /* Hide the form */
        .hidden-content {
          display: none !important;
        }

        .create-blog-page {
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
        }

        .coming-soon-container {
          max-width: 700px;
          text-align: center;
          animation: fadeInUp 0.8s ease;
        }

        /* Icon Wrapper */
        .icon-wrapper {
          margin: 0 auto 40px;
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.1), rgba(232, 180, 41, 0.05));
          border: 3px solid rgba(206, 155, 40, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: iconFloat 3s ease-in-out infinite;
        }

        .coming-soon-icon {
          width: 60px;
          height: 60px;
          color: #ce9b28;
        }

        /* Main Title */
        .coming-soon-title {
          font-size: 56px;
          font-weight: 800;
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 30px 0;
          line-height: 1.2;
          letter-spacing: -1px;
        }

        /* Coming Soon Badge */
        .coming-soon-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: rgba(0, 0, 0, 0.4);
          border: 2px solid rgba(206, 155, 40, 0.4);
          border-radius: 50px;
          margin-bottom: 30px;
          animation: badgePulse 2s ease-in-out infinite;
        }

        .badge-icon {
          width: 24px;
          height: 24px;
          color: #e8b429;
        }

        .coming-soon-badge span {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Description */
        .coming-soon-description {
          font-size: 18px;
          line-height: 1.7;
          color: #000000;
          margin: 0 0 50px 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 500;
        }

        /* Features Preview */
        .features-preview {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 600px;
          margin: 0 auto;
        }

        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 20px 15px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(206, 155, 40, 0.2);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: rgba(206, 155, 40, 0.05);
          border-color: rgba(206, 155, 40, 0.4);
          transform: translateY(-3px);
        }

        .feature-icon {
          width: 28px;
          height: 28px;
          color: #e8b429;
          flex-shrink: 0;
        }

        .feature-item span {
          font-size: 14px;
          font-weight: 600;
          color: #000000;
          text-align: center;
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes badgePulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(206, 155, 40, 0.4);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(206, 155, 40, 0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .coming-soon-title {
            font-size: 42px;
          }

          .icon-wrapper {
            width: 100px;
            height: 100px;
            margin-bottom: 30px;
          }

          .coming-soon-icon {
            width: 50px;
            height: 50px;
          }

          .coming-soon-badge {
            padding: 14px 24px;
          }

          .coming-soon-badge span {
            font-size: 16px;
          }

          .coming-soon-description {
            font-size: 16px;
          }

          .features-preview {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }

        @media (max-width: 480px) {
          .coming-soon-title {
            font-size: 32px;
          }

          .icon-wrapper {
            width: 80px;
            height: 80px;
          }

          .coming-soon-icon {
            width: 40px;
            height: 40px;
          }
        }

        /* Old form styles - kept but hidden */
        .create-blog-page {
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

