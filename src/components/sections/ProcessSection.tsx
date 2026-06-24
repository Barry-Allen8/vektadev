"use client";

import { Compass, Map, Code2, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";

const stepKeys = [
  { key: "discovery", icon: Compass },
  { key: "strategy", icon: Map },
  { key: "build", icon: Code2 },
  { key: "launch_support", icon: Rocket },
] as const;

export default function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section className="section border-y border-slate-700/40 bg-[#030b1f]/45" id="process">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl text-slate-100 md:text-5xl">{t("title")}</h2>
          <p className="mx-auto max-w-2xl text-base text-slate-400">{t("description")}</p>
        </div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="absolute left-12 right-12 top-9 hidden h-px bg-slate-700/50 md:block" />

          {stepKeys.map((step, index) => (
            <div key={step.key} className="relative z-10 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-[#070e20] text-primary transition duration-300 hover:scale-105">
                <step.icon className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{t("step")} {index + 1}</p>
                <h3 className="mt-1 text-lg font-medium text-slate-100">{t(`steps.${step.key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(`steps.${step.key}.description`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
