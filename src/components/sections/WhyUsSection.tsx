"use client";

import { Target, Link, Bot, Eye, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";

const featureKeys = [
  { key: "business_focused", icon: Target },
  { key: "integrated_websites", icon: Link },
  { key: "practical_ai", icon: Bot },
  { key: "clear_process", icon: Eye },
  { key: "built_for_smb", icon: Building2 },
] as const;

export default function WhyUsSection() {
  const t = useTranslations("why_us");

  return (
    <section className="section bg-[#030b1f]/45">
      <div className="container">
        <div className="section-title">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">Value Proposition</p>
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((feature) => (
            <article key={feature.key} className="sharp-card border-slate-700/45 p-6 hover:border-primary/30 transition duration-300">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-xl text-slate-100">{t(`${feature.key}.title`)}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{t(`${feature.key}.description`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
