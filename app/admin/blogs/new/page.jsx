"use client";
import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { useRouter } from "next/navigation";
import { calculateReadTime, generateSlug, isValidSlug } from "@/lib/blog-utils";
import BlogEditor from "@/components/admin/BlogEditor";

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [slugError, setSlugError] = useState("");
  const [lastSaved, setLastSaved] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    category: "General",
    tags: [],
    author: "Executive Fleet",
    status: "draft",
    metaDescription: "",
    metaKeywords: "",
    scheduledPublishAt: "",
    published: false,
  });

  const fileInputRef = useRef(null);

  // Auto-save to localStorage
  useEffect(() => {
    const saveTimer = setInterval(() => {
      if (formData.title || formData.content) {
        localStorage.setItem('blog-draft', JSON.stringify({
          ...formData,
          savedAt: new Date().toISOString()
        }));
        setLastSaved(new Date());
      }
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(saveTimer);
  }, [formData]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('blog-draft');
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      const shouldRestore = window.confirm(
        `A draft was saved on ${new Date(draft.savedAt).toLocaleString()}. Would you like to restore it?`
      );
      if (shouldRestore) {
        setFormData(draft);
      } else {
        localStorage.removeItem('blog-draft');
      }
    }
  }, []);

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    
    // Auto-generate slug from title
    if (name === "title") {
      const slug = generateSlug(value);
      setFormData({
        ...formData,
        title: value,
        slug: slug,
      });
      
      // Check slug uniqueness
      if (slug) {
        checkSlugUniqueness(slug);
      }
    } else if (name === "slug") {
      setFormData({
        ...formData,
        slug: value,
      });
      
      // Validate slug format
      if (value && !isValidSlug(value)) {
        setSlugError("Slug can only contain lowercase letters, numbers, and hyphens");
      } else if (value) {
        checkSlugUniqueness(value);
      } else {
        setSlugError("");
      }
    } else if (name === "status") {
      setFormData({
        ...formData,
        status: value,
        published: value === "published",
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const checkSlugUniqueness = async (slug) => {
    try {
      const response = await fetch(`/api/admin/blogs/check-slug?slug=${slug}`);
      const data = await response.json();
      
      if (!data.available) {
        setSlugError("This slug is already in use. Please choose another.");
      } else {
        setSlugError("");
      }
    } catch (error) {
      console.error("Error checking slug:", error);
    }
  };

  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData({
      ...formData,
      tags: tagsArray,
    });
  };

  const handleContentChange = (content) => {
    setFormData({
      ...formData,
      content: content,
    });
  };

  const handleFeaturedImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/blog-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setFormData(prev => ({
          ...prev,
          featuredImage: data.url,
        }));
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (slugError) {
      alert("Please fix the slug error before submitting.");
      return;
    }

    setLoading(true);

    try {
      // Calculate read time
      const readTime = calculateReadTime(formData.content);
      
      // Prepare data
      const blogData = {
        ...formData,
        readTime: readTime,
        publishedAt: formData.status === "published" ? new Date().toISOString() : null,
        scheduledPublishAt: formData.scheduledPublishAt || null,
      };

      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        localStorage.removeItem('blog-draft');
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

  const getCharCount = (text, maxLength) => {
    const count = text ? text.length : 0;
    const isOver = count > maxLength;
    return {
      count,
      color: isOver ? '#ff4444' : count > maxLength * 0.9 ? '#E8B429' : '#888'
    };
  };

  return (
    <DashboardLayout>
      <div className="create-blog-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Create New Blog Post</h1>
            <p className="page-subtitle">
              Share your insights and updates with your audience
              {lastSaved && (
                <span className="auto-save-indicator">
                  • Auto-saved at {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="btn-preview"
            disabled={!formData.title || !formData.content}
          >
            👁️ Preview
          </button>
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
                placeholder="Enter an engaging blog title"
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
                className={`form-input ${slugError ? 'input-error' : ''}`}
                placeholder="url-friendly-slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
              {slugError && <span className="error-message">{slugError}</span>}
              <span className="form-hint">
                Preview: /blog/{formData.slug || "your-slug"}
              </span>
            </div>

            {/* Category and Author */}
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
                <option value="Corporate">Corporate</option>
                <option value="Fleet Updates">Fleet Updates</option>
              </select>
            </div>

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

            {/* Tags */}
            <div className="form-group full-width">
              <label className="form-label">
                <span className="label-icon">🏷️</span>
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                className="form-input"
                placeholder="luxury, chauffeur, melbourne, airport transfer"
                value={formData.tags.join(', ')}
                onChange={handleTagsChange}
              />
              <span className="form-hint">
                Tags help with SEO and content organization
              </span>
            </div>

            {/* Featured Image */}
            <div className="form-group full-width">
              <label className="form-label">
                <span className="label-icon">🖼️</span>
                Featured Image
              </label>
              <div className="image-upload-container">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFeaturedImageUpload}
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  className="file-input"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-upload"
                  disabled={imageUploading}
                >
                  {imageUploading ? '⏳ Uploading...' : '📁 Choose Image'}
                </button>
                {formData.featuredImage && (
                  <div className="image-preview">
                    <img src={formData.featuredImage} alt="Featured" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                      className="btn-remove-image"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Excerpt */}
            <div className="form-group full-width">
              <label className="form-label">
                <span className="label-icon">📄</span>
                Excerpt *
                <span className="char-counter" style={{ color: getCharCount(formData.excerpt, 300).color }}>
                  {getCharCount(formData.excerpt, 300).count} / 300
                </span>
              </label>
              <textarea
                name="excerpt"
                className="form-textarea"
                placeholder="Brief description (150-300 characters recommended)"
                value={formData.excerpt}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            {/* Content Editor */}
            <div className="form-group full-width">
              <label className="form-label">
                <span className="label-icon">📰</span>
                Content *
              </label>
              <div className="editor-container">
                <BlogEditor
                  data={formData.content}
                  onChange={handleContentChange}
                />
              </div>
            </div>

            {/* SEO Meta Description */}
            <div className="form-group full-width">
              <label className="form-label">
                <span className="label-icon">🔍</span>
                Meta Description (SEO)
                <span className="char-counter" style={{ color: getCharCount(formData.metaDescription, 160).color }}>
                  {getCharCount(formData.metaDescription, 160).count} / 160
                </span>
              </label>
              <textarea
                name="metaDescription"
                className="form-textarea"
                placeholder="Description for search engines (150-160 characters recommended)"
                value={formData.metaDescription}
                onChange={handleChange}
                rows="2"
              />
            </div>

            {/* SEO Meta Keywords */}
            <div className="form-group full-width">
              <label className="form-label">
                <span className="label-icon">🔑</span>
                Meta Keywords (SEO, comma-separated)
              </label>
              <input
                type="text"
                name="metaKeywords"
                className="form-input"
                placeholder="chauffeur service, luxury transport, melbourne airport"
                value={formData.metaKeywords}
                onChange={handleChange}
              />
            </div>

            {/* Publishing Status */}
            <div className="form-group full-width">
              <label className="form-label">
                <span className="label-icon">📅</span>
                Publishing Status
              </label>
              <select
                name="status"
                className="form-input"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="draft">Save as Draft</option>
                <option value="published">Publish Immediately</option>
                <option value="scheduled">Schedule for Later</option>
              </select>
            </div>

            {/* Schedule Date/Time */}
            {formData.status === "scheduled" && (
              <div className="form-group full-width">
                <label className="form-label">
                  <span className="label-icon">⏰</span>
                  Schedule Publish Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="scheduledPublishAt"
                  className="form-input"
                  value={formData.scheduledPublishAt}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 16)}
                  required
                />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => router.push("/admin/blogs")}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-submit" 
              disabled={loading || slugError || !formData.title || !formData.content}
            >
              {loading ? "Creating..." : formData.status === "published" ? "Publish Blog" : "Save Blog"}
            </button>
          </div>
        </form>

        {/* Preview Modal */}
        {showPreview && (
          <div className="preview-modal" onClick={() => setShowPreview(false)}>
            <div className="preview-content" onClick={(e) => e.stopPropagation()}>
              <div className="preview-header">
                <h2>Blog Preview</h2>
                <button onClick={() => setShowPreview(false)} className="btn-close">✕</button>
              </div>
              <div className="preview-body">
                {formData.featuredImage && (
                  <img src={formData.featuredImage} alt={formData.title} className="preview-featured-image" />
                )}
                <h1 className="preview-title">{formData.title || "Untitled Blog"}</h1>
                <div className="preview-meta">
                  <span>By {formData.author}</span>
                  <span>•</span>
                  <span>{formData.category}</span>
                  <span>•</span>
                  <span>{calculateReadTime(formData.content)} min read</span>
                </div>
                {formData.tags.length > 0 && (
                  <div className="preview-tags">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="preview-tag">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="preview-excerpt">{formData.excerpt}</div>
                <div 
                  className="preview-content-html"
                  dangerouslySetInnerHTML={{ __html: formData.content }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .create-blog-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
          gap: 20px;
        }

        .page-title {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 10px 0;
        }

        .page-subtitle {
          color: #666;
          font-size: 16px;
          margin: 0;
        }

        .auto-save-indicator {
          color: #4CAF50;
          margin-left: 10px;
          font-size: 14px;
        }

        .btn-preview {
          padding: 12px 24px;
          background: rgba(206, 155, 40, 0.1);
          border: 2px solid #ce9b28;
          border-radius: 8px;
          color: #ce9b28;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-preview:hover:not(:disabled) {
          background: rgba(206, 155, 40, 0.2);
          transform: translateY(-2px);
        }

        .btn-preview:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .blog-form {
          background: #ffffff;
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #333;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
        }

        .label-icon {
          font-size: 18px;
          flex-shrink: 0;
        }

        .char-counter {
          font-size: 12px;
          font-weight: 500;
          margin-left: auto;
          flex-shrink: 0;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 14px 18px;
          background: #f8f8f8;
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 8px;
          color: #333;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.3s ease;
          position: relative;
          z-index: 0;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #E8B429;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(206, 155, 40, 0.1);
        }

        .input-error {
          border-color: #ff4444;
        }

        .error-message {
          color: #ff4444;
          font-size: 13px;
          margin-top: 5px;
        }

        .form-hint {
          display: block;
          margin-top: 8px;
          color: #888;
          font-size: 13px;
          position: relative;
          z-index: 1;
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
          line-height: 1.6;
        }

        .editor-container {
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 8px;
          overflow: hidden;
          background: #ffffff;
          min-height: 400px;
          position: relative;
        }

        .editor-container :global(.ck-editor) {
          min-height: 400px;
        }

        .editor-container :global(.ck-editor__editable) {
          min-height: 350px;
          max-height: 600px;
        }

        .editor-loading {
          padding: 40px;
          text-align: center;
          color: #888;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-upload-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .file-input {
          display: none;
        }

        .btn-upload {
          padding: 12px 24px;
          background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
          color: #000;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: fit-content;
        }

        .btn-upload:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.4);
        }

        .btn-upload:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .image-preview {
          position: relative;
          max-width: 400px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid rgba(206, 155, 40, 0.3);
        }

        .image-preview img {
          width: 100%;
          height: auto;
          display: block;
        }

        .btn-remove-image {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px;
          height: 32px;
          background: rgba(255, 0, 0, 0.8);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .btn-remove-image:hover {
          background: rgba(255, 0, 0, 1);
          transform: scale(1.1);
        }

        .form-actions {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
          margin-top: 40px;
          padding-top: 30px;
          border-top: 2px solid rgba(206, 155, 40, 0.1);
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
          color: #666;
          border: 2px solid rgba(102, 102, 102, 0.3);
        }

        .btn-cancel:hover {
          background: rgba(102, 102, 102, 0.1);
          border-color: #666;
        }

        .btn-submit {
          background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
          color: #000;
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.4);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Preview Modal */
        .preview-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }

        .preview-content {
          background: white;
          border-radius: 16px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          border-bottom: 2px solid rgba(206, 155, 40, 0.2);
          position: sticky;
          top: 0;
          background: white;
          z-index: 10;
        }

        .preview-header h2 {
          margin: 0;
          color: #ce9b28;
        }

        .btn-close {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: rgba(206, 155, 40, 0.1);
          color: #ce9b28;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .btn-close:hover {
          background: rgba(206, 155, 40, 0.2);
          transform: rotate(90deg);
        }

        .preview-body {
          padding: 40px;
        }

        .preview-featured-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 30px;
        }

        .preview-title {
          font-size: 42px;
          font-weight: 800;
          color: #000;
          margin: 0 0 20px 0;
          line-height: 1.2;
        }

        .preview-meta {
          display: flex;
          gap: 10px;
          color: #666;
          font-size: 15px;
          margin-bottom: 20px;
        }

        .preview-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 25px;
        }

        .preview-tag {
          padding: 6px 16px;
          background: rgba(206, 155, 40, 0.1);
          color: #ce9b28;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .preview-excerpt {
          font-size: 18px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 30px;
          font-style: italic;
        }

        .preview-content-html {
          font-size: 16px;
          line-height: 1.8;
          color: #333;
        }

        .preview-content-html :global(h1),
        .preview-content-html :global(h2),
        .preview-content-html :global(h3) {
          color: #000;
          margin-top: 30px;
          margin-bottom: 15px;
        }

        .preview-content-html :global(img) {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 20px 0;
        }

        .preview-content-html :global(table) {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }

        .preview-content-html :global(td),
        .preview-content-html :global(th) {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }

        .preview-content-html :global(th) {
          background: rgba(206, 155, 40, 0.1);
          font-weight: 700;
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

          .page-header {
            flex-direction: column;
          }

          .preview-title {
            font-size: 32px;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
