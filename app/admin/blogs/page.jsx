"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css"; // For Font Awesome icons

export default function BlogsManagementPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalCount: 0,
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
        ...(filters.search && { search: filters.search }),
        ...(filters.status && { status: filters.status }),
        ...(filters.category && { category: filters.category }),
      });

      const response = await fetch(`/api/admin/blogs?${params}`);
      const data = await response.json();

      if (response.ok) {
        setBlogs(data.blogs);
        setPagination(prev => ({
          ...prev,
          totalCount: data.pagination.totalCount,
          totalPages: data.pagination.totalPages,
        }));
      } else {
        console.error('Error fetching blogs:', data.message);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Blog deleted successfully!');
        fetchBlogs();
        setDeleteConfirm(null);
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  const handleStatusToggle = async (blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    
    try {
      const response = await fetch(`/api/admin/blogs/${blog.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          published: newStatus === 'published',
          publishedAt: newStatus === 'published' ? new Date().toISOString() : null,
        }),
      });

      if (response.ok) {
        fetchBlogs();
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchBlogs();
  };

  const getStatusBadge = (status) => {
    const badges = {
      draft: { color: '#888', bg: 'rgba(136, 136, 136, 0.1)', label: 'Draft' },
      published: { color: '#4CAF50', bg: 'rgba(76, 175, 80, 0.1)', label: 'Published' },
      scheduled: { color: '#2196F3', bg: 'rgba(33, 150, 243, 0.1)', label: 'Scheduled' },
    };
    
    return badges[status] || badges.draft;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className="blogs-management-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Blog Management</h1>
            <p className="page-subtitle">Manage and organize your blog posts</p>
          </div>
          <Link href="/admin/blogs/new" className="btn-create">
            <i className="fas fa-plus"></i> Create New Blog
          </Link>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              name="search"
              placeholder="Search blogs..."
              value={filters.search}
              onChange={handleFilterChange}
              className="search-input"
            />
            <button type="submit" className="btn-search">
              <i className="fas fa-search"></i> Search
            </button>
          </form>

          <div className="filter-dropdowns">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>

            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Categories</option>
              <option value="General">General</option>
              <option value="News">News</option>
              <option value="Travel Tips">Travel Tips</option>
              <option value="Luxury Travel">Luxury Travel</option>
              <option value="Events">Events</option>
              <option value="Corporate">Corporate</option>
              <option value="Fleet Updates">Fleet Updates</option>
            </select>
          </div>
        </div>

        {/* Blogs Table */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-blog"></i>
            </div>
            <h2>No blogs found</h2>
            <p>Create your first blog post to get started!</p>
            <Link href="/admin/blogs/new" className="btn-create-empty">
              <i className="fas fa-plus-circle"></i> Create New Blog
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="blogs-table-container desktop-view">
              <table className="blogs-table">
                <thead>
                  <tr>
                    <th>IMAGE</th>
                    <th>TITLE</th>
                    <th>CATEGORY</th>
                    <th>STATUS</th>
                    <th>VIEWS</th>
                    <th>DATE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td className="image-cell">
                        <div className="blog-image">
                          {blog.featuredImage ? (
                            <Image
                              src={blog.featuredImage}
                              alt={blog.title}
                              width={80}
                              height={60}
                              style={{ objectFit: 'cover', borderRadius: '8px' }}
                            />
                          ) : (
                            <div className="no-image">
                              <i className="fas fa-image"></i>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="title-cell">
                        <div className="blog-title-cell">
                          <strong className="blog-title">{blog.title}</strong>
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="tags">
                              {blog.tags.slice(0, 3).map((tag, idx) => (
                                <span key={idx} className="tag">
                                  <i className="fas fa-tag"></i> {tag}
                                </span>
                              ))}
                              {blog.tags.length > 3 && (
                                <span className="tag">+{blog.tags.length - 3}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="category-cell">
                        <span className="category-badge">
                          <i className="fas fa-folder"></i> {blog.category}
                        </span>
                      </td>
                      <td className="status-cell">
                        <span
                          className="status-badge"
                          style={{
                            color: getStatusBadge(blog.status).color,
                            background: getStatusBadge(blog.status).bg,
                          }}
                        >
                          <i className={`fas fa-${blog.status === 'published' ? 'check-circle' : blog.status === 'scheduled' ? 'clock' : 'file-alt'}`}></i>
                          {getStatusBadge(blog.status).label}
                        </span>
                      </td>
                      <td className="views-cell">
                        <span className="views">
                          <i className="fas fa-eye"></i> {blog.views}
                        </span>
                      </td>
                      <td className="date-cell">
                        <div className="dates">
                          {blog.publishedAt && (
                            <div className="date-row">
                              <small><i className="fas fa-calendar-check"></i> Created:</small>
                              <span>{formatDate(blog.publishedAt)}</span>
                            </div>
                          )}
                          {blog.scheduledPublishAt && blog.status === 'scheduled' && (
                            <div className="date-row">
                              <small><i className="fas fa-calendar-alt"></i> Scheduled:</small>
                              <span>{formatDate(blog.scheduledPublishAt)}</span>
                            </div>
                          )}
                          {!blog.publishedAt && !blog.scheduledPublishAt && (
                            <div className="date-row">
                              <small><i className="fas fa-calendar-plus"></i> Created:</small>
                              <span>{formatDate(blog.createdAt)}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="actions-cell">
                        <div className="actions">
                          <button
                            onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                            className="btn-action btn-edit"
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => window.open(`/${blog.slug}`, '_blank')}
                            className="btn-action btn-preview"
                            title="Preview"
                          >
                            <i className="fas fa-external-link-alt"></i>
                          </button>
                          <button
                            onClick={() => handleStatusToggle(blog)}
                            className="btn-action btn-toggle"
                            title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                          >
                            <i className={`fas fa-${blog.status === 'published' ? 'arrow-down' : 'arrow-up'}`}></i>
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(blog.id)}
                            className="btn-action btn-delete"
                            title="Delete"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View - Compact Design */}
            <div className="mobile-cards-container mobile-view">
              {blogs.map((blog) => (
                <div key={blog.id} className="blog-card">
                  {/* Image at Top */}
                  <div className="card-image-top">
                    {blog.featuredImage ? (
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        width={280}
                        height={100}
                        style={{ objectFit: 'cover', borderRadius: '8px', width: '100%' }}
                      />
                    ) : (
                      <div className="card-no-image-top">
                        <i className="fas fa-image"></i>
                      </div>
                    )}
                  </div>

                  {/* Title Below Image */}
                  <h3 className="card-title-compact">{blog.title}</h3>

                  {/* Badges Row - Compact */}
                  <div className="card-badges-compact">
                    <span className="badge-category">
                      <i className="fas fa-folder"></i> {blog.category}
                    </span>
                    <span
                      className="badge-status"
                      style={{
                        color: getStatusBadge(blog.status).color,
                        background: getStatusBadge(blog.status).bg,
                      }}
                    >
                      <i className={`fas fa-${blog.status === 'published' ? 'check-circle' : blog.status === 'scheduled' ? 'clock' : 'file-alt'}`}></i>
                      {getStatusBadge(blog.status).label}
                    </span>
                  </div>

                  {/* Views and Date - Compact */}
                  <div className="card-stats-compact">
                    <div className="stat-item">
                      <i className="fas fa-eye"></i>
                      <span>Views</span>
                      <strong>{blog.views}</strong>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                      <i className="fas fa-calendar"></i>
                      <span>Date</span>
                      <strong>
                        {blog.publishedAt
                          ? formatDate(blog.publishedAt)
                          : blog.scheduledPublishAt && blog.status === 'scheduled'
                          ? formatDate(blog.scheduledPublishAt)
                          : formatDate(blog.createdAt)}
                      </strong>
                    </div>
                  </div>

                  {/* Action Buttons - Compact 2x2 Grid */}
                  <div className="card-actions-compact">
                    <button
                      onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                      className="btn-compact btn-edit"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                      className="btn-compact btn-preview"
                      title="Preview"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      Preview
                    </button>
                    <button
                      onClick={() => handleStatusToggle(blog)}
                      className="btn-compact btn-toggle"
                      title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                    >
                      <i className={`fas fa-${blog.status === 'published' ? 'arrow-down' : 'arrow-up'}`}></i>
                      {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(blog.id)}
                      className="btn-compact btn-delete"
                      title="Delete"
                    >
                      <i className="fas fa-trash-alt"></i>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="btn-page"
                >
                  <i className="fas fa-arrow-left"></i> Previous
                </button>
                <span className="page-info">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.totalPages}
                  className="btn-page"
                >
                  Next <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            )}
          </>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this blog post? This action cannot be undone.</p>
              <div className="modal-actions">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="btn-modal-cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="btn-modal-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .blogs-management-page {
          max-width: 1600px;
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

        .btn-create {
          padding: 14px 28px;
          background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
          color: #000;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .btn-create:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.4);
        }

        .filters-section {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .search-form {
          display: flex;
          gap: 10px;
          flex: 1;
          min-width: 300px;
        }

        .search-input {
          flex: 1;
          padding: 12px 18px;
          background: #ffffff;
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #E8B429;
          box-shadow: 0 0 0 3px rgba(206, 155, 40, 0.1);
        }

        .btn-search {
          padding: 12px 24px;
          background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
          color: #000;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-search:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.4);
        }

        .filter-dropdowns {
          display: flex;
          gap: 10px;
        }

        .filter-select {
          padding: 12px 18px;
          background: #ffffff;
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: #E8B429;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
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
          padding: 80px 20px;
          background: #ffffff;
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 16px;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          color: #ce9b28;
        }

        .empty-icon i {
          font-size: 64px;
        }

        .empty-state h2 {
          color: #333;
          margin: 0 0 10px 0;
        }

        .empty-state p {
          color: #666;
          margin: 0 0 30px 0;
        }

        .btn-create-empty {
          display: inline-block;
          padding: 14px 28px;
          background: linear-gradient(90deg, #ce9b28 0%, #E8B429 100%);
          color: #000;
          border-radius: 8px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-create-empty:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.4);
        }

        /* Desktop/Mobile View Toggle */
        .desktop-view {
          display: block !important;
        }

        .mobile-view {
          display: none !important;
        }

        /* Table Container */
        .blogs-table-container {
          background: #000000;
          border: 2px solid rgba(206, 155, 40, 0.3);
          border-radius: 16px;
          overflow-x: auto;
        }

        .blogs-table {
          width: 100%;
          border-collapse: collapse;
        }

        .blogs-table thead {
          background: linear-gradient(90deg, rgba(206, 155, 40, 0.15) 0%, rgba(232, 180, 41, 0.15) 100%);
        }

        .blogs-table th {
          padding: 18px 15px;
          text-align: left;
          font-weight: 700;
          color: #ffffff;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          vertical-align: middle;
        }

        .blogs-table td {
          padding: 18px 15px;
          border-top: 1px solid rgba(206, 155, 40, 0.2);
          vertical-align: middle;
        }

        .blogs-table tbody tr {
          transition: background 0.3s ease;
        }

        .blogs-table tbody tr:hover {
          background: rgba(206, 155, 40, 0.05);
        }

        /* Image Cell */
        .image-cell {
          width: 100px;
        }

        .blog-image {
          width: 80px;
          height: 60px;
        }

        .no-image {
          width: 80px;
          height: 60px;
          background: rgba(206, 155, 40, 0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #ce9b28;
        }

        /* Title Cell */
        .title-cell {
          max-width: 350px;
        }

        .blog-title-cell {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .blog-title {
          display: block;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tag {
          padding: 4px 10px;
          background: rgba(206, 155, 40, 0.15);
          color: #ce9b28;
          border: 1px solid rgba(206, 155, 40, 0.3);
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .tag i {
          font-size: 8px;
        }

        /* Category Cell */
        .category-cell {
          white-space: nowrap;
        }

        .category-badge {
          padding: 6px 12px;
          background: rgba(33, 150, 243, 0.15);
          color: #2196F3;
          border: 1px solid rgba(33, 150, 243, 0.3);
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        /* Status Cell */
        .status-cell {
          white-space: nowrap;
        }

        .status-badge {
          padding: 6px 12px;
          border: 1px solid currentColor;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .status-badge i {
          font-size: 10px;
        }

        /* Views Cell */
        .views-cell {
          text-align: center;
          color: #ffffff;
        }

        .views {
          font-weight: 600;
          color: #E8B429;
          font-size: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        /* Date Cell */
        .date-cell {
          min-width: 140px;
        }

        .dates {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .date-row {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .date-row small {
          color: #888888;
          font-size: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .date-row small i {
          font-size: 9px;
        }

        .date-row span {
          color: #ffffff;
          font-size: 11px;
          font-weight: 500;
        }

        /* Actions Cell */
        .actions-cell {
          width: 180px;
        }

        .actions {
          display: flex;
          gap: 6px;
          justify-content: flex-end;
        }

        .btn-action {
          width: 38px;
          height: 38px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-action i {
          font-size: 14px;
        }

        .btn-edit {
          background: rgba(33, 150, 243, 0.15);
          color: #2196F3;
          border: 1px solid rgba(33, 150, 243, 0.3);
        }

        .btn-edit:hover {
          background: rgba(33, 150, 243, 0.25);
          border-color: #2196F3;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
        }

        .btn-preview {
          background: rgba(76, 175, 80, 0.15);
          color: #4CAF50;
          border: 1px solid rgba(76, 175, 80, 0.3);
        }

        .btn-preview:hover {
          background: rgba(76, 175, 80, 0.25);
          border-color: #4CAF50;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        }

        .btn-toggle {
          background: rgba(206, 155, 40, 0.15);
          color: #ce9b28;
          border: 1px solid rgba(206, 155, 40, 0.3);
        }

        .btn-toggle:hover {
          background: rgba(206, 155, 40, 0.25);
          border-color: #ce9b28;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(206, 155, 40, 0.3);
        }

        .btn-delete {
          background: rgba(244, 67, 54, 0.15);
          color: #f44336;
          border: 1px solid rgba(244, 67, 54, 0.3);
        }

        .btn-delete:hover {
          background: rgba(244, 67, 54, 0.25);
          border-color: #f44336;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 30px;
        }

        .btn-page {
          padding: 12px 24px;
          background: #000000;
          border: 2px solid rgba(206, 155, 40, 0.3);
          border-radius: 8px;
          font-weight: 600;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-page:hover:not(:disabled) {
          background: rgba(206, 155, 40, 0.15);
          border-color: #ce9b28;
          transform: translateY(-2px);
        }

        .btn-page:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .page-info {
          color: #ffffff;
          font-weight: 600;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          padding: 40px;
          border-radius: 16px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
        }

        .modal-content h2 {
          margin: 0 0 15px 0;
          color: #333;
        }

        .modal-content p {
          margin: 0 0 30px 0;
          color: #666;
          line-height: 1.6;
        }

        .modal-actions {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
        }

        .btn-modal-cancel,
        .btn-modal-delete {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-modal-cancel {
          background: #f0f0f0;
          color: #333;
        }

        .btn-modal-cancel:hover {
          background: #e0e0e0;
        }

        .btn-modal-delete {
          background: #f44336;
          color: white;
        }

        .btn-modal-delete:hover {
          background: #d32f2f;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(244, 67, 54, 0.4);
        }

        /* Mobile Cards Container - COMPACT */
        .mobile-cards-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .blog-card {
          background: #000000;
          border: 2px solid rgba(206, 155, 40, 0.3);
          border-radius: 12px;
          padding: 12px;
          transition: all 0.3s ease;
        }

        .blog-card:hover {
          border-color: #ce9b28;
          box-shadow: 0 6px 16px rgba(206, 155, 40, 0.2);
        }

        /* Image at Top - Compact */
        .card-image-top {
          width: 100%;
          height: 100px;
          margin-bottom: 10px;
          overflow: hidden;
          border-radius: 8px;
        }

        .card-no-image-top {
          width: 100%;
          height: 100px;
          background: rgba(206, 155, 40, 0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: #ce9b28;
        }

        /* Title - Compact */
        .card-title-compact {
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 8px 0;
          line-height: 1.3;
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Badges Row - Compact */
        .card-badges-compact {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 8px;
        }

        .badge-category,
        .badge-status {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .badge-category {
          background: rgba(33, 150, 243, 0.15);
          color: #2196F3;
          border: 1px solid rgba(33, 150, 243, 0.3);
        }

        .badge-category i,
        .badge-status i {
          font-size: 9px;
        }

        .badge-status {
          border: 1px solid currentColor;
        }

        /* Stats Row - Compact */
        .card-stats-compact {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px;
          background: rgba(206, 155, 40, 0.08);
          border-radius: 6px;
          border-left: 3px solid #ce9b28;
          margin-bottom: 10px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
        }

        .stat-item i {
          color: #ce9b28;
          font-size: 11px;
        }

        .stat-item span {
          color: #888888;
          font-weight: 600;
          text-transform: uppercase;
        }

        .stat-item strong {
          color: #ffffff;
          font-weight: 700;
          margin-left: 2px;
        }

        .stat-divider {
          width: 1px;
          height: 20px;
          background: rgba(206, 155, 40, 0.3);
        }

        /* Action Buttons - COMPACT 2x2 Grid */
        .card-actions-compact {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .btn-compact {
          padding: 10px 8px;
          border: none;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          min-height: 42px;
        }

        .btn-compact i {
          font-size: 12px;
        }

        .btn-compact.btn-edit {
          background: rgba(33, 150, 243, 0.15);
          color: #2196F3;
          border: 1.5px solid rgba(33, 150, 243, 0.3);
        }

        .btn-compact.btn-edit:hover {
          background: rgba(33, 150, 243, 0.25);
          border-color: #2196F3;
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(33, 150, 243, 0.3);
        }

        .btn-compact.btn-preview {
          background: rgba(76, 175, 80, 0.15);
          color: #4CAF50;
          border: 1.5px solid rgba(76, 175, 80, 0.3);
        }

        .btn-compact.btn-preview:hover {
          background: rgba(76, 175, 80, 0.25);
          border-color: #4CAF50;
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(76, 175, 80, 0.3);
        }

        .btn-compact.btn-toggle {
          background: rgba(206, 155, 40, 0.15);
          color: #ce9b28;
          border: 1.5px solid rgba(206, 155, 40, 0.3);
        }

        .btn-compact.btn-toggle:hover {
          background: rgba(206, 155, 40, 0.25);
          border-color: #ce9b28;
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(206, 155, 40, 0.3);
        }

        .btn-compact.btn-delete {
          background: rgba(244, 67, 54, 0.15);
          color: #f44336;
          border: 1.5px solid rgba(244, 67, 54, 0.3);
        }

        .btn-compact.btn-delete:hover {
          background: rgba(244, 67, 54, 0.25);
          border-color: #f44336;
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(244, 67, 54, 0.3);
        }

        @media (max-width: 1200px) {
          .blogs-table {
            font-size: 13px;
          }
          
          .title-cell {
            max-width: 250px;
          }

          .blog-title {
            font-size: 13px;
          }

          .btn-action {
            width: 34px;
            height: 34px;
          }

          .btn-action i {
            font-size: 12px;
          }
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-create {
            width: 100%;
            justify-content: center;
          }

          .filters-section {
            flex-direction: column;
          }

          .search-form {
            min-width: 100%;
          }

          .filter-dropdowns {
            flex-direction: column;
          }

          .filter-select {
            width: 100%;
          }
        }

        /* CRITICAL: View switching between desktop and mobile */
        @media (min-width: 769px) {
          /* Desktop: Show table ONLY, hide cards */
          .desktop-view {
            display: block !important;
          }

          .mobile-view {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          /* Mobile: Show cards ONLY, hide table */
          .desktop-view {
            display: none !important;
          }

          .mobile-view {
            display: block !important;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
