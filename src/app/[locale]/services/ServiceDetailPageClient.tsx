"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import { Link } from "@/i18n/navigation";
import {
  AlertTriangle,
  Bot,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Check,
  ChevronRight,
  Compass,
  LayoutDashboard,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  X,
} from "lucide-react";
import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import { serviceDetailConfig, type ServiceKey } from "@/data/serviceCatalog";

const heroIcons = {
  b2b_websites: BriefcaseBusiness,
  business_automation: ChartNoAxesCombined,
  ai_assistants: Bot,
  web_apps: LayoutDashboard,
} satisfies Record<ServiceKey, ComponentType<{ className?: string }>>;

const trustIcons = [Sparkles, ShieldCheck, Users, Compass];

type ServiceDetailPageClientProps = {
  serviceKey: ServiceKey;
};

type FaqItem = {
  question: string;
  answer: string;
};

type TrustItem = {
  title: string;
  description: string;
};

export default function ServiceDetailPageClient({ serviceKey }: ServiceDetailPageClientProps) {
  const t = useTranslations("services");
  const config = serviceDetailConfig[serviceKey];
  const Icon = heroIcons[serviceKey];

  return (
    <div className="min-h-screen">
      <section className="section border-b border-slate-700/45">
        <div className="container">
          <div className="max-w-5xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Icon className="h-3.5 w-3.5" />
              <span>{t(`${serviceKey}.title`)}</span>
            </div>
            <h1 className="mb-6 text-5xl text-slate-100 md:text-6xl">{t(`${serviceKey}.hero_title`)}</h1>
            <p className="mb-3 max-w-4xl text-lg leading-relaxed text-slate-400">{t(`${serviceKey}.hero_subtitle`)}</p>
            <p className="mb-8 max-w-4xl text-base leading-relaxed text-slate-400">{t(`${serviceKey}.hero_description`)}</p>
            <Button size="lg" asChild className="px-10">
              <Link href="/contact">
                {t(`${serviceKey}.hero_cta`)}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-[#030b1f]/45">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl text-slate-100">{t(`${serviceKey}.who_its_for.title`)}</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 lg:grid-cols-2">
            <Card className="border-primary/35 bg-slate-900/45">
              <h3 className="mb-5 flex items-center gap-2 text-xl text-primary">
                <Check className="h-5 w-5" />
                {t(`${serviceKey}.who_its_for.best_for_title`)}
              </h3>
              <ul className="space-y-3">
                {(t.raw(`${serviceKey}.who_its_for.best_for`) as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-slate-700/55 bg-slate-900/45">
              <h3 className="mb-5 flex items-center gap-2 text-xl text-slate-200">
                <X className="h-5 w-5" />
                {t(`${serviceKey}.who_its_for.not_for_title`)}
              </h3>
              <ul className="space-y-3">
                {(t.raw(`${serviceKey}.who_its_for.not_for`) as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-400">
                    <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl text-slate-100">{t(`${serviceKey}.problem_solution.title`)}</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-red-500/45 bg-slate-900/45">
              <AlertTriangle className="mb-4 h-5 w-5 text-red-300" />
              <h3 className="mb-3 text-xl text-red-300">{t(`${serviceKey}.problem_solution.problem_title`)}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{t(`${serviceKey}.problem_solution.problem_text`)}</p>
            </Card>
            <Card className="border-primary/45 bg-slate-900/45">
              <Lightbulb className="mb-4 h-5 w-5 text-primary" />
              <h3 className="mb-3 text-xl text-primary">{t(`${serviceKey}.problem_solution.solution_title`)}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{t(`${serviceKey}.problem_solution.solution_text`)}</p>
            </Card>
            <Card className="border-secondary/45 bg-slate-900/45">
              <Trophy className="mb-4 h-5 w-5 text-secondary" />
              <h3 className="mb-3 text-xl text-secondary">{t(`${serviceKey}.problem_solution.result_title`)}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{t(`${serviceKey}.problem_solution.result_text`)}</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section bg-[#030b1f]/45">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl text-slate-100">{t("what_you_get")}</h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {config.benefits.map((benefit) => (
              <Card key={benefit} className="border-slate-700/45 bg-slate-900/45">
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-2 text-lg text-slate-100">{t(`${serviceKey}.benefits.${benefit}.title`)}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{t(`${serviceKey}.benefits.${benefit}.description`)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl text-slate-100">{t(`${serviceKey}.trust_signals.title`)}</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(t.raw(`${serviceKey}.trust_signals.items`) as TrustItem[]).map((item, index) => {
              const TrustIcon = trustIcons[index] ?? Sparkles;
              return (
                <Card key={item.title} className="border-slate-700/45 bg-slate-900/45 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/35 bg-primary/10 text-primary">
                    <TrustIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-lg text-slate-100">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-[#030b1f]/45">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl text-slate-100">{t("packages")}</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 md:grid-cols-3">
            {config.packages.map((pkg) => (
              <Card
                key={pkg.key}
                className={`relative flex h-full flex-col border bg-slate-900/45 ${pkg.recommended ? "border-primary" : "border-slate-700/45"}`}
              >
                {pkg.recommended ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-primary bg-primary px-3 py-1 text-xs font-semibold text-slate-950">
                    {t("popular")}
                  </div>
                ) : null}
                <h3 className="mb-2 text-2xl text-slate-100">{t(`${serviceKey}.packages.${pkg.key}.name`)}</h3>
                <div className="mb-6 text-2xl font-semibold text-primary">{t(`${serviceKey}.packages.${pkg.key}.price`)}</div>
                <ul className="mb-6 space-y-2">
                  {(t.raw(`${serviceKey}.packages.${pkg.key}.features`) as string[]).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-auto w-full" variant={pkg.recommended ? "primary" : "outline"} asChild>
                  <Link href="/contact">{t("order")}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl text-slate-100">{t(`${serviceKey}.faq.title`)}</h2>
          <div className="mx-auto max-w-4xl">
            <Accordion
              items={(t.raw(`${serviceKey}.faq.items`) as FaqItem[]).map((item) => ({
                title: item.question,
                content: item.answer,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-700/45 bg-[#07122a]/78 p-10 text-center">
            <h2 className="mb-6 text-4xl text-slate-100">{t(`${serviceKey}.cta_section.title`)}</h2>
            <p className="mb-8 text-base leading-relaxed text-slate-300">{t(`${serviceKey}.cta_section.description`)}</p>
            <Button size="lg" asChild className="px-10">
              <Link href="/contact">
                {t(`${serviceKey}.cta_section.button`)}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
