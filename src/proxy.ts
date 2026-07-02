import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./i18n";
import { localePrefix } from "./i18n/navigation";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: false,
});

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle redirects for removed /courses routes
  // Check for courses path in any locale
  const coursesPattern = /^\/(?:(pl|en|uk)\/)?courses(\/.*)?$/;
  const coursesMatch = pathname.match(coursesPattern);
  
  if (coursesMatch) {
    const locale = coursesMatch[1] || defaultLocale;
    const redirectUrl = new URL(`/${locale}/services/b2b-websites`, request.url);
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Redirect legacy service pages to the new primary service page
  const removedServicesPattern =
    /^\/(?:(pl|en|uk)\/)?services\/(websites|chatbots|mobile-apps|ai-solutions|cloud|consulting)(\/.*)?$/;
  const removedServicesMatch = pathname.match(removedServicesPattern);

  if (removedServicesMatch) {
    const locale = removedServicesMatch[1] || defaultLocale;
    const serviceSlug = removedServicesMatch[2];
    const target =
      serviceSlug === "chatbots" || serviceSlug === "ai-solutions"
        ? "ai-assistants"
        : serviceSlug === "mobile-apps" || serviceSlug === "cloud"
          ? "web-apps"
          : serviceSlug === "consulting"
            ? "business-automation"
            : "b2b-websites";
    const redirectUrl = new URL(`/${locale}/services/${target}`, request.url);
    return NextResponse.redirect(redirectUrl, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|icon|apple-icon|favicon\\.ico|icon-192\\.png|icon-512\\.png|.*\\..*).*)"],
};
