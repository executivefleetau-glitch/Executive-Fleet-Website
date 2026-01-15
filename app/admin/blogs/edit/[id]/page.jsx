"use client";
import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { useRouter, useParams } from "next/navigation";
import { calculateReadTime, generateSlug, isValidSlug } from "@/lib/blog-utils";
import BlogEditor from "@/components/admin/BlogEditor";
import BlogDetail from "@/components/blog/BlogDetail";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [slugError, setSlugError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [customCategories, setCustomCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    category: "General",
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

  // Fetch existing blog data
  useEffect(() => {
    if (blogId) {
      fetchBlogData();
    }
  }, [blogId]);

  const fetchBlogData = async () => {
    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`);
      const data = await response.json();

      if (response.ok) {
        const blog = data.blog;
        setFormData({
          title: blog.title || "",
          slug: blog.slug || "",
          excerpt: blog.excerpt || "",
          content: blog.content || "",
          featuredImage: blog.featuredImage || "",
          category: blog.category || "General",
          template: blog.template || "classic",
          tags: blog.tags || [],
          author: blog.author || "Executive Fleet",
          status: blog.status || "draft",
          metaDescription: blog.metaDescription || "",
          metaKeywords: blog.metaKeywords || "",
          scheduledPublishAt: blog.scheduledPublishAt
            ? new Date(blog.scheduledPublishAt).toISOString().slice(0, 16)
            : "",
          published: blog.published || false,
        });

        // If category is not in default list, add to custom categories
        const defaultCategories = ["General", "News", "Travel Tips", "Luxury Travel", "Events", "Corporate", "Fleet Updates"];
        if (blog.category && !defaultCategories.includes(blog.category)) {
          setCustomCategories(prev => [...prev, blog.category]);
        }

      } else {
        alert('Error loading blog');
        router.push('/admin/blogs');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      alert('Failed to load blog');
      router.push('/admin/blogs');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;

    // Auto-generate slug from title ONLY if slug is empty (don't overwrite existing slug on edit unless user wants to)
    // Actually, usually on edit we don't auto-change slug when title changes unless user explicitly edits slug
    // So sticking to simple update for title
    if (name === "title") {
      setFormData({
        ...formData,
        title: value,
      });
      // We do NOT auto-update slug on edit title change to prevent SEO breakage of existing URLs
    } else if (name === "slug") {
      setFormData({
        ...formData,
        slug: value,
      });

      // Validate slug format
      if (value && !isValidSlug(value)) {
        setSlugError("Slug can only contain lowercase letters, numbers, and hyphens");
      } else if (value) {
        checkSlugUniqueness(value, blogId);
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

  const checkSlugUniqueness = async (slug, excludeId) => {
    try {
      const response = await fetch(`/api/admin/blogs/check-slug?slug=${slug}&excludeId=${excludeId}`);
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

  const addNewCategory = () => {
    if (newCategoryInput.trim()) {
      const newCategory = newCategoryInput.trim();

      // Add to custom categories list if not already there
      if (!customCategories.includes(newCategory)) {
        setCustomCategories([...customCategories, newCategory]);
      }

      // Set as selected category
      setFormData({
        ...formData,
        category: newCategory
      });

      setNewCategoryInput("");
      setIsAddingCategory(false);
    }
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

      // Generate excerpt if empty (auto-generation logic sync)
      const excerpt = formData.excerpt || formData.metaDescription || (formData.content ? formData.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...' : '');

      // Prepare data
      const blogData = {
        ...formData,
        readTime: readTime,
        excerpt: excerpt, // Ensure excerpt is sent
        publishedAt: formData.status === "published" && !formData.publishedAt ? new Date().toISOString() : formData.publishedAt,
        scheduledPublishAt: formData.scheduledPublishAt || null,
      };

      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        alert("Blog post updated successfully!");
        router.push("/admin/blogs");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}${error.error ? ` - ${error.error}` : ''}`);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog post");
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

  if (fetching) {
    return (
      <DashboardLayout>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div className="spinner"></div>
          <p>Loading blog content...</p>
          <style jsx>{`
            .spinner {
              width: 50px;
              height: 50px;
              border: 4px solid rgba(206, 155, 40, 0.2);
              border-top-color: #ce9b28;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="create-story-page">
        {/* Top Navigation Bar */}
        <div className="story-nav">
          <button onClick={() => router.push('/admin/blogs')} className="btn-back">
            ← Back
          </button>

          <h1 className="nav-title">Edit Story</h1>

          <div className="nav-actions">
            <span className="status-badge">
              {formData.status === 'published' ? 'PUBLISHED' : 'DRAFT'}
            </span>
            <button
              onClick={handleSubmit}
              className="btn-publish"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Update'}
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
                  <button className="btn-secondary" onClick={() => handleSubmit()}>Save Changes</button>
                  <button className="btn-secondary" onClick={() => {
                    // Save current state to localStorage for preview
                    localStorage.setItem('preview-blog-data', JSON.stringify({
                      ...formData,
                      id: blogId, // Keep ID reference
                      author: formData.author || "Executive Fleet",
                      publishedAt: formData.publishedAt || new Date().toISOString(),
                    }));
                    setShowPreview(true);
                  }}>Preview</button>
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
                    <span className="value">
                      {formData.publishedAt
                        ? new Date(formData.publishedAt).toLocaleDateString()
                        : "Immediately"}
                    </span>
                  )}
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

                  {/* Custom Categories */}
                  {customCategories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>

                {isAddingCategory ? (
                  <div className="add-category-row">
                    <input
                      type="text"
                      placeholder="New Category Name"
                      className="new-cat-input"
                      value={newCategoryInput}
                      onChange={(e) => setNewCategoryInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addNewCategory())}
                    />
                    <button className="btn-add-cat" onClick={addNewCategory}>Add</button>
                    <button className="btn-cancel-cat" onClick={() => setIsAddingCategory(false)}>×</button>
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

        {/* Beautiful Preview Modal */}
        {showPreview && (
          <div className="preview-overlay" onClick={() => setShowPreview(false)}>
            <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="preview-header">
                <h2>Blog Preview</h2>
                <button className="close-preview-btn" onClick={() => setShowPreview(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Blog Preview Content */}
              <div className="preview-scroll">
                {/* Dynamic Preview Content */}
                <iframe
                  src="/admin/preview-blog?local=true"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    backgroundColor: 'white'
                  }}
                  title="Blog Preview"
                />
              </div>
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
           max-width: 1600px; /* Increased from 1400px */
           margin: 40px auto;
           display: grid;
           grid-template-columns: 1fr 340px; /* Main Content takes space, Sidebar fixed width */
           gap: 30px; /* Reduced gap for more editor space */
           padding: 0 20px;
        }

        /* Main Content Column */
        .story-main {
           background: white;
           padding: 60px 60px; /* Optimized padding - reduced from 100px */
           border-radius: 12px;
           box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
           min-height: 800px;
           width: 100%; /* Ensure full width */
        }

        .editor-wrapper {
           width: 100%; /* Full width */
           max-width: 100%; /* No max-width restriction */
        }

        .title-input {
           width: 100%;
           border: none; /* No border */
           border-bottom: 2px solid transparent; /* Invisible bottom border */
           font-family: 'Playfair Display', serif;
           font-size: 42px;
           font-weight: 700;
           color: #111827;
           outline: none;
           margin-bottom: 20px;
           transition: border-color 0.3s ease;
        }

        .title-input:focus {
           border-bottom-color: #ce9b28; /* Gold underline on focus */
        }

        .title-input::placeholder {
           color: #e5e7eb;
        }

        .slug-container {
           background: transparent; /* Removed background */
           display: inline-flex;
           align-items: center;
           padding: 6px 0; /* Removed horizontal padding */
           border-radius: 0;
           margin-bottom: 40px;
           max-width: 100%;
           border-bottom: 1px solid #e5e7eb; /* Subtle bottom border */
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
           border: 1px solid #e5e7eb;
           color: #374151;
           border-radius: 6px;
           font-size: 13px;
           cursor: pointer;
           transition: all 0.2s;
        }

        .btn-secondary:hover {
           border-color: #ce9b28;
           color: #ce9b28;
           background: #fff;
        }

        .status-row {
           display: flex;
           align-items: center;
           justify-content: space-between;
           margin-bottom: 15px;
           font-size: 13px;
        }

        .status-icon {
           margin-right: 8px;
           font-size: 14px;
           width: 20px;
        }

        .label {
           color: #6b7280;
           flex: 1;
        }

        .value {
           font-weight: 600;
           color: #374151;
        }

        .status-select {
           padding: 4px 8px;
           border: 1px solid #e5e7eb;
           border-radius: 4px;
           font-size: 12px;
           color: #374151;
           outline: none;
           max-width: 120px;
        }

        .date-input {
           padding: 4px;
           border: 1px solid #e5e7eb;
           border-radius: 4px;
           font-size: 11px;
           color: #374151;
           max-width: 140px;
        }

        .trash-row {
           margin-top: 20px;
           padding-top: 20px;
           border-top: 1px solid #f3f4f6;
           display: flex;
           justify-content: space-between;
           align-items: center;
        }

        .btn-trash {
           color: #ef4444;
           font-size: 12px;
           background: none;
           border: none;
           cursor: pointer;
           text-decoration: underline;
           padding: 0;
        }

        .btn-primary-small {
           background: #111827;
           color: white;
           border: none;
           padding: 6px 12px;
           border-radius: 4px;
           font-size: 12px;
           cursor: pointer;
        }
        
        .btn-primary-small:hover {
           background: black;
        }

        /* Category Select */
        .category-select {
           width: 100%;
           padding: 8px 12px;
           border: 1px solid #e5e7eb;
           border-radius: 6px;
           font-size: 14px;
           color: #374151;
           outline: none;
           margin-bottom: 10px;
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

        .add-category-row {
            display: flex;
            gap: 6px;
            margin-top: 10px;
        }

        .new-cat-input {
            flex: 1;
            padding: 6px 10px;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            font-size: 13px;
        }

        .btn-add-cat {
            padding: 6px 12px;
            border: 1px solid #ce9b28;
            background: #ce9b28;
            color: #000;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
        }

        .btn-cancel-cat {
            padding: 6px 10px;
            border: 1px solid #e5e7eb;
            background: white;
            color: #666;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
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

        /* Beautiful Preview Modal Styles */
        .preview-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .preview-modal {
            background: #ffffff;
            width: 95%;
            max-width: 1000px;
            height: 90vh;
            max-height: 92vh;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
            animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(40px) scale(0.95);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .preview-header {
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            padding: 24px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 4px solid #ce9b28;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .preview-header h2 {
            margin: 0;
            font-size: 22px;
            font-weight: 700;
            background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 0.5px;
        }

        .close-preview-btn {
            background: rgba(206, 155, 40, 0.15);
            border: 2px solid #ce9b28;
            color: #ce9b28;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 18px;
        }

        .close-preview-btn:hover {
            background: #ce9b28;
            color: #000;
            transform: rotate(90deg) scale(1.1);
            box-shadow: 0 4px 15px rgba(206, 155, 40, 0.4);
        }

        .preview-scroll {
            overflow-y: auto;
            flex: 1;
            background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
        }

        .blog-preview-article {
            max-width: 850px;
            margin: 0 auto;
            padding: 60px 50px 80px;
            background: white;
            min-height: 100%;
        }

        .preview-featured-image {
            width: calc(100% + 100px);
            margin: -60px -50px 50px -50px;
            border-radius: 0;
            overflow: hidden;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
            position: relative;
        }

        .preview-featured-image::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px;
            background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
        }

        .preview-featured-image img {
            width: 100%;
            height: auto;
            display: block;
        }

        .preview-category-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
            color: #000;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 25px;
            box-shadow: 0 4px 12px rgba(206, 155, 40, 0.3);
        }

        .preview-title {
            font-family: 'Playfair Display', serif;
            font-size: 52px;
            font-weight: 800;
            line-height: 1.15;
            color: #000;
            margin: 0 0 30px 0;
            letter-spacing: -0.5px;
        }

        .preview-meta {
            display: flex;
            align-items: center;
            gap: 20px;
            flex-wrap: wrap;
            margin-bottom: 35px;
            padding-bottom: 35px;
            border-bottom: 3px solid #f0f0f0;
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 15px;
            color: #666;
            font-weight: 500;
        }

        .meta-item i {
            color: #ce9b28;
            font-size: 14px;
        }

        .meta-divider {
            color: #ddd;
            font-size: 14px;
            font-weight: 300;
        }

        .preview-excerpt {
            font-size: 20px;
            line-height: 1.7;
            color: #444;
            font-style: italic;
            padding: 30px;
            background: linear-gradient(135deg, rgba(206, 155, 40, 0.08) 0%, rgba(232, 180, 41, 0.05) 100%);
            border-left: 5px solid #ce9b28;
            margin-bottom: 50px;
            border-radius: 0 8px 8px 0;
            box-shadow: 0 2px 8px rgba(206, 155, 40, 0.1);
        }

        .preview-divider {
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, #ce9b28 50%, transparent 100%);
            margin: 50px 0;
            opacity: 0.5;
        }

        .preview-content {
            font-size: 18px;
            line-height: 1.9;
            color: #2d3748;
            margin-bottom: 60px;
            font-family: 'Georgia', serif;
        }

        /* Headings in Preview Content */
        .preview-content h1 {
            font-family: 'Playfair Display', serif;
            font-size: 40px;
            font-weight: 700;
            margin: 50px 0 25px;
            color: #000;
            line-height: 1.3;
            letter-spacing: -0.5px;
        }

        .preview-content h2 {
            font-family: 'Playfair Display', serif;
            font-size: 34px;
            font-weight: 700;
            margin: 45px 0 20px;
            color: #000;
            line-height: 1.3;
            letter-spacing: -0.3px;
        }

        .preview-content h3 {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            font-weight: 700;
            margin: 40px 0 18px;
            color: #1a1a1a;
            line-height: 1.4;
        }

        /* Paragraphs */
        .preview-content p {
            margin-bottom: 25px;
            line-height: 1.9;
        }

        /* Lists - PROPERLY STYLED */
        .preview-content ul,
        .preview-content ol {
            margin: 30px 0;
            padding-left: 40px;
            line-height: 1.9;
            list-style-position: outside !important;
        }

        .preview-content ul {
            list-style-type: disc !important;
        }

        .preview-content ol {
            list-style-type: decimal !important;
        }

        .preview-content li {
            margin-bottom: 15px;
            padding-left: 10px;
            color: #2d3748;
            display: list-item !important;
        }

        .preview-content ul li::marker {
            color: #ce9b28;
            font-size: 1.2em;
        }

        .preview-content ol li::marker {
            color: #ce9b28;
            font-weight: 700;
        }

        /* Nested Lists */
        .preview-content ul ul,
        .preview-content ol ol,
        .preview-content ul ol,
        .preview-content ol ul {
            margin: 15px 0;
            padding-left: 30px;
        }

        /* Links */
        .preview-content a {
            color: #ce9b28;
            text-decoration: none;
            font-weight: 600;
            border-bottom: 2px solid rgba(206, 155, 40, 0.3);
            transition: all 0.3s ease;
        }

        .preview-content a:hover {
            border-bottom-color: #ce9b28;
            color: #b4851e;
        }

        /* Blockquotes */
        .preview-content blockquote {
            border-left: 5px solid #ce9b28;
            padding: 25px 30px;
            margin: 35px 0;
            background: linear-gradient(135deg, rgba(206, 155, 40, 0.05) 0%, rgba(232, 180, 41, 0.03) 100%);
            font-style: italic;
            color: #555;
            font-size: 19px;
            line-height: 1.8;
            border-radius: 0 8px 8px 0;
        }

        .preview-content blockquote p {
            margin-bottom: 0;
        }

        /* Images */
        .preview-content img {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
            margin: 40px 0;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
            display: block;
        }

        /* --- MODERN THEME STYLES --- */
        .modern-theme { background: #fff; font-family: 'DM Sans', sans-serif; padding-bottom: 50px; }
        .modern-container { max-width: 800px; margin: 0 auto; padding: 0 40px; position: relative; }
        .modern-hero { text-align: center; padding: 40px 0 30px; }
        .modern-category { font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #ce9b28; font-weight: 700; margin-bottom: 20px; display: block; }
        .modern-title { font-size: 48px; line-height: 1.1; margin-bottom: 20px; letter-spacing: -1px; font-weight: 800; color: #000; }
        .modern-meta { color: #666; font-size: 15px; }
        .modern-image-container { position: relative; width: 100%; height: 400px; margin-top: 40px; }
        .modern-image-container img { width: 100%; height: 100%; object-fit: cover; }
        .modern-content { margin-top: 50px; font-size: 18px; line-height: 1.8; color: #333; }
        .modern-tags { margin-top: 50px; border-top: 1px solid #eee; padding-top: 30px; }
        .modern-tag { margin-right: 15px; color: #888; font-size: 14px; }
        
        /* Modern Content specific overrides */
        .modern-content :global(h2) { font-size: 32px; font-weight: 800; margin-top: 40px; }
        .modern-content :global(p) { margin-bottom: 24px; }
        .modern-content :global(ul) { list-style-type: disc; padding-left: 20px; margin: 20px 0; }
        .modern-content :global(ol) { list-style-type: decimal; padding-left: 20px; margin: 20px 0; }
        .modern-content :global(li) { margin-bottom: 10px; padding-left: 10px; }
        .modern-content :global(li::marker) { color: #ce9b28; }

        /* --- BOLD THEME STYLES --- */
        .bold-theme { background: #f8f8f8; font-family: 'Playfair Display', serif; min-height: 100%; }
        .bold-hero { position: relative; height: 500px; width: 100%; display: flex; align-items: flex-end; justify-content: center; text-align: center; color: white; overflow: hidden; }
        .bold-hero img { position: absolute; width: 100%; height: 100%; object-fit: cover; top: 0; left: 0; }
        .bold-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); z-index: 1; }
        .bold-hero-content { position: relative; z-index: 2; padding-bottom: 60px; max-width: 800px; padding-left: 20px; }
        .bold-category { background: #ce9b28; color: #000; padding: 5px 15px; text-transform: uppercase; font-weight: bold; font-size: 12px; letter-spacing: 1px; display: inline-block; margin-bottom: 20px; }
        .bold-title { font-size: 56px; margin-bottom: 15px; text-shadow: 0 4px 10px rgba(0,0,0,0.3); color: #fff; }
        .bold-meta { font-family: 'DM Sans', sans-serif; font-size: 15px; opacity: 0.9; color: #ddd; }
        .bold-container { max-width: 740px; margin: -50px auto 0; background: white; padding: 50px 40px; position: relative; z-index: 10; box-shadow: 0 10px 40px rgba(0,0,0,0.1); border-top: 4px solid #ce9b28; }
        .bold-content { font-family: 'Georgia', serif; font-size: 20px; line-height: 1.8; color: #222; }
        
        /* Bold Content specific overrides */
        .bold-content :global(p:first-of-type::first-letter) { font-size: 3.5em; float: left; line-height: 0.8; padding-right: 10px; color: #ce9b28; font-family: 'Playfair Display', serif; }
        .bold-content :global(ul) { list-style-type: square; margin: 30px 0; padding-left: 30px; }
        .bold-content :global(li::marker) { color: #ce9b28; }
        .bold-content :global(blockquote) { border-left: none; border-top: 2px solid #ce9b28; border-bottom: 2px solid #ce9b28; padding: 30px; text-align: center; font-size: 24px; font-weight: bold; background: transparent; }

        /* Tables */
        .preview-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 35px 0;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            border-radius: 8px;
            overflow: hidden;
        }

        .preview-content table td,
        .preview-content table th {
            border: 1px solid #e5e7eb;
            padding: 16px 20px;
            text-align: left;
        }

        .preview-content table th {
            background: linear-gradient(135deg, rgba(206, 155, 40, 0.15) 0%, rgba(232, 180, 41, 0.1) 100%);
            font-weight: 700;
            color: #000;
            font-size: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .preview-content table tr:nth-child(even) {
            background: #f9fafb;
        }

        .preview-content table tr:hover {
            background: rgba(206, 155, 40, 0.05);
        }

        /* Code blocks */
        .preview-content pre {
            background: #1a1a1a;
            color: #e5e7eb;
            padding: 25px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 30px 0;
            font-size: 14px;
            line-height: 1.6;
        }

        .preview-content code {
            background: rgba(206, 155, 40, 0.1);
            color: #ce9b28;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 16px;
            font-family: 'Courier New', monospace;
        }

        .preview-content pre code {
            background: transparent;
            color: inherit;
            padding: 0;
        }

        /* Horizontal Rule */
        .preview-content hr {
            border: none;
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, #ce9b28 50%, transparent 100%);
            margin: 50px 0;
            opacity: 0.5;
        }

        /* Tags Section */
        .preview-tags {
            padding-top: 40px;
            margin-top: 40px;
            border-top: 3px solid #f0f0f0;
        }

        .tags-label {
            font-size: 15px;
            font-weight: 700;
            color: #666;
            margin-bottom: 18px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .tags-container {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
        }

        .preview-tag {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
            border: 2px solid #e5e7eb;
            color: #666;
            padding: 10px 18px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .preview-tag:hover {
            background: linear-gradient(135deg, rgba(206, 155, 40, 0.15) 0%, rgba(232, 180, 41, 0.1) 100%);
            border-color: #ce9b28;
            color: #ce9b28;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(206, 155, 40, 0.2);
        }

        .preview-tag i {
            font-size: 12px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
            .blog-preview-article {
                padding: 40px 30px 60px;
            }

            .preview-featured-image {
                width: calc(100% + 60px);
                margin: -40px -30px 40px -30px;
            }

            .preview-title {
                font-size: 38px;
            }

            .preview-content {
                font-size: 17px;
            }

            .preview-content h1 {
                font-size: 32px;
            }

            .preview-content h2 {
                font-size: 28px;
            }

            .preview-content h3 {
                font-size: 24px;
            }
        }

        /* Loading Spinner */
        .uploading-text {
            color: #ce9b28;
            font-size: 12px;
            font-weight: 600;
        }

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
