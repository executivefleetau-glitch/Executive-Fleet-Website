"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validation
    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters long' });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      setMessage({ type: 'error', text: 'New password must be different from current password' });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to change password' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            color: #999;
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
        `}</style>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="profile-page">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Profile Settings</h1>
          <p className="page-subtitle">Manage your account settings and security</p>
        </div>

        <div className="profile-container">
          {/* User Info Card */}
          <div className="info-card">
            <div className="card-header">
              <div className="avatar-section">
                <div className="avatar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="user-details">
                  <h2 className="user-name">{user?.name || 'Admin User'}</h2>
                  <p className="user-email">{user?.email}</p>
                  <span className="admin-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    Administrator
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Password Change Card */}
          <div className="password-card">
            <div className="card-header-section">
              <div className="header-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h3 className="section-title">Change Password</h3>
                <p className="section-description">Update your password to keep your account secure</p>
              </div>
            </div>

            {message.text && (
              <div className={`message ${message.type}`}>
                <svg className="message-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {message.type === 'success' ? (
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"></path>
                  ) : (
                    <>
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </>
                  )}
                </svg>
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="password-form">
              {/* Current Password */}
              <div className="form-group">
                <label className="form-label">Current Password</label><br/><br/>
                <div className="input-wrapper">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    className="form-input"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    placeholder="Enter your current password"
                    required
                  />
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                  >
                    {showCurrentPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="form-group">
                <label className="form-label">New Password</label><br/><br/>
                <div className="input-wrapper">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="form-input"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="Enter your new password"
                    required
                    minLength={6}
                  />
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
                <p className="input-hint">Password must be at least 6 characters long</p>
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label className="form-label">Confirm New Password</label><br/><br/>
                <div className="input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-input"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Confirm your new password"
                    required
                  />
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`submit-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="button-spinner"></div>
                    <span>Changing Password...</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>Change Password</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-page {
          padding: 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 40px;
        }

        .page-title {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(90deg, #ce9b28 0%, #ce9b28 0%, #E8B429 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 8px 0;
        }

        .page-subtitle {
          font-size: 16px;
          color: #999;
          margin: 0;
        }

        .profile-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          max-width: 800px;
        }

        /* User Info Card */
        .info-card {
          background: linear-gradient(145deg, rgba(20, 20, 20, 0.8), rgba(10, 10, 10, 0.9));
          border: 1px solid rgba(206, 155, 40, 0.2);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .avatar-section {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 20px rgba(206, 155, 40, 0.3);
        }

        .avatar svg {
          width: 40px;
          height: 40px;
          color: #000;
        }

        .user-details {
          flex: 1;
        }

        .user-name {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 8px 0;
        }

        .user-email {
          font-size: 15px;
          color: #999;
          margin: 0 0 12px 0;
        }

        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(206, 155, 40, 0.15);
          border: 1px solid rgba(206, 155, 40, 0.3);
          border-radius: 6px;
          color: #ce9b28;
          font-size: 13px;
          font-weight: 600;
        }

        .admin-badge svg {
          width: 14px;
          height: 14px;
        }

        /* Password Card */
        .password-card {
          background: linear-gradient(145deg, rgba(20, 20, 20, 0.8), rgba(10, 10, 10, 0.9));
          border: 1px solid rgba(206, 155, 40, 0.2);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .card-header-section {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
        }

        .header-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(206, 155, 40, 0.15);
          border: 1px solid rgba(206, 155, 40, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .header-icon svg {
          width: 24px;
          height: 24px;
          color: #ce9b28;
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 6px 0;
        }

        .section-description {
          font-size: 14px;
          color: #999;
          margin: 0;
        }

        /* Messages */
        .message {
          padding: 14px 18px;
          border-radius: 10px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 500;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message.success {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
        }

        .message.error {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ff8585;
        }

        .message-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        /* Form */
        .password-form {
          width: 100%;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          margin-bottom: 10px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          font-size: 14px;
        }

        .input-wrapper {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 14px 18px 14px 48px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(206, 155, 40, 0.2);
          border-radius: 10px;
          font-size: 15px;
          color: #fff;
          transition: all 0.3s ease;
          font-family: inherit;
          box-sizing: border-box;
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .form-input:hover {
          border-color: rgba(206, 155, 40, 0.35);
          background: rgba(255, 255, 255, 0.07);
        }

        .form-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(206, 155, 40, 0.6);
          box-shadow: 0 0 0 3px rgba(206, 155, 40, 0.1);
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: rgba(206, 155, 40, 0.6);
          pointer-events: none;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(206, 155, 40, 0.1);
          border: 1px solid rgba(206, 155, 40, 0.2);
          cursor: pointer;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(206, 155, 40, 0.7);
          transition: all 0.3s ease;
          border-radius: 6px;
        }

        .password-toggle:hover {
          color: #ce9b28;
          background: rgba(206, 155, 40, 0.2);
          border-color: rgba(206, 155, 40, 0.4);
        }

        .password-toggle svg {
          width: 18px;
          height: 18px;
        }

        .input-hint {
          margin: 8px 0 0 0;
          font-size: 12px;
          color: #666;
        }

        /* Submit Button */
        .submit-button {
          width: 100%;
          padding: 16px 24px;
          background: linear-gradient(135deg, #ce9b28 0%, #E8B429 100%);
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          color: #000;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 32px;
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.3);
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(206, 155, 40, 0.4);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }

        .submit-button.loading {
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.7) 0%, rgba(232, 180, 41, 0.7) 100%);
        }

        .submit-button svg {
          width: 18px;
          height: 18px;
        }

        .button-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .profile-page {
            padding: 20px;
          }

          .page-title {
            font-size: 28px;
          }

          .info-card,
          .password-card {
            padding: 24px;
          }

          .avatar-section {
            flex-direction: column;
            text-align: center;
          }

          .user-details {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}

