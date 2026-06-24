"use client";

import { useTranslations } from "next-intl";
import { Factory, Users2, Briefcase, BookOpen } from "lucide-react";

const useCaseKeys = [
  { key: "manufacturing", icon: Factory },
  { key: "recruitment", icon: Users2 },
  { key: "service_business", icon: Briefcase },
  { key: "consulting", icon: BookOpen },
] as const;

export default function UseCasesSection() {
  const t = useTranslations("use_cases");

  return (
    <section className="section bg-slate-950/40 border-b border-slate-900">
      <div className="container">
        <div className="section-title">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">{t("badge")}</p>
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {useCaseKeys.map((item) => (
            <article key={item.key} className="sharp-card border-slate-800 bg-[#070e20]/60 p-8 flex gap-6 items-start hover:border-primary/30 transition duration-300">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-slate-100">{t(`${item.key}.title`)}</h3>
                <p className="text-base text-slate-400 leading-relaxed">{t(`${item.key}.description`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
