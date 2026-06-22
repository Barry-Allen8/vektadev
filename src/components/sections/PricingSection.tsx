"use client";

import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { type Locale } from "@/i18n";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const packageKeys = ["b2b_website", "website_automation", "ai_automation"] as const;

export default function PricingSection() {
  const t = useTranslations("pricing");
  const locale = useLocale() as Locale;

  return (
    <section id="pricing" className="section border-y border-slate-700/40 bg-[#030b1f]/45">
      <div className="container">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
            {t("eyebrow")}
          </p>
          <h2 className="mb-4 text-4xl text-slate-100 md:text-5xl">{t("title")}</h2>
          <p className="text-base leading-relaxed text-slate-400">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {packageKeys.map((key) => (
            <Card
              key={key}
              className="flex h-full flex-col border-slate-700/45 bg-slate-900/45 p-7"
            >
              <h3 className="mb-2 text-2xl text-slate-100">{t(`packages.${key}.name`)}</h3>
              <div className="mb-5 text-2xl font-semibold text-primary">{t(`packages.${key}.price`)}</div>
              <p className="mb-6 text-sm leading-relaxed text-slate-400">
                {t(`packages.${key}.description`)}
              </p>
              <ul className="mb-7 space-y-2.5">
                {(t.raw(`packages.${key}.features`) as string[]).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-auto w-full" variant={key === "website_automation" ? "primary" : "outline"} asChild>
                <Link href="/contact" locale={locale}>{t("cta")}</Link>
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 italic">{t("note")}</p>
        </div>
      </div>
    </section>
  );
}
