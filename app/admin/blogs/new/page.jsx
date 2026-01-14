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
  const [newTagInput, setNewTagInput] = useState("");
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);

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
        setSlugError("This slug is already in use.");
      } else {
        setSlugError("");
      }
    } catch (error) {
      console.error("Error checking slug:", error);
    }
  };

  const addTag = () => {
    if (newTagInput.trim() && !formData.tags.includes(newTagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTagInput.trim()]
      });
      setNewTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
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
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const response = await fetch('/api/upload/blog-image', {
        method: 'POST',
        body: formDataUpload,
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
    if (e) e.preventDefault();

    if (slugError) {
      alert("Please fix the slug error before submitting.");
      return;
    }

    if (!formData.title) {
      alert("Please enter a title.");
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
        const successTitle = formData.status === 'published' ? 'Published!' : 'Draft Saved';
        alert(`${successTitle} Blog post created successfully!`);
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
      color: isOver ? '#ef4444' : count > maxLength * 0.9 ? '#f59e0b' : '#9ca3af'
    };
  };

  return (
    <DashboardLayout>
      <div className="create-story-page">
        {/* Top Navigation Bar */}
        <div className="story-nav">
          <button onClick={() => router.push('/admin/blogs')} className="btn-back">
            ← Back
          </button>

          <h1 className="nav-title">Create New Story</h1>

          <div className="nav-actions">
            <span className="status-badge">
              {formData.status === 'published' ? 'PUBLISHED' : 'DRAFT'}
            </span>
            <button
              onClick={handleSubmit}
              className="btn-publish"
              disabled={loading}
            >
              {loading ? 'Saving...' : formData.status === 'published' ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>

        <div className="story-layout">
          {/* Main Content Area (Left) */}
          <div className="story-main">
            {/* Title Input */}
            <input
              type="text"
              name="title"
              className="title-input"
              placeholder="Enter an engaging title..."
              value={formData.title}
              onChange={handleChange}
              autoFocus
            />

            {/* Slug Display */}
            <div className="slug-container">
              <span className="slug-prefix">/blogs/</span>
              <input
                type="text"
                name="slug"
                className={`slug-input ${slugError ? 'error' : ''}`}
                value={formData.slug}
                onChange={handleChange}
                placeholder="post-url-slug"
              />
              {slugError && <span className="slug-error-tooltip">{slugError}</span>}
            </div>

            {/* Editor Toolbar is handled inside BlogEditor */}
            <div className="editor-wrapper">
              <BlogEditor
                data={formData.content}
                onChange={handleContentChange}
              />
            </div>
          </div>

          {/* Sidebar Panels (Right) */}
          <div className="story-sidebar">

            {/* Publishing Panel */}
            <div className="sidebar-panel">
              <h3 className="panel-title">Publishing</h3>
              <div className="panel-content">
                <div className="action-row">
                  <button className="btn-secondary" onClick={() => handleSubmit()}>Save Draft</button>
                  <button className="btn-secondary" onClick={() => setShowPreview(true)}>Preview</button>
                </div>

                <div className="status-row">
                  <span className="status-icon">🗝️</span>
                  <span className="label">Status:</span>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="status-select"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                <div className="status-row">
                  <span className="status-icon">👁️</span>
                  <span className="label">Visibility:</span>
                  <span className="value">Public</span>
                </div>

                <div className="status-row">
                  <span className="status-icon">📅</span>
                  <span className="label">Publish:</span>
                  {formData.status === 'scheduled' ? (
                    <input
                      type="datetime-local"
                      name="scheduledPublishAt"
                      value={formData.scheduledPublishAt}
                      onChange={handleChange}
                      className="date-input"
                    />
                  ) : (
                    <span className="value">Immediately</span>
                  )}
                </div>

                <div className="trash-row">
                  <button className="btn-trash" onClick={() => router.push('/admin/blogs')}>Move to Trash</button>
                  <button className="btn-primary-small" onClick={handleSubmit}>Publish</button>
                </div>
              </div>
            </div>

            {/* Categories Panel */}
            <div className="sidebar-panel">
              <h3 className="panel-title">Categories</h3>
              <div className="panel-content">
                <select
                  name="category"
                  className="category-select"
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

                {isAddingCategory ? (
                  <div className="add-category-row">
                    <input
                      type="text"
                      placeholder="New Category Name"
                      className="new-cat-input"
                    />
                    <button className="btn-add-cat">Add</button>
                  </div>
                ) : (
                  <button className="btn-text-action" onClick={() => setIsAddingCategory(true)}>+ Add New Category</button>
                )}
              </div>
            </div>

            {/* Tags Panel */}
            <div className="sidebar-panel">
              <h3 className="panel-title">Tags</h3>
              <div className="panel-content">
                <div className="tags-input-container">
                  <input
                    type="text"
                    placeholder="Add a tag..."
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <button onClick={addTag} className="btn-add-tag">Add</button>
                </div>
                <div className="tags-list">
                  {formData.tags.map((tag, idx) => (
                    <span key={idx} className="tag-chip">
                      {tag}
                      <button onClick={() => removeTag(tag)}>×</button>
                    </span>
                  ))}
                </div>
                <small className="panel-help">Separate tags with Enter.</small>
              </div>
            </div>

            {/* Featured Image Panel */}
            <div className="sidebar-panel">
              <h3 className="panel-title">Featured Image</h3>
              <div className="panel-content">
                <div className="featured-image-box">
                  {formData.featuredImage ? (
                    <div className="image-preview-sidebar">
                      <img src={formData.featuredImage} alt="Featured" />
                      <button
                        className="btn-remove-img"
                        onClick={() => setFormData({ ...formData, featuredImage: '' })}
                      >Remove</button>
                    </div>
                  ) : (
                    <div
                      className="upload-placeholder"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span className="upload-icon">🖼️</span>
                      <span>Set featured image</span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFeaturedImageUpload}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  {imageUploading && <span className="uploading-text">Uploading...</span>}
                </div>
              </div>
            </div>

            {/* SEO Panel */}
            <div className="sidebar-panel">
              <h3 className="panel-title">SEO & Excerpt</h3>
              <div className="panel-content">
                <div className="field-group">
                  <label>Meta Description</label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Write a compelling summary..."
                  ></textarea>
                  <div className="char-count" style={{ color: getCharCount(formData.metaDescription, 160).color }}>
                    {getCharCount(formData.metaDescription, 160).count}/160 chars
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="preview-overlay" onClick={() => setShowPreview(false)}>
            <div className="preview-container" onClick={(e) => e.stopPropagation()}>
              {/* Reusing existing preview layout logic but cleaner */}
              <div className="preview-content-scroll">
                <h1>{formData.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: formData.content }} />
              </div>
              <button className="close-preview" onClick={() => setShowPreview(false)}>Close Preview</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Page Layout */
        .create-story-page {
           background-color: #f3f4f6;
           min-height: 100vh;
           font-family: 'Inter', sans-serif;
           padding-bottom: 50px;
        }

        /* Top Navigation */
        .story-nav {
           background: white;
           height: 70px;
           display: flex;
           align-items: center;
           justify-content: space-between;
           padding: 0 40px;
           box-shadow: 0 1px 3px rgba(0,0,0,0.05);
           position: sticky;
           top: 0;
           z-index: 100;
        }

        .btn-back {
           font-size: 14px;
           color: #6b7280;
           background: none;
           border: none;
           cursor: pointer;
           display: flex;
           align-items: center;
           gap: 6px;
           font-weight: 500;
        }

        .btn-back:hover {
           color: #111827;
        }

        .nav-title {
           font-family: 'Playfair Display', serif;
           font-size: 20px;
           font-weight: 700;
           color: #111827;
           margin: 0;
        }

        .nav-actions {
           display: flex;
           align-items: center;
           gap: 16px;
        }

        .status-badge {
           font-size: 11px;
           font-weight: 700;
           color: #9ca3af;
           background: #f3f4f6;
           padding: 4px 10px;
           border-radius: 4px;
           letter-spacing: 0.5px;
        }

        .btn-publish {
           background: #ce9b28; /* Gold Primary */
           color: white; /* Black Text for contrast on gold? user prompt said black and gold gradient, let's keep black text on gold usually better, but user image shows dark button? Let's stick to brand gold */
           color: #000;
           border: none;
           padding: 10px 24px;
           border-radius: 6px;
           font-weight: 600;
           font-size: 14px;
           cursor: pointer;
           transition: all 0.2s ease;
           box-shadow: 0 2px 5px rgba(206, 155, 40, 0.3);
        }

        .btn-publish:hover {
           background: #b4851e;
           transform: translateY(-1px);
        }

        .btn-publish:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        /* Main Layout Grid */
        .story-layout {
           max-width: 1400px;
           margin: 40px auto;
           display: grid;
           grid-template-columns: 1fr 340px; /* Main Content takes space, Sidebar fixed width */
           gap: 40px;
           padding: 0 20px;
        }

        /* Main Content Column */
        .story-main {
           background: white;
           padding: 60px 80px;
           border-radius: 12px;
           box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
           min-height: 800px;
        }

        .title-input {
           width: 100%;
           border: none;
           font-family: 'Playfair Display', serif;
           font-size: 42px;
           font-weight: 700;
           color: #111827;
           outline: none;
           margin-bottom: 20px;
        }

        .title-input::placeholder {
           color: #e5e7eb;
        }

        .slug-container {
           background: #f9fafb;
           display: inline-flex;
           align-items: center;
           padding: 6px 12px;
           border-radius: 6px;
           margin-bottom: 40px;
           max-width: 100%;
        }

        .slug-prefix {
           color: #9ca3af;
           font-size: 13px;
           font-family: monospace;
        }

        .slug-input {
           border: none;
           background: transparent;
           color: #4b5563;
           font-size: 13px;
           font-family: monospace;
           outline: none;
           min-width: 200px;
        }
        
        .slug-input.error {
            color: #ef4444;
        }
        
        .slug-error-tooltip {
            color: #ef4444;
            font-size: 11px;
            margin-left: 10px;
        }

        /* Sidebar Column */
        .story-sidebar {
           display: flex;
           flex-direction: column;
           gap: 20px;
        }

        .sidebar-panel {
           background: white;
           border-radius: 8px;
           box-shadow: 0 1px 3px rgba(0,0,0,0.05);
           border: 1px solid #f3f4f6;
           overflow: hidden;
        }

        .panel-title {
           margin: 0;
           padding: 16px 20px;
           font-size: 14px;
           font-weight: 600;
           color: #111827;
           border-bottom: 1px solid #f3f4f6;
        }

        .panel-content {
           padding: 20px;
        }

        /* Publishing Panel Styles */
        .action-row {
           display: flex;
           gap: 10px;
           margin-bottom: 20px;
        }

        .btn-secondary {
           flex: 1;
           padding: 8px;
           background: white;
           border: 1px solid #d1d5db;
           border-radius: 6px;
           color: #374151;
           font-size: 13px;
           font-weight: 500;
           cursor: pointer;
           transition: all 0.2s;
        }

        .btn-secondary:hover {
           border-color: #9ca3af;
           background: #f9fafb;
        }

        .status-row {
           display: flex;
           align-items: center;
           margin-bottom: 12px;
           font-size: 13px;
           color: #4b5563;
        }

        .status-icon {
           margin-right: 8px;
           font-size: 14px;
        }

        .label {
           margin-right: 6px;
           font-weight: 500;
        }

        .value {
           color: #111827;
           font-weight: 600;
        }
        
        .status-select {
            border: none;
            background: transparent;
            font-weight: 600;
            color: #ce9b28;
            cursor: pointer;
            outline: none;
        }
        
        .date-input {
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            padding: 2px 4px;
            font-size: 11px;
        }

        .trash-row {
           margin-top: 20px;
           padding-top: 15px;
           border-top: 1px solid #f3f4f6;
           display: flex;
           justify-content: space-between;
           align-items: center;
        }

        .btn-trash {
           color: #ef4444;
           background: none;
           border: none;
           font-size: 12px;
           cursor: pointer;
           text-decoration: underline;
        }
        
        .btn-primary-small {
           background: #2563eb;
           color: white;
           border: none;
           padding: 6px 12px;
           border-radius: 4px;
           font-size: 12px;
           font-weight: 600;
           cursor: pointer;
        }

        /* Category & Tag Styles */
        .category-select {
            width: 100%;
            padding: 8px;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            font-size: 14px;
            color: #374151;
            margin-bottom: 10px;
            outline: none;
        }

        .btn-text-action {
           color: #ce9b28;
           background: none;
           border: none;
           font-size: 13px;
           cursor: pointer;
           text-decoration: underline;
           padding: 0;
        }

        .tags-input-container {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
        
        .tags-input-container input {
            flex: 1;
            padding: 6px 10px;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            font-size: 13px;
        }
        
        .btn-add-tag {
            padding: 6px 12px;
            border: 1px solid #e5e7eb;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
        }

        .tags-list {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 8px;
        }

        .tag-chip {
            font-size: 11px;
            background: #f3f4f6;
            color: #4b5563;
            padding: 2px 8px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .tag-chip button {
            border: none;
            background: none;
            cursor: pointer;
            font-size: 14px;
            color: #9ca3af;
            padding: 0;
            display: flex;
            align-items: center;
        }
        
        .panel-help {
            font-size: 11px;
            color: #9ca3af;
        }

        /* Featured Image Styles */
        .featured-image-box {
            border: 2px dashed #e5e7eb;
            border-radius: 8px;
            padding: 4px;
            text-align: center;
            min-height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .upload-placeholder {
            display: flex;
            flex-direction: column;
            gap: 8px;
            color: #6b7280;
            cursor: pointer;
            font-size: 13px;
            width: 100%;
            height: 100%;
            padding: 30px 0;
        }
        
        .upload-icon {
            font-size: 24px;
            display: block;
        }
        
        .image-preview-sidebar {
            position: relative;
            width: 100%;
        }
        
        .image-preview-sidebar img {
            width: 100%;
            border-radius: 4px;
            display: block;
        }
        
        .btn-remove-img {
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(0,0,0,0.6);
            color: white;
            border: none;
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 10px;
            cursor: pointer;
        }

        /* SEO Panel */
        .field-group label {
            display: block;
            font-size: 12px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 6px;
        }

        .field-group textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            font-size: 13px;
            resize: vertical;
            outline: none;
        }
        
        .char-count {
            text-align: right;
            font-size: 10px;
            margin-top: 4px;
        }

        /* Preview Modal Overlay */
        .preview-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.7);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(4px);
        }
        
        .preview-container {
            background: white;
            width: 90%;
            max-width: 900px;
            height: 85vh;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
        }
        
        .preview-content-scroll {
            padding: 40px;
            overflow-y: auto;
            flex: 1;
        }
        
        .preview-content-scroll h1 {
            font-size: 40px;
            margin-bottom: 20px;
        }
        
        .close-preview {
            position: absolute;
            top: 20px;
            right: 20px;
            background: #111827;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
        }

        /* Loading Spinner */
        .uploading-text {
            color: #ce9b28;
            font-size: 12px;
            font-weight: 600;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
            .story-layout {
                grid-template-columns: 1fr;
                padding: 0 16px;
            }
            
            .story-sidebar {
                display: grid;
                grid-template-columns: 1fr 1fr;
            }
        }
        
        @media (max-width: 768px) {
            .story-sidebar {
                grid-template-columns: 1fr;
            }
            
            .story-main {
                padding: 30px;
            }
            
            .title-input {
                font-size: 32px;
            }
        }
      `}</style>
    </DashboardLayout>
  );
}
