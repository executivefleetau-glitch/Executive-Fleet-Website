"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { user, loading, logout, forceSessionCheck } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get user role
  const userRole = user?.role || (user?.isAdmin ? 'admin' : 'editor');

  // Debug authentication state
  useEffect(() => {
    console.log(`🏠 DashboardLayout auth state - Loading: ${loading}, User: ${user?.email || 'null'}, Role: ${userRole}`);
  }, [user, loading, userRole]);

  // Authentication check with debounce to prevent redirect loops
  useEffect(() => {
    console.log(`🔐 DashboardLayout auth check - Loading: ${loading}, User: ${user?.email || 'null'}`);

    if (loading) {
      console.log(`⏳ Still loading authentication...`);
      return; // Still loading
    }

    // Add a small delay to prevent race conditions during login
    const timeoutId = setTimeout(() => {
      if (!user) {
        console.log(`❌ No user found after auth check, redirecting to login`);
        router.push("/admin/login");
        return;
      }

      console.log(`✅ User ${user.email} (${userRole}) is authenticated, allowing access`);
    }, 200); // 200ms delay to let auth state settle

    return () => clearTimeout(timeoutId);
  }, [user, loading, router, userRole]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  const handleLogout = async () => {
    await logout();
  };

  // Show loading spinner while checking authentication
  if (loading || !user) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-content">
          <div className="admin-spinner"></div>
          <p>Loading Dashboard...</p>
          {/* Add manual refresh option after 5 seconds */}
          <div className="loading-debug">
            <p style={{ fontSize: '12px', color: '#666', marginTop: '20px' }}>
              Debug: Loading={loading.toString()}, User={user?.email || 'null'}, Admin={user?.isAdmin?.toString() || 'null'}
            </p>
            {forceSessionCheck && (
              <button
                onClick={forceSessionCheck}
                style={{
                  marginTop: '10px',
                  padding: '8px 16px',
                  background: '#ce9b28',
                  color: '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Force Refresh Auth
              </button>
            )}
          </div>
        </div>
        <style jsx>{`
          .admin-loading-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f6fa;
          }
          
          .admin-loading-content {
            text-align: center;
            color: #666;
          }
          
          .admin-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(206, 155, 40, 0.2);
            border-top-color: #ce9b28;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Define all menu items with role restrictions
  // Order: 1. Dashboard, 2. Bookings, 3. Contact Inquiries, 4. All Blogs, 5. Support, 6. Profile, 7. Settings
  const allMenuItems = [
    {
      title: "Dashboard",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
      path: "/admin/dashboard",
      roles: ["admin", "editor"],
    },
    {
      title: "Bookings",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ),
      path: "/admin/bookings",
      roles: ["admin"],
    },
    {
      title: "Contact Inquiries",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      path: "/admin/contacts",
      roles: ["admin"],
    },
    {
      title: "All Blogs",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
      ),
      path: "/admin/blogs",
      roles: ["admin", "editor"],
    },
    {
      title: "Support",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      path: "/admin/support",
      roles: ["admin", "editor"],
    },
    {
      title: "Profile",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      path: "/admin/profile",
      roles: ["admin"],
    },
    {
      title: "Settings",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      ),
      path: "/admin/settings",
      roles: ["admin"],
    },
  ];

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter(item => item.roles.includes(userRole));

  return (
    <>
      <div className="admin-dashboard-container">
        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-btn ${sidebarOpen ? 'hide-menu-btn' : ''}`}
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="mobile-overlay"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          {/* Close Button (Mobile Only) */}
          <button
            className="mobile-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Logo */}
          <div className="admin-sidebar-logo">
            <Link href="/admin/dashboard" className="admin-logo-link">
              <Image
                src="/assets/imgs/logo/EF Logo-05.png"
                alt="Executive Fleet"
                width={200}
                height={60}
                className="admin-company-logo"
                priority
              />
            </Link>
            <div className="admin-label">ADMIN PANEL</div>
          </div>

          {/* User Info */}
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || 'Admin'}
                  width={40}
                  height={40}
                  className="admin-avatar-img"
                />
              ) : (
                <span className="admin-avatar-text">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </span>
              )}
            </div>
            <div className="admin-user-details">
              <div className="admin-user-name">
                {user?.name || 'Admin User'}
              </div>
              <div className="admin-user-email">
                {user?.email}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="admin-sidebar-nav">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`admin-nav-item ${pathname === item.path ? "admin-nav-item-active" : ""}`}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                <span className="admin-nav-text">{item.title}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="admin-sidebar-footer">
            <button onClick={handleLogout} className="admin-nav-item admin-logout-btn">
              <span className="admin-nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </span>
              <span className="admin-nav-text">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="admin-main-content">
          <div className="admin-content-wrapper">{children}</div>
        </main>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        .admin-dashboard-container {
          display: flex;
          min-height: 100vh;
          background: #f5f6fa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
          margin: 0;
          padding: 0;
          position: relative;
        }

        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1100;
          width: 48px;
          height: 48px;
          background:rgb(0, 0, 0);
          border: none;
          border-radius: 8px;
          color: #ffffff;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-btn:hover {
          background: #081b4d;
          transform: scale(1.05);
        }

        .mobile-menu-btn:active {
          transform: scale(0.95);
        }

        .mobile-menu-btn.hide-menu-btn {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .mobile-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .mobile-close-btn {
          display: none;
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 8px;
          color: #ffffff;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .mobile-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .mobile-close-btn:active {
          transform: scale(0.9);
        }

        .admin-sidebar {
          position: fixed;
          left: 0;
          top: 0;
          width: 280px;
          height: 100vh;
          background:rgb(0, 0, 0);
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          z-index: 1000;
        }

        .admin-sidebar::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }

        .admin-sidebar::-webkit-scrollbar-thumb {
          background: transparent;
        }

        .admin-sidebar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .admin-sidebar-logo {
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .admin-logo-link {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border-radius: 8px;
          padding: 12px 16px;
          width: 100%;
          max-width: 220px;
          transition: all 0.3s ease;
        }

        .admin-logo-link:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }

        .admin-company-logo {
          width: 100%;
          height: auto;
          max-height: 50px;
          object-fit: contain;
        }

        .admin-label {
          text-align: center;
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.2px;
        }

        .admin-user-info {
          padding: 20px 20px 24px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .admin-user-avatar {
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
          overflow: hidden;
          position: relative;
        }

        .admin-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .admin-avatar-text {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          flex-shrink: 0;
        }

        .admin-user-details {
          flex: 1;
          min-width: 0;
        }

        .admin-user-name {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .admin-user-email {
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .admin-sidebar-nav {
          padding: 20px 16px;
          flex: 1;
        }

        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          margin-bottom: 4px;
          color: #ffffff;
          text-decoration: none;
          transition: all 0.2s ease;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
        }

        .admin-nav-item:hover {
          border: 1px solid rgb(167, 149, 57);
          color: rgb(255, 255, 255);
        }

        .admin-nav-item-active {
          background: linear-gradient(90deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          color: #000000 !important;
          font-weight: 600 !important;
        }

        .admin-nav-item-active .admin-nav-icon svg {
          stroke: #000000 !important;
        }

        .admin-logout-btn {
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
        }

        .admin-logout-btn:hover {
          background: rgba(239, 68, 68, 0.1) !important;
          color: #ef4444 !important;
          border-color: #ef4444 !important;
        }

        .admin-nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 24px;
          height: 24px;
        }

        .admin-nav-icon svg {
          stroke: #ffffff;
        }

        .admin-nav-text {
          flex: 1;
          line-height: 1.4;
        }

        .admin-sidebar-footer {
          padding: 20px 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .admin-main-content {
          flex: 1;
          margin-left: 280px;
          min-height: 100vh;
        }

        .admin-content-wrapper {
          padding: 40px;
        }

        @media (max-width: 1024px) {
          .mobile-menu-btn {
            display: flex;
          }

          .mobile-close-btn {
            display: flex;
          }

          .mobile-overlay {
            display: block;
          }

          .admin-sidebar {
            position: fixed;
            left: -280px;
            width: 280px;
            z-index: 1000;
            transition: left 0.3s ease;
          }

          .admin-sidebar.sidebar-open {
            left: 0;
          }

          .admin-main-content {
            margin-left: 0;
            width: 100%;
          }

          .admin-content-wrapper {
            padding: 90px 30px 30px 30px;
          }
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            width: 280px;
            left: -280px;
          }

          .admin-sidebar.sidebar-open {
            left: 0;
          }

          .admin-content-wrapper {
            padding: 80px 20px 20px 20px;
          }

          .admin-sidebar-logo {
            padding: 60px 16px 20px 16px;
          }

          .admin-logo-link {
            max-width: 200px;
            padding: 10px 14px;
          }

          .admin-company-logo {
            max-height: 45px;
          }

          .admin-user-info {
            padding: 16px;
          }

          .admin-sidebar-nav {
            padding: 16px 12px;
          }

          .admin-nav-item {
            font-size: 14px;
            padding: 10px 14px;
          }

          .mobile-menu-btn {
            top: 16px;
            left: 16px;
            width: 44px;
            height: 44px;
          }
        }

        @media (max-width: 480px) {
          .admin-sidebar {
            width: 260px;
            left: -260px;
          }

          .admin-content-wrapper {
            padding: 75px 16px 16px 16px;
          }

          .admin-logo-link {
            max-width: 180px;
            padding: 8px 12px;
          }

          .admin-company-logo {
            max-height: 40px;
          }

          .admin-label {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
}
