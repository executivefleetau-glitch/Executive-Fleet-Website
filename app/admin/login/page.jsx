"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { user, loading, forceSessionCheck } = useAuth();

  useEffect(() => {
    // If user is already authenticated and admin, redirect to dashboard
    if (!loading && user?.isAdmin) {
      console.log("🔄 User already authenticated, redirecting to dashboard");
      router.push("/admin/dashboard");
      return;
    }
    
    // Only check existing session if not already in loading state
    if (!loading) {
    checkExistingSession();
    }
  }, [user, loading]);

  const checkExistingSession = async () => {
    try {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      if (data.user?.isAdmin) {
      router.push("/admin/dashboard");
    }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    setError("");
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Login successful, updating auth state and redirecting...");
        
        // Force auth provider to check session immediately
        if (forceSessionCheck) {
          await forceSessionCheck();
        }
        
        // Small delay to ensure auth state is updated
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 100);
        } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  if (isLoading) {
    return (
      <div className="admin-login-page">
        <section className="section mt-120 mb-100">
          <div className="container-sub">
            <div className="box-login">
              <div className="text-center">
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p className="mt-3 color-text">Loading...</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style jsx>{`
          .admin-login-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          }
          
          .loading-spinner {
            padding: 60px 0;
          }
          
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(206, 155, 40, 0.2);
            border-top-color: #ce9b28;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-content">
          {/* Logo */}
          <div className="logo-container">
            <img 
              src="/assets/imgs/logo/EF Logo-01.png" 
                alt="Executive Fleet" 
              className="logo-image"
              />
            </div>

          {/* Welcome Text */}
          <div className="welcome-section">
            <h1 className="login-title">Admin Login</h1>
            <p className="login-subtitle">Sign in with your credentials to access the admin dashboard.</p>
          </div>

          {/* Login Card */}
          <div className="login-card">
              {error && (
              <div className="error-alert">
                <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>{error}</span>
                </div>
              )}

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-input password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
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

                <button
                type="submit"
                className={`login-button ${isSigningIn ? 'loading' : ''}`}
                  disabled={isSigningIn}
                >
                  {isSigningIn ? (
                    <>
                    <div className="button-spinner"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                    <span>Sign In</span>
                    <svg className="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </>
                  )}
                </button>
            </form>

            {/* Security Notice */}
            <div className="security-notice">
              <svg className="notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
              <p>Only authorized admins can access this dashboard. If you don't have credentials, please contact the system administrator.</p>
              </div>
            </div>
          </div>
        </div>

      <style jsx>{`
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: 
            radial-gradient(ellipse 800px 600px at top left, rgba(206, 155, 40, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse 700px 500px at top right, rgba(232, 180, 41, 0.18) 0%, transparent 50%),
            radial-gradient(ellipse 600px 400px at bottom left, rgba(255, 251, 233, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 800px 600px at bottom right, rgba(206, 155, 40, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #000000 0%, #0d0d0d 25%, #1a1a1a 50%, #0d0d0d 75%, #000000 100%);
          position: relative;
          overflow: hidden;
          font-family: var(--dm-saans-font, 'DM Sans', sans-serif);
        }

        .admin-login-page::before {
          content: '';
          position: absolute;
          top: -30%;
          right: -30%;
          width: 80%;
          height: 80%;
          background: radial-gradient(circle, rgba(206, 155, 40, 0.25) 0%, rgba(232, 180, 41, 0.15) 30%, transparent 65%);
          animation: pulse 12s ease-in-out infinite;
          filter: blur(80px);
        }

        /* Add subtle shimmer effect on the page */
        .admin-login-page::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -30%;
          width: 80%;
          height: 80%;
          background: radial-gradient(circle, rgba(232, 180, 41, 0.2) 0%, rgba(255, 251, 233, 0.12) 30%, transparent 65%);
          animation: pulse 18s ease-in-out infinite reverse;
          filter: blur(90px);
          z-index: 0;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1) translate(0, 0);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1) translate(-10%, 10%);
            opacity: 0.8;
          }
        }

        .login-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
          padding: 20px;
        }

        .login-container::before {
          content: '';
          position: absolute;
          top: -120px;
          left: -120px;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(206, 155, 40, 0.2) 0%, rgba(232, 180, 41, 0.12) 40%, transparent 70%);
          border-radius: 50%;
          filter: blur(70px);
          z-index: -1;
          animation: float 20s ease-in-out infinite;
        }

        .login-container::after {
          content: '';
          position: absolute;
          bottom: -120px;
          right: -120px;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(232, 180, 41, 0.18) 0%, rgba(255, 251, 233, 0.1) 40%, transparent 70%);
          border-radius: 50%;
          filter: blur(70px);
          z-index: -1;
          animation: float 25s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .login-content {
          position: relative;
        }

        .logo-container {
          text-align: center;
          margin-bottom: 40px;
          
        }

        .logo-image {
          height: 70px;
          width: auto;
          filter: brightness(0) invert(1) drop-shadow(0 6px 20px rgba(206, 155, 40, 0.5)) drop-shadow(0 0 30px rgba(232, 180, 41, 0.3));
          animation: fadeInDown 0.6s ease-out, logoGlow 3s ease-in-out infinite;
        }

        @keyframes logoGlow {
          0%, 100% {
            filter: brightness(0) invert(1) drop-shadow(0 6px 20px rgba(206, 155, 40, 0.5)) drop-shadow(0 0 30px rgba(232, 180, 41, 0.3));
          }
          50% {
            filter: brightness(0) invert(1) drop-shadow(0 8px 25px rgba(206, 155, 40, 0.7)) drop-shadow(0 0 40px rgba(232, 180, 41, 0.5));
          }
        }

        .welcome-section {
          text-align: center;
          margin-bottom: 40px;
          animation: fadeIn 0.8s ease-out 0.2s both;
        }

        .login-title {
          font-size: 36px;
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff 0%, #fffbe9 40%, rgba(232, 180, 41, 1) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 12px 0;
          letter-spacing: -0.5px;
          filter: drop-shadow(0 4px 20px rgba(206, 155, 40, 0.4));
        }

        .login-subtitle {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          line-height: 1.6;
        }

        .login-card {
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(30px);
          border: 2px solid rgba(206, 155, 40, 0.4);
          border-radius: 24px;
          padding: 48px;
          box-shadow: 
            0 25px 70px rgba(0, 0, 0, 0.7),
            0 0 150px rgba(206, 155, 40, 0.25),
            0 0 80px rgba(232, 180, 41, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            inset 0 -1px 0 rgba(206, 155, 40, 0.1);
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.8s ease-out 0.4s both, cardGlow 4s ease-in-out infinite;
        }

        @keyframes cardGlow {
          0%, 100% {
            box-shadow: 
              0 25px 70px rgba(0, 0, 0, 0.7),
              0 0 150px rgba(206, 155, 40, 0.25),
              0 0 80px rgba(232, 180, 41, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.08);
          }
          50% {
            box-shadow: 
              0 25px 70px rgba(0, 0, 0, 0.7),
              0 0 180px rgba(206, 155, 40, 0.35),
              0 0 100px rgba(232, 180, 41, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }
        }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, 
            transparent 0%,
            rgba(206, 155, 40, 0.8) 20%,
            rgba(255, 251, 233, 0.9) 40%,
            rgba(232, 180, 41, 1) 50%,
            rgba(255, 251, 233, 0.9) 60%,
            rgba(206, 155, 40, 0.8) 80%,
            transparent 100%);
          box-shadow: 0 2px 30px rgba(206, 155, 40, 0.6), 0 0 40px rgba(232, 180, 41, 0.4);
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
          0% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.8;
          }
        }

        .login-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%,
            rgba(206, 155, 40, 0.5) 30%,
            rgba(232, 180, 41, 0.6) 50%,
            rgba(206, 155, 40, 0.5) 70%,
            transparent 100%);
          box-shadow: 0 -2px 20px rgba(206, 155, 40, 0.3);
        }

        .error-alert {
          background: rgba(239, 68, 68, 0.12);
          border: 2px solid rgba(239, 68, 68, 0.4);
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 14px;
          color: #ff8585;
          font-size: 14px;
          font-weight: 500;
          animation: shake 0.5s ease;
          box-shadow: 0 4px 20px rgba(239, 68, 68, 0.2);
        }

        .error-icon {
          width: 22px;
          height: 22px;
          flex-shrink: 0;
          color: #ff8585;
          filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.4));
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .login-form {
          width: 100%;
        }

        .form-group {
          margin-bottom: 28px;
          width: 100%;
          padding-left: 12px;
          position: relative;
        }

        .form-label {
          display: block;
          margin-bottom: 12px;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.5px;
          text-transform: none;
          position: relative;
          z-index: 2;
          text-shadow: 0 0 10px rgba(206, 155, 40, 0.2);
        }

        .form-label::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 14px;
          background: linear-gradient(180deg, #ce9b28 0%, #E8B429 100%);
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(206, 155, 40, 0.5);
        }

        .input-wrapper {
          position: relative;
          width: 100%;
          display: block;
        }

        .input-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: rgba(206, 155, 40, 0.7);
          pointer-events: none;
          transition: all 0.3s ease;
          z-index: 1;
          filter: drop-shadow(0 0 4px rgba(206, 155, 40, 0.3));
        }

        .form-input {
          width: 100%;
          padding: 16px 18px 16px 52px;
          background: rgba(255, 255, 255, 0.06);
          border: 2px solid rgba(206, 155, 40, 0.2);
          border-radius: 12px;
          font-size: 15px;
          color: #ffffff;
          transition: all 0.3s ease;
          font-family: inherit;
          display: block;
          box-sizing: border-box;
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        .form-input:hover {
          border-color: rgba(206, 155, 40, 0.35);
          background: rgba(255, 255, 255, 0.08);
        }

        .form-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(206, 155, 40, 0.7);
          box-shadow: 
            0 0 0 4px rgba(206, 155, 40, 0.15),
            0 4px 20px rgba(206, 155, 40, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .input-wrapper:hover .input-icon,
        .form-input:focus ~ .input-icon {
          color: rgba(206, 155, 40, 1);
        }

        .password-wrapper {
          position: relative;
        }

        .password-input {
          padding-right: 52px;
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(206, 155, 40, 0.1);
          border: 1px solid rgba(206, 155, 40, 0.3);
          cursor: pointer;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(206, 155, 40, 0.8);
          transition: all 0.3s ease;
          z-index: 2;
          border-radius: 8px;
        }

        .password-toggle:hover {
          color: rgba(232, 180, 41, 1);
          background: rgba(206, 155, 40, 0.2);
          border-color: rgba(206, 155, 40, 0.6);
          box-shadow: 0 0 15px rgba(206, 155, 40, 0.3);
        }

        .password-toggle:active {
          transform: translateY(-50%) scale(0.95);
        }

        .password-toggle svg {
          width: 20px;
          height: 20px;
          display: block;
          filter: drop-shadow(0 0 3px rgba(206, 155, 40, 0.4));
        }

        .login-button {
          width: 100%;
          padding: 18px 32px;
          background: linear-gradient(135deg, #ce9b28 0%, #fffbe9 50%, #E8B429 100%);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          color: #000000;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 32px;
          position: relative;
          overflow: hidden;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 15px rgba(206, 155, 40, 0.3);
        }

        .login-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          transition: left 0.4s ease;
        }

        .login-button:hover::before {
          left: 0;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(206, 155, 40, 0.5), 0 0 40px rgba(232, 180, 41, 0.3);
        }

        .login-button:hover span,
        .login-button:hover .button-arrow {
          color: #ce9b28;
        }

        .login-button span,
        .button-arrow,
        .button-spinner {
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .button-arrow {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .login-button:hover .button-arrow {
          transform: translateX(4px);
        }

        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }

        .login-button.loading {
          background: linear-gradient(135deg, rgba(206, 155, 40, 0.7) 0%, rgba(255, 251, 233, 0.7) 50%, rgba(232, 180, 41, 0.7) 100%);
        }

        .button-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-top-color: #000000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .security-notice {
          margin-top: 36px;
          padding-top: 32px;
          border-top: 1px solid rgba(206, 155, 40, 0.2);
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: rgba(206, 155, 40, 0.03);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(206, 155, 40, 0.15);
        }

        .notice-icon {
          width: 24px;
          height: 24px;
          color: rgba(206, 155, 40, 0.9);
          flex-shrink: 0;
          margin-top: 2px;
          filter: drop-shadow(0 0 8px rgba(206, 155, 40, 0.4));
        }

        .security-notice p {
          margin: 0;
          color: rgba(255, 255, 255, 0.65);
          font-size: 13px;
          line-height: 1.7;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .login-container {
            max-width: 100%;
            padding: 16px;
          }

          .login-card {
            padding: 32px 24px;
            border-radius: 20px;
          }

          .login-title {
            font-size: 28px;
          }

          .logo-image {
            height: 50px;
          }

          .form-group {
            margin-bottom: 24px;
          }

          .form-label {
            margin-bottom: 10px;
            font-size: 13px;
          }

          .form-input {
            padding: 15px 18px 15px 48px;
            font-size: 14px;
          }

          .input-icon {
            left: 16px;
            width: 18px;
            height: 18px;
          }

          .password-input {
            padding-right: 48px;
          }

          .password-toggle {
            right: 14px;
          }

          .password-toggle svg {
            width: 18px;
            height: 18px;
          }

          .login-button {
            padding: 16px 28px;
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 28px 20px;
          }

          .welcome-section {
            margin-bottom: 32px;
          }

          .login-title {
            font-size: 24px;
          }

          .login-subtitle {
            font-size: 14px;
          }

          .form-group {
            margin-bottom: 22px;
          }

          .form-label {
            margin-bottom: 8px;
          }

          .password-toggle {
            right: 12px;
          }

          .password-toggle svg {
            width: 17px;
            height: 17px;
          }
        }
      `}</style>
    </div>
  );
}
