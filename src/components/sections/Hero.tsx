"use client";

import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Sparkles, Code2, Cpu, Globe, Zap, Target, Rocket, Handshake, ShieldCheck } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;

  return (
    <LazyMotion features={domAnimation}>
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/30">
      {/* Static gradient background - no animations for performance */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_100%,rgba(139,92,246,0.1),transparent)]" />
        
        {/* Static blobs - no animation for better mobile performance */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-accent/15 to-secondary/15 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container relative z-10 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left - Text Content */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <m.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-primary/10 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{t("badge")}</span>
            </div>
          </m.div>

          <m.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold mb-6 tracking-tight"
            >
              {t("title")}{" "}
              <span className="gradient-text drop-shadow-[0_0_25px_rgba(37,99,235,0.3)]">{t("title_gradient")}</span>
          </m.h1>

          <m.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {t("description")}
          </m.p>

          <m.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button size="lg" className="btn-shine group" asChild>
              <Link href="/contact" locale={locale}>
                  {t("cta_primary")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
              <Button size="lg" variant="outline" className="group" asChild>
                <a href="#services">
                  {t("cta_secondary")}
                  <span className="inline-block animate-bounce">↓</span>
                </a>
            </Button>
            </m.div>

            {/* Stats - simplified without hover animations */}
            <m.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { icon: Target, label: t("stats.individual"), color: "from-blue-500 to-cyan-500" },
                { icon: Rocket, label: t("stats.modern"), color: "from-orange-500 to-amber-500" },
                { icon: Handshake, label: t("stats.partnership"), color: "from-emerald-500 to-teal-500" },
                { icon: ShieldCheck, label: t("stats.quality"), color: "from-violet-500 to-purple-500" },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm hover:shadow-lg hover:bg-white hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xs text-muted font-medium leading-tight">{stat.label}</div>
                  </div>
                );
              })}
            </m.div>
          </m.div>

          {/* Right - Simplified Illustration (desktop only) */}
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Main circle - static rings for performance */}
            <div className="relative w-[450px] h-[450px]">
              {/* Outer ring - CSS animation instead of JS */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-[spin_20s_linear_infinite]" />
              
              {/* Middle ring */}
              <div className="absolute inset-8 rounded-full border border-accent/30 animate-[spin_25s_linear_infinite_reverse]" />

              {/* Inner gradient circle */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm" />

              {/* Center content - simple float with CSS */}
              <div className="absolute inset-0 flex items-center justify-center animate-[float_6s_ease-in-out_infinite]">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-2xl shadow-primary/30 flex items-center justify-center">
                  <Code2 className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Floating icons - CSS animations */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 animate-[float_4s_ease-in-out_infinite]">
                <div className="w-16 h-16 rounded-xl bg-white shadow-lg shadow-primary/10 flex items-center justify-center border border-primary/10">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[float_4s_ease-in-out_infinite_0.5s]">
                <div className="w-16 h-16 rounded-xl bg-white shadow-lg shadow-accent/10 flex items-center justify-center border border-accent/10">
                  <Cpu className="w-8 h-8 text-accent" />
                </div>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 left-4 animate-[float_5s_ease-in-out_infinite_1s]">
                <div className="w-14 h-14 rounded-xl bg-white shadow-lg shadow-secondary/10 flex items-center justify-center border border-secondary/10">
                  <Zap className="w-7 h-7 text-secondary" />
                </div>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 right-4 animate-[float_5s_ease-in-out_infinite_1.5s]">
                <div className="w-14 h-14 rounded-xl bg-white shadow-lg shadow-primary/10 flex items-center justify-center border border-primary/10">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
              </div>

              {/* Static connecting lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 450 450">
                <path d="M225 80 L225 160" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M225 290 L225 370" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M80 225 L160 225" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M290 225 L370 225" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="4 4" />
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </m.div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary/50 animate-[scrollDot_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
    </LazyMotion>
  );
}
