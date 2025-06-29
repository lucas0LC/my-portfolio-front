import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { lang } from '@/app/idioma-config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { defaultLocale, locales } = lang;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    if (pathname.startsWith(`/${defaultLocale}`)) {
      const newPath = pathname.replace(`/${defaultLocale}`, '') || '/';
      return NextResponse.redirect(new URL(newPath, request.url));
    }
    return NextResponse.next();
  }
  
  return NextResponse.rewrite(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
};