import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define public routes
const publicRoutes = ['/', '/auth/signin', '/about','/contact','/services','/our-projects','/announcement'];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const { pathname } = req.nextUrl;

  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  // If authenticated and on a public route, redirect to dashboard
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If not authenticated and trying to access protected route, redirect to signin
  if (!isAuthenticated && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply to all routes except static files, api routes, etc.
  matcher: ['/((?!_next|api|favicon.ico).*)'], 
};
