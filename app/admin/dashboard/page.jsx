"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalContacts: 0,
    totalBlogs: 0,
  });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentBlogs();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch real stats from API
      const [bookingsRes, contactsRes, blogsRes] = await Promise.all([
        fetch('/api/admin/bookings').catch(() => ({ ok: false })),
        fetch('/api/admin/contacts').catch(() => ({ ok: false })),
        fetch('/api/admin/blogs').catch(() => ({ ok: false })),
      ]);

      const bookings = bookingsRes.ok ? await bookingsRes.json() : [];
      const contacts = contactsRes.ok ? await contactsRes.json() : [];
      const blogs = blogsRes.ok ? await blogsRes.json() : [];

      setStats({
        totalBookings: Array.isArray(bookings) ? bookings.length : 0,
        totalContacts: Array.isArray(contacts) ? contacts.length : 0,
        totalBlogs: Array.isArray(blogs) ? blogs.length : 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchRecentBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs');
      if (response.ok) {
        const blogs = await response.json();
        // Get only the 3 most recent blogs
        const recent = Array.isArray(blogs) 
          ? blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3)
          : [];
        setRecentBlogs(recent);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const statCards = [
    {
      title: "Total Blogs",
      value: stats.totalBlogs,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      color: "#3B82F6",
      borderColor: "#3B82F6",
    },
    {
      title: "Total Views",
      value: "2,287",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      ),
      color: "#A855F7",
      borderColor: "#A855F7",
    },
    {
      title: "Total Inquiries",
      value: stats.totalContacts,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      color: "#0a2463",
      borderColor: "#0a2463",
    },
    {
      title: "Total Quotes",
      value: stats.totalBookings,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      ),
      color: "#A855F7",
      borderColor: "#A855F7",
    },
  ];

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Welcome back! Here's what's happening with your blog.</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {statCards.map((card, index) => (
            <div key={index} className="stat-card" style={{ borderBottomColor: card.borderColor }}>
              <div className="stat-icon-wrapper" style={{ backgroundColor: card.color + '15' }}>
                <div style={{ color: card.color }}>
                  {card.icon}
                </div>
              </div>
              <div className="stat-info">
                <div className="stat-label">{card.title}</div>
                <div className="stat-value">{card.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="content-grid">
          {/* Quick Actions */}
          <div className="section quick-actions-section">
            <h2 className="section-title">Quick Actions</h2>
            <div className="actions-container">
              <Link 
                href="/admin/blogs/new" 
                className="admin-action-btn admin-primary-action"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 24px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: '#000000',
                  color: '#ffffff',
                  border: '2px solid rgb(2, 2, 2)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <span style={{ color: '#ffffff' }}>Create New Blog</span>
              </Link>
              
              <Link 
                href="/admin/blogs" 
                className="admin-action-btn admin-secondary-action"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 24px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: '#ffffff',
                  color: '#0a2463',
                  border: '2px solid rgb(0, 0, 0)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="9" y1="9" x2="10" y2="9"></line>
                    <line x1="9" y1="13" x2="15" y2="13"></line>
                    <line x1="9" y1="17" x2="15" y2="17"></line>
                  </svg>
                </div>
                <span style={{ color: '#000000' }}>View All Blogs</span>
              </Link>
              
              <Link 
                href="/admin/profile" 
                className="admin-action-btn admin-tertiary-action"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 24px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: '#ffffff',
                  color: 'rgb(216, 192, 69)',
                  border: '2px solid rgb(216, 192, 69)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(216, 192, 69)" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </div>
                <span style={{ color: 'rgb(216, 192, 69)' }}>Edit Profile</span>
              </Link>
              
              <Link 
                href="/admin/contacts" 
                className="admin-action-btn admin-quaternary-action"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 24px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: '#f9fafb',
                  color: '#0a2463',
                  border: '2px solid #e5e7eb'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <span style={{ color: '#000000' }}>Manage Contacts</span>
              </Link>
            </div>
          </div>

          {/* Recent Blogs */}
          <div className="section recent-blogs-section">
            <div className="section-header">
              <h2 className="section-title">Recent Blogs</h2>
              <Link 
                href="/admin/blogs" 
                className="admin-view-all-link"
                style={{
                  color: '#FFA500',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                View All →
              </Link>
            </div>
            <div className="blogs-list">
              {loading ? (
                <div className="loading-message">Loading blogs...</div>
              ) : recentBlogs.length > 0 ? (
                recentBlogs.map((blog) => (
                  <div key={blog.id} className="blog-item">
                    <div className="blog-info">
                      <div className="blog-title">{blog.title}</div>
                      <div className="blog-date">{formatDate(blog.createdAt)}</div>
                    </div>
                    <span className={`blog-status ${blog.published ? 'published' : 'draft'}`}>
                      {blog.published ? 'published' : 'draft'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="no-blogs-message">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                  </svg>
                  <p style={{ fontSize: '16px', margin: '0 0 20px 0', fontWeight: '500', color: '#64748b' }}>No blogs available</p>
                  <Link 
                    href="/admin/blogs/new" 
                    className="admin-create-blog-btn"
                    style={{
                      display: 'inline-block',
                      padding: '12px 28px',
                      background: '#000000',
                      color: '#ffffff',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontSize: '15px',
                      fontWeight: '600',
                      border: '2px solid #000000',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                  >
                    Create your first blog
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-page {
          max-width: 1600px;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .page-title {
          font-size: 32px;
          font-weight: 900;
          color:rgb(0, 0, 0);
          margin: 0 0 8px 0;
        }

        .page-subtitle {
          color: #64748b;
          font-size: 15px;
          margin: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 0;
          overflow: hidden;
          border-bottom-width: 4px;
          border-bottom-style: solid;
          transition: all 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .stat-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 24px 24px 16px 24px;
        }

        .stat-info {
          padding: 0 24px 24px 24px;
        }

        .stat-label {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 700;
          color: #0a2463;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 24px;
        }

        .section {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 28px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .quick-actions-section {
          background: #ffffff;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 22px;
          font-weight: 700;
          color: #0a2463;
          margin: 0 0 24px 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .admin-view-all-link:hover {
          text-decoration: underline !important;
          color: #ff8c00 !important;
        }

        .admin-view-all-link:link,
        .admin-view-all-link:visited,
        .admin-view-all-link:active {
          color: #FFA500 !important;
          text-decoration: none !important;
        }

        .actions-container {
          display: flex !important;
          flex-direction: column !important;
          gap: 16px !important;
        }

        .admin-action-btn {
          transition: all 0.2s ease !important;
          cursor: pointer !important;
        }

        .admin-primary-action:hover {
          background: #081b4d !important;
          border-color: #081b4d !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(10, 36, 99, 0.2) !important;
          color: #ffffff !important;
        }

        .admin-primary-action:hover span {
          color: #ffffff !important;
        }

        .admin-secondary-action:hover {
          background: #f8f9fb !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 2px 8px rgba(10, 36, 99, 0.1) !important;
          color: #0a2463 !important;
        }

        .admin-secondary-action:hover span {
          color: #0a2463 !important;
        }

        .admin-tertiary-action:hover {
          background: #fff9f0 !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 2px 8px rgba(255, 165, 0, 0.15) !important;
          color: #FFA500 !important;
        }

        .admin-tertiary-action:hover span {
          color: #FFA500 !important;
        }

        .admin-quaternary-action:hover {
          background: #ffffff !important;
          border-color: #cbd5e1 !important;
          transform: translateY(-1px) !important;
          color: #0a2463 !important;
        }

        .admin-quaternary-action:hover span {
          color: #0a2463 !important;
        }

        /* Override any link styles from template */
        .admin-action-btn:link,
        .admin-action-btn:visited,
        .admin-action-btn:active,
        .admin-action-btn:focus {
          text-decoration: none !important;
          outline: none !important;
        }

        .blogs-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .blog-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
          gap: 16px;
          border: 1px solid #FFA500;
        }

        .blog-info {
          flex: 1;
        }

        .blog-title {
          font-size: 15px;
          font-weight: 600;
          color: #0a2463;
          margin-bottom: 6px;
        }

        .blog-date {
          font-size: 13px;
          color: #64748b;
        }

        .blog-status {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }

        .blog-status.published {
          background: #d1fae5;
          color: #059669;
        }

        .blog-status.draft {
          background: #fef3c7;
          color: #d97706;
        }

        .loading-message {
          text-align: center !important;
          padding: 40px 20px !important;
          color: #64748b !important;
          font-size: 15px !important;
        }

        .no-blogs-message {
          text-align: center !important;
          padding: 60px 20px !important;
          color: #64748b !important;
        }

        .no-blogs-message svg {
          margin: 0 auto 20px !important;
          opacity: 0.3 !important;
          stroke: #94a3b8 !important;
        }

        .admin-create-blog-btn:hover {
          background: #1a1a1a !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3) !important;
          color: #ffffff !important;
        }

        .admin-create-blog-btn:active {
          transform: translateY(0) !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
        }

        /* Override any link styles */
        .admin-create-blog-btn:link,
        .admin-create-blog-btn:visited,
        .admin-create-blog-btn:focus {
          color: #ffffff !important;
          text-decoration: none !important;
        }

        @media (max-width: 1200px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .quick-actions-section {
            max-width: 600px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .page-title {
            font-size: 24px;
          }

          .section {
            padding: 20px;
          }

          .action-btn {
            padding: 16px 20px;
            font-size: 15px;
          }

          .action-icon {
            width: 24px;
            height: 24px;
          }

          .action-icon svg {
            width: 22px;
            height: 22px;
          }

          .section-title {
            font-size: 20px;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
