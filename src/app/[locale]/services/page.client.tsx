"use client";

import Card from "@/components/ui/Card";
import { Bot, BriefcaseBusiness, ChartNoAxesCombined, LayoutDashboard, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { ComponentType } from "react";
import { serviceItems, type ServiceKey } from "@/data/serviceCatalog";

const serviceIcons = {
  b2b_websites: BriefcaseBusiness,
  business_automation: ChartNoAxesCombined,
  ai_assistants: Bot,
  web_apps: LayoutDashboard,
} satisfies Record<ServiceKey, ComponentType<{ className?: string }>>;

export default function ServicesPageClient() {
  const t = useTranslations("services");

  return (
    <div className="min-h-screen">
      <section className="section border-b border-slate-700/45">
        <div className="container">
          <div className="max-w-4xl">
            <span className="mb-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              {t("badge")}
            </span>
            <h1 className="mb-5 text-5xl text-slate-100 md:text-6xl">{t("title")}</h1>
            <p className="max-w-3xl text-base text-slate-400">{t("description")}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
            {serviceItems.map((service) => {
              const Icon = serviceIcons[service.key];
              const features = (t.raw(`${service.key}.features`) as string[]).slice(0, 4);

              return (
                <Link key={service.key} href={service.href} className="group">
                  <Card className="h-full border-slate-700/45 bg-slate-900/45 p-7 hover:border-primary/50">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h2 className="mb-3 text-2xl text-slate-100 transition-colors group-hover:text-primary">{t(`${service.key}.title`)}</h2>
                    <p className="mb-5 text-sm leading-relaxed text-slate-400">{t(`${service.key}.description`)}</p>

                    <ul className="space-y-2">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {t("learn_more")}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
