"use client";

import { useState } from "react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import { ExternalLink, PlayCircle, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { portfolioShowcase } from "@/data/portfolioShowcase";

export default function PortfolioPageClient() {
  const t = useTranslations("portfolio");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { key: "all", label: t("all") },
    { key: "E-commerce", label: t("categories.ecommerce") },
    { key: "Website", label: t("categories.website") },
    { key: "Chatbot", label: t("categories.chatbot") },
    { key: "AI Solution", label: t("categories.ai_solution") },
    { key: "Web App", label: t("categories.web_app") },
  ];

  const filteredProjects = activeCategory === "all"
    ? portfolioShowcase
    : portfolioShowcase.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen">
      <section className="section border-b border-slate-700/45">
        <div className="container">
          <div className="text-center">
            <span className="mb-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Our Showcase
            </span>
            <h1 className="mb-5 text-5xl text-slate-100 md:text-7xl">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-2xl text-base text-slate-400">{t("description")}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category.key
                    ? "border-primary bg-primary text-slate-950"
                    : "border-slate-700/60 bg-slate-900/45 text-slate-300 hover:border-primary/45 hover:text-primary"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} id={project.slug} className="group border-slate-700/45 bg-slate-900/45 p-3">
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl border border-slate-700/45">
                  <Image
                    src={project.image}
                    alt={t(`projects.${project.key}.title`)}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </div>

                <div className="mb-2 inline-flex rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                  {t(`categories.${project.categoryKey}`)}
                </div>

                <div className="mb-2 flex items-start justify-between gap-3">
                  <h2 className="text-xl text-slate-100">{t(`projects.${project.key}.title`)}</h2>
                  <ArrowUpRight className="mt-1 h-4 w-4 text-primary" />
                </div>
                <p className="mb-4 text-sm leading-relaxed text-slate-400">{t(`projects.${project.key}.description`)}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-md border border-slate-700/60 bg-slate-900/55 px-2 py-1 text-[11px] text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-slate-700/45 pt-3 text-xs text-slate-400">
                  <span>{project.year}</span>
                  <div className="flex items-center gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:text-primary-dark"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {t("live_demo")}
                    </a>
                    {project.videoUrl ? (
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-secondary hover:text-primary"
                      >
                        <PlayCircle className="h-3.5 w-3.5" />
                        {t("video_demo")}
                      </a>
                    ) : null}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-400">{t("no_projects")}</div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
