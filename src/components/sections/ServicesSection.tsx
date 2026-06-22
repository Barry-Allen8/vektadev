"use client";

import { Bot, BriefcaseBusiness, ChartNoAxesCombined, LayoutDashboard, ArrowRight } from "lucide-react";
import type { ComponentType } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";
import { serviceItems, type ServiceKey } from "@/data/serviceCatalog";

const serviceIcons = {
  b2b_websites: BriefcaseBusiness,
  business_automation: ChartNoAxesCombined,
  ai_assistants: Bot,
  web_apps: LayoutDashboard,
} satisfies Record<ServiceKey, ComponentType<{ className?: string }>>;

export default function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale() as Locale;

  return (
    <section id="services" className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="container relative z-10">
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/85">Our Expertise</p>
            <h2 className="mb-4 text-4xl text-slate-100 md:text-5xl">{t("title")}</h2>
            <p className="text-base text-slate-400">{t("description")}</p>
          </div>

          <Link
            href="/services/b2b-websites"
            locale={locale}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
          >
            {t("learn_more")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
          {serviceItems.map((service) => {
            const Icon = serviceIcons[service.key];
            const features = (t.raw(`${service.key}.features`) as string[]).slice(0, 3);

            return (
              <Link
                key={service.key}
                href={service.href}
                locale={locale}
                className="group sharp-card border-slate-700/45 p-7 transition-all hover:border-primary/45"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mb-2 text-2xl text-slate-100 transition-colors group-hover:text-primary">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-400">{t(`${service.key}.description`)}</p>

                <ul className="space-y-2">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
