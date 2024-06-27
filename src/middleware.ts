
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    let loggedin = request.cookies.get('token');
    const { pathname } = request.nextUrl;
    if (loggedin && pathname === '/login') {
        return NextResponse.redirect(new URL('/deals', request.url));
      }

    if (!loggedin && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
      }
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)',
  };