"use client";

import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";

export default function ProblemSection() {
  const t = useTranslations("problem");

  return (
    <section className="section bg-slate-950/20 border-y border-slate-900">
      <div className="container max-w-4xl">
        <div className="sharp-card border-red-500/25 bg-red-950/5 p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold uppercase tracking-[0.2em] text-red-400/90">{t("title")}</h3>
            <p className="text-lg md:text-xl leading-relaxed text-slate-300 font-medium">
              {t("text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
