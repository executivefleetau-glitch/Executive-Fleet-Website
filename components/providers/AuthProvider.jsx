"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isCheckingRef = useRef(false);
  const lastCheckRef = useRef(null);
  const providerIdRef = useRef(Math.random().toString(36).substr(2, 9));

  useEffect(() => {
    console.log(`🔐 AuthProvider mounted - ID: ${providerIdRef.current}`);
    
    // Only check session once on mount, with a small delay to prevent double calls
    // Bypass rate limiting for initial session check
    const timeoutId = setTimeout(() => {
      checkSession(true); // bypassRateLimit = true for initial load
    }, 100);

    return () => {
      console.log(`🗑️ AuthProvider unmounted - ID: ${providerIdRef.current}`);
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array - only run once on mount

  const checkSession = async (bypassRateLimit = false) => {
    // Prevent multiple simultaneous session checks
    if (isCheckingRef.current) {
      console.log(`⏭️ [${providerIdRef.current}] Session check already in progress, skipping`);
      return;
    }

    // Rate limiting - but allow bypass for initial load
    const now = Date.now();
    if (!bypassRateLimit && lastCheckRef.current && (now - lastCheckRef.current) < 2000) {
      console.log(`🚫 [${providerIdRef.current}] Session check rate limited (${Math.ceil((2000 - (now - lastCheckRef.current)) / 1000)}s remaining)`);
      return;
    }

    isCheckingRef.current = true;
    lastCheckRef.current = now;

    try {
      console.log(`🔍 [${providerIdRef.current}] Checking session... (bypass rate limit: ${bypassRateLimit})`);
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      setUser(data.user);
      console.log(`✅ [${providerIdRef.current}] Session check completed - User: ${data.user?.email || 'null'} - Admin: ${data.user?.isAdmin || false}`);
    } catch (error) {
      console.error(`❌ [${providerIdRef.current}] Error checking session:`, error);
      setUser(null); // Set user to null on error
    } finally {
      setLoading(false);
      isCheckingRef.current = false;
    }
  };

  // Debug user state changes
  useEffect(() => {
    console.log(`🔄 [${providerIdRef.current}] Auth state changed - Loading: ${loading}, User: ${user?.email || 'null'}, Admin: ${user?.isAdmin || 'null'}`);
  }, [user, loading]);

  const logout = async () => {
    try {
      console.log(`🚪 [${providerIdRef.current}] Logging out...`);
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      window.location.href = "/admin/login";
    } catch (error) {
      console.error(`❌ [${providerIdRef.current}] Error logging out:`, error);
    }
  };

  // Force refresh function for debugging
  const forceSessionCheck = async () => {
    console.log(`🔄 [${providerIdRef.current}] Force session check requested`);
    isCheckingRef.current = false; // Reset checking flag
    setLoading(true);
    await checkSession(true); // Bypass rate limiting for manual refresh
  };

  const value = {
    user,
    loading,
    logout,
    forceSessionCheck, // Expose only for debugging/manual refresh
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
