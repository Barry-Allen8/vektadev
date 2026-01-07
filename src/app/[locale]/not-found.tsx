"use client";

import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { Home, ArrowLeft } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";

export default function NotFound() {
  const t = useTranslations("not_found");
  const locale = useLocale() as Locale;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-9xl font-bold gradient-text mb-8">404</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-muted mb-8">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild>
              <Link href="/" locale={locale}>
                <Home className="w-5 h-5" />
                {t("home")}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact" locale={locale}>
                <ArrowLeft className="w-5 h-5" />
                {t("contact")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
