import { NextRequest, NextResponse } from 'next/server';
import { publicRoutes, privateRoutes } from '@/utils/paths';

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some(route => {
    const cleanRoute = route.replace(/^\/api/, '').replace(/\/page\.tsx$/, '');
    return pathname === cleanRoute || pathname.startsWith(cleanRoute + '/');
  });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

// Skip static files only, allow API proxy via rewrites
  // if (pathname.startsWith('/_next/') || pathname.match(/\.(png|jpg|svg|ico)$/)) {
  //   return NextResponse.next();
  // }
  // if (pathname.startsWith('/chats/')) {
  //   const apiPath = pathname.replace('/chats', '/api/private/chats');
  //   return NextResponse.rewrite(new URL(apiPath, request.url));
  // }

  // const token = request.cookies.get('token')?.value || null;
  // const isAuthenticated = !!token;

  // const isPublicRoute = matchesRoute(pathname, publicRoutes);
  // const isPrivateRoute = matchesRoute(pathname, privateRoutes);

  // // All invalid access (unknown, authed-public, unauth-private) → rewrite to 404 page
  // if (!isPublicRoute && !isPrivateRoute) {
  //   return NextResponse.rewrite(new URL('/not-found', request.url));
  // }

  // if (isAuthenticated && isPublicRoute) {
  //   return NextResponse.rewrite(new URL('/not-found', request.url));
  // }

  // if (!isAuthenticated && isPrivateRoute) {
  //   return NextResponse.rewrite(new URL('/not-found', request.url));
  // }

  // Valid paths
  return NextResponse.next();
}

