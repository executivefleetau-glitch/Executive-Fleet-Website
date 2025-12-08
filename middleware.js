import { NextResponse } from "next/server";

// Simple JWT decode for Edge Runtime (verification only)
function decodeJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token structure');
    }
    
    const payload = parts[1];
    // Handle base64url decoding
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/').padEnd(payload.length + (4 - payload.length % 4) % 4, '='))
    );
    
    // Check if token is expired
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      throw new Error('Token expired');
    }
    
    return decoded;
  } catch (error) {
    throw new Error(`Invalid token: ${error.message}`);
  }
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  console.log(`🛡️ Protecting route: ${pathname}`);

  // Allow access to login page for everyone
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // For admin routes, check if user is authenticated and is admin
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      console.log(`❌ No token found for ${pathname}`);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const decoded = decodeJWT(token);
      
      console.log(`👤 User: ${decoded.email}`);
      console.log(`🔐 Admin: ${decoded.isAdmin}`);

      if (!decoded.isAdmin) {
        console.log(`❌ User ${decoded.email} is not admin`);
        return NextResponse.redirect(new URL('/admin/no-access', request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.log(`❌ Invalid token for ${pathname}:`, error.message);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Allow access to all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    // Optionally protect API routes
    '/api/admin/:path*'
  ],
};
