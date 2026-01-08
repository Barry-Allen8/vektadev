"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCookieConsent } from "@/lib/useCookieConsent";
import { Cookie, Shield, X } from "lucide-react";
import { type Locale } from "@/i18n";

/**
 * GDPR-compliant cookie consent banner.
 * - Shows on first visit only (until user makes a choice)
 * - Stores choice in localStorage (key: "cookie_consent")
 * - Provides Accept All and Reject Non-Essential options
 * - Links to Privacy Policy page
 * - Accessible (ARIA, keyboard navigation)
 * - Responsive (mobile + desktop)
 * - Fixed at bottom, doesn't block scrolling
 */
export default function CookieBanner() {
  const t = useTranslations("cookies");
  const locale = useLocale() as Locale;
  const { hasConsent, isLoading, acceptAll, rejectNonEssential } = useCookieConsent();

  // Don't render during SSR or loading, or if consent already given
  if (isLoading || hasConsent) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
    >
      <div className="container max-w-5xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-3 md:px-6 md:py-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h2
                id="cookie-banner-title"
                className="font-semibold text-slate-900 dark:text-white text-lg"
              >
                {t("title")}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            <p
              id="cookie-banner-description"
              className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-4"
            >
              {t("description")}
            </p>

            {/* Essential cookies info */}
            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg mb-5">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t("essential_info")}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              {/* Privacy Policy Link */}
              <Link
                href="/privacy"
                locale={locale}
                className="text-sm text-primary hover:text-primary/80 underline underline-offset-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                {t("privacy_link")}
              </Link>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={rejectNonEssential}
                  className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  {t("reject")}
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {t("accept")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
