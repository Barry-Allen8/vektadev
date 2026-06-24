"use client";

import { useEffect, useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, LayoutGrid, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { useTranslations, useLocale } from "next-intl";
import { locales, type Locale } from "@/i18n";
import { serviceItems } from "@/data/serviceCatalog";

const localeLabels: Record<Locale, string> = {
  pl: "PL",
  en: "EN",
};

export default function Header() {
  const t = useTranslations("navigation");
  const tServices = useTranslations("services_menu");
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = serviceItems.map((service) => ({
    name: tServices(service.key),
    href: service.href,
  }));

  const getPathWithoutLocale = () => {
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      return "/" + segments.slice(2).join("/") || "/";
    }
    return pathname;
  };

  const router = useRouter();
  const pathWithoutLocale = getPathWithoutLocale();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathWithoutLocale === "/" || pathWithoutLocale === "";
    }
    return pathWithoutLocale.startsWith(href);
  };

  const isServiceActive = () => {
    return pathWithoutLocale.startsWith("/services/");
  };

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathWithoutLocale || "/", { locale: newLocale });
    setLangOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "border-slate-700/70 bg-[#030b1f]/88 py-3 shadow-[0_14px_50px_rgba(2,6,23,0.45)] backdrop-blur-xl"
          : "border-slate-700/45 bg-[#030b1f]/66 py-4 backdrop-blur-lg"
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" locale={locale} className="inline-flex items-center gap-2 text-slate-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/15">
              <LayoutGrid className="h-4 w-4 text-primary" />
            </div>
            <span className="futuristic-font text-lg font-bold tracking-tight">
              VEKTA<span className="text-primary">DEV</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-9 text-sm font-medium text-slate-300">
            {/* Home */}
            <Link
              href="/"
              locale={locale}
              className={cn(
                "transition-colors",
                isActive("/") ? "text-primary font-medium" : "hover:text-primary"
              )}
            >
              {t("home")}
            </Link>

            {/* Services Dropdown */}
            <div className="relative group py-2">
              <button
                className={cn(
                  "flex items-center gap-1 transition-colors hover:text-primary",
                  isServiceActive() ? "text-primary font-medium" : ""
                )}
              >
                {t("services")}
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 duration-200" />
              </button>

              <div className="absolute left-0 top-full mt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="rounded-xl border border-slate-700/60 bg-[#081228]/95 p-2 shadow-2xl shadow-black/45 backdrop-blur-xl space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      locale={locale}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-xs transition-colors",
                        isActive(service.href)
                          ? "bg-primary/15 text-primary font-medium"
                          : "text-slate-300 hover:bg-slate-800/70 hover:text-slate-100"
                      )}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <Link
              href="/#pricing"
              locale={locale}
              className="transition-colors hover:text-primary"
            >
              {t("pricing")}
            </Link>

            {/* About */}
            <Link
              href="/about"
              locale={locale}
              className={cn(
                "transition-colors",
                isActive("/about") ? "text-primary font-medium" : "hover:text-primary"
              )}
            >
              {t("about")}
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              locale={locale}
              className={cn(
                "transition-colors",
                isActive("/contact") ? "text-primary font-medium" : "hover:text-primary"
              )}
            >
              {t("contact")}
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <button
                className="rounded-full border border-slate-600 bg-slate-900/45 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-400"
                onClick={() => setLangOpen((open) => !open)}
                aria-label={t("switch_language")}
              >
                {localeLabels[locale]}
              </button>
              {langOpen ? (
                <div className="absolute right-0 top-full mt-2 w-24 rounded-xl border border-slate-700/70 bg-[#081228]/95 p-1.5 shadow-xl shadow-black/35">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={cn(
                        "block w-full rounded-lg px-2.5 py-2 text-left text-xs font-semibold transition-colors",
                        locale === loc ? "bg-primary/25 text-primary" : "text-slate-300 hover:bg-slate-800/70"
                      )}
                    >
                      {localeLabels[loc]}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <Button asChild size="sm" className="px-5 py-2.5">
              <Link href="/contact" locale={locale}>{t("consultation")}</Link>
            </Button>
          </div>

          <button
            className="lg:hidden rounded-xl border border-slate-600 bg-slate-900/55 p-2.5 text-slate-200"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={t("toggle_menu")}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className={cn("lg:hidden overflow-hidden transition-all duration-300", mobileOpen ? "max-h-[560px] pt-4" : "max-h-0 pt-0")}>
          <nav className="rounded-2xl border border-slate-700/60 bg-[#081228]/88 p-4 shadow-xl shadow-black/35 backdrop-blur-xl">
            <div className="mb-4 flex gap-2 border-b border-slate-700/55 pb-4">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold",
                    locale === loc ? "border-primary bg-primary/20 text-primary" : "border-slate-600 text-slate-300"
                  )}
                >
                  {localeLabels[loc]}
                </button>
              ))}
            </div>

            <div className="mb-4 space-y-1">
              {/* Home */}
              <Link
                href="/"
                locale={locale}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive("/") ? "bg-slate-800/50 text-primary font-medium" : "text-slate-200 hover:bg-slate-800/30"
                )}
              >
                {t("home")}
              </Link>

              {/* Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen((open) => !open)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/30 transition-colors"
                >
                  <span>{t("services")}</span>
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileServicesOpen && "rotate-180")} />
                </button>

                <div className={cn("overflow-hidden transition-all duration-300 pl-4 space-y-1.5 mt-1", mobileServicesOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0 pointer-events-none")}>
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      locale={locale}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-xs transition-colors",
                        isActive(service.href) ? "text-primary font-medium" : "text-slate-400 hover:text-slate-200"
                      )}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <Link
                href="/#pricing"
                locale={locale}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-slate-800/30 transition-colors"
              >
                {t("pricing")}
              </Link>

              {/* About */}
              <Link
                href="/about"
                locale={locale}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive("/about") ? "bg-slate-800/50 text-primary font-medium" : "text-slate-200 hover:bg-slate-800/30"
                )}
              >
                {t("about")}
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                locale={locale}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive("/contact") ? "bg-slate-800/50 text-primary font-medium" : "text-slate-200 hover:bg-slate-800/30"
                )}
              >
                {t("contact")}
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700/55">
              <Button asChild size="sm" className="w-full justify-center py-2.5">
                <Link href="/contact" locale={locale} onClick={() => setMobileOpen(false)}>
                  {t("consultation")}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
