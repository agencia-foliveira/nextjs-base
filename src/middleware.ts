import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { AUTH_ROUTES, canAccessRoute, isPrivateRoute } from './lib/routes';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, secret });

  // Redirect root to sign-in page
  // if (pathname === '/') {
  //   return NextResponse.redirect(new URL(AUTH_ROUTES['sign-in'].path, request.url));
  // }

  if (token) {
    const { user } = token;

    if (!canAccessRoute(user.role, pathname)) {
      return NextResponse.redirect(new URL('/forbidden', request.url));
    }
  }

  if (!token && isPrivateRoute(pathname)) {
    return NextResponse.redirect(new URL(AUTH_ROUTES['sign-in'].path, request.url));
  }

  return NextResponse.next();
}
