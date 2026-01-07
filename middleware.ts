import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "fr", "es"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if various static files are being requested
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/api")
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
