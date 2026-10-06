import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Handle subdomain routing for Akash & Selina (cristianweb theme)
  if (hostname === 'akash-selina.eweddingz.online') {
    // If accessing the root, rewrite to the index.html of cristianweb
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/cristianweb/index.html', request.url));
    }
    
    // For all other assets, rewrite to the cristianweb folder 
    // EXCEPT if it already starts with /cristianweb
    if (!url.pathname.startsWith('/cristianweb')) {
      return NextResponse.rewrite(new URL(`/cristianweb${url.pathname}`, request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
