import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/profile', '/orders', '/cart', '/wishlist', '/checkout'];
const adminRoutes = ['/admin'];
const authRoutes = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for auth token in cookies or local storage isn't available in middleware
  // We'll handle client-side redirects instead
  // This middleware primarily handles admin route protection

  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    // Admin routes need additional client-side protection
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
