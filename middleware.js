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
  const { pathname, search } = request.nextUrl;

  // Redirect old booking-vehicle URL to new get-quote URL (preserve query params)
  if (pathname === '/booking-vehicle' || pathname.startsWith('/booking-vehicle/')) {
    const url = request.nextUrl.clone();
    url.pathname = '/get-quote';
    // search already includes the ? prefix if there are params
    return NextResponse.redirect(url, 301);
  }

  console.log(`🛡️ Protecting route: ${pathname}`);

  // Allow access to login page for everyone
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // For admin routes, check if user is authenticated
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      console.log(`❌ No token found for ${pathname}`);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const decoded = decodeJWT(token);

      console.log(`👤 User: ${decoded.email}`);
      console.log(`🎭 Role: ${decoded.role || (decoded.isAdmin ? 'admin' : 'editor')}`);

      const userRole = decoded.role || (decoded.isAdmin ? 'admin' : 'editor');

      // Define role-based access rules
      const adminOnlyRoutes = [
        '/admin/bookings',
        '/admin/users',
        '/admin/settings',
        '/admin/contacts', // Contact inquiries - admin only
        '/api/admin/bookings',
        '/api/admin/users',
      ];

      // Check if route is admin-only
      const isAdminOnlyRoute = adminOnlyRoutes.some(route => pathname.startsWith(route));

      if (isAdminOnlyRoute && userRole !== 'admin') {
        console.log(`❌ User ${decoded.email} (${userRole}) attempted to access admin-only route`);
        return NextResponse.redirect(new URL('/admin/no-access', request.url));
      }

      // Allow access
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
    '/api/admin/:path*',
    // Redirect old booking URL to new quote URL
    '/booking-vehicle/:path*'
  ],
};
