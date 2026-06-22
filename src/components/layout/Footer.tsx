"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { LayoutGrid } from "lucide-react";
import { type Locale } from "@/i18n";
import { useCookieConsent } from "@/lib/useCookieConsent";
import { serviceItems } from "@/data/serviceCatalog";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");
  const tServices = useTranslations("services_menu");
  const locale = useLocale() as Locale;
  const currentYear = new Date().getFullYear();
  const { resetConsent } = useCookieConsent();

  return (
    <footer className="border-t border-slate-700/45 bg-[#030b1f]/85 py-14">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" locale={locale} className="mb-5 inline-flex items-center gap-2 text-slate-100">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-primary/30 bg-primary/15">
                <LayoutGrid className="h-4 w-4 text-primary" />
              </div>
              <span className="futuristic-font text-base font-bold tracking-tight">
                VEKTA<span className="text-primary">DEV</span>
              </span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">{t("description")}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-200">{t("services_title")}</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {serviceItems.map((service) => (
                <li key={service.key}>
                  <Link href={service.href} locale={locale} className="cyber-link">
                    {tServices(service.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-200">{t("company_title")}</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link href="/about" locale={locale} className="cyber-link">{tNav("about")}</Link></li>
              <li><Link href="/#pricing" locale={locale} className="cyber-link">{tNav("pricing")}</Link></li>
              <li><Link href="/contact" locale={locale} className="cyber-link">{tNav("contact")}</Link></li>
              <li><a href="mailto:vektadev@gmail.com" className="cyber-link">vektadev@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-700/45 pt-6 md:flex-row">
          <p className="text-xs text-slate-500">
            © {currentYear} VektaDev. {t("rights")}
          </p>
          <div className="flex flex-wrap gap-7 text-xs text-slate-500">
            <Link href="/privacy" locale={locale} className="cyber-link">{t("privacy")}</Link>
            <Link href="/terms" locale={locale} className="cyber-link">{t("terms")}</Link>
            <button
              onClick={resetConsent}
              type="button"
              className="cyber-link text-left hover:text-slate-300 transition-colors"
            >
              {t("cookie_settings")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
