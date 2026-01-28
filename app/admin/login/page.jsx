"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

export default function AdminLoginPage() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { user, loading, forceSessionCheck } = useAuth();

  useEffect(() => {
    if (!loading && user?.isAdmin) {
      router.push("/admin/dashboard");
    }
  }, [user, loading, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    setError("");
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (forceSessionCheck) await forceSessionCheck();
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsSigningIn(false);
    }
  };

  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(145deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: '20px',
  };

  const wrapperStyle = {
    width: '100%',
    maxWidth: '400px',
  };

  const logoStyle = {
    textAlign: 'center',
    marginBottom: '32px',
  };

  const logoImgStyle = {
    height: '55px',
    width: 'auto',
    filter: 'brightness(0) invert(1)',
    opacity: 0.95,
  };

  const cardStyle = {
    background: 'rgba(18, 18, 18, 0.95)',
    border: '1px solid rgba(206, 155, 40, 0.25)',
    borderRadius: '16px',
    padding: '40px 36px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
  };

  const titleStyle = {
    fontSize: '26px',
    fontWeight: 600,
    color: '#ffffff',
    margin: '0 0 8px 0',
    textAlign: 'center',
  };

  const subtitleStyle = {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: '0 0 32px 0',
    textAlign: 'center',
  };

  const errorStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 16px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '10px',
    marginBottom: '24px',
    color: '#f87171',
    fontSize: '13px',
  };

  const formGroupStyle = {
    marginBottom: '24px',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '10px',
    letterSpacing: '0.3px',
    position: 'static',
    transform: 'none',
    background: 'transparent',
    padding: 0,
  };

  const inputStyle = {
    width: '100%',
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '10px',
    fontSize: '15px',
    color: '#ffffff',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const passwordContainerStyle = {
    position: 'relative',
  };

  const passwordInputStyle = {
    ...inputStyle,
    paddingRight: '50px',
  };

  const toggleBtnStyle = {
    position: 'absolute',
    right: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    padding: '6px',
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const submitBtnStyle = {
    width: '100%',
    padding: '16px 24px',
    marginTop: '8px',
    background: 'linear-gradient(135deg, #ce9b28 0%, #E8B429 100%)',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#000000',
    cursor: isSigningIn ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    opacity: isSigningIn ? 0.7 : 1,
  };

  const footerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginTop: '28px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.4)',
    lineHeight: 1.5,
  };

  const spinnerStyle = {
    width: '18px',
    height: '18px',
    border: '2px solid rgba(0, 0, 0, 0.2)',
    borderTopColor: '#000000',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
  };

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={wrapperStyle}>
          <div style={cardStyle}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(206, 155, 40, 0.2)',
                borderTopColor: '#ce9b28',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto 16px',
              }}></div>
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px', margin: 0 }}>Loading...</p>
            </div>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={wrapperStyle}>
        <div style={logoStyle}>
          <img 
            src="/assets/imgs/logo/EF Logo-05.png" 
            alt="Executive Fleet" 
            style={logoImgStyle}
          />
        </div>

        <div style={cardStyle}>
          <h1 style={titleStyle}>Admin Login</h1>
          <p style={subtitleStyle}>Sign in to access the dashboard</p>

          {error && (
            <div style={errorStyle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                autoComplete="email"
                style={inputStyle}
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Password</label>
              <div style={passwordContainerStyle}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  style={passwordInputStyle}
                />
                <button
                  type="button"
                  style={toggleBtnStyle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" style={submitBtnStyle} disabled={isSigningIn}>
              {isSigningIn ? (
                <>
                  <span style={spinnerStyle}></span>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </>
              )}
            </button>
          </form>

          <div style={footerStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(206, 155, 40, 0.5)" strokeWidth="2" style={{ flexShrink: 0, marginTop: '1px' }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>Only authorized admins can access this dashboard.</span>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
