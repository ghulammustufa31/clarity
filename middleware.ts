import { auth } from '@/src/lib/auth/auth';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify-email',
  '/auth/error',
];

// Define auth routes (redirect to dashboard if already authenticated)
const authRoutes = [
  '/auth/login',
  '/auth/signup',
];

// Define routes that require email verification
const protectedRoutes = [
  '/dashboard',
  '/accounts',
  '/transactions',
  '/budgets',
  '/insights',
];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isEmailVerified = req.auth?.user?.emailVerified ?? false;

  const isPublicRoute = publicRoutes.some(route =>
    nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.some(route => nextUrl.pathname === route);
  const isProtectedRoute = protectedRoutes.some(route =>
    nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
  );
  const isApiRoute = nextUrl.pathname.startsWith('/api');

  // Allow API routes to handle their own auth
  if (isApiRoute) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isLoggedIn && isEmailVerified) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  // Redirect logged-in users without verified email to verification page
  if (isProtectedRoute && isLoggedIn && !isEmailVerified) {
    if (nextUrl.pathname !== '/auth/verify-email') {
      return NextResponse.redirect(new URL('/auth/verify-email', nextUrl));
    }
  }

  return NextResponse.next();
});

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
