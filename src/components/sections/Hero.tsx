"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;
  const tiltCardRef = useRef<HTMLDivElement | null>(null);
  const tiltMediaRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    syncReducedMotion();
    mediaQuery.addEventListener("change", syncReducedMotion);

    return () => {
      mediaQuery.removeEventListener("change", syncReducedMotion);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const applyTilt = () => {
    rafRef.current = null;
    const card = tiltCardRef.current;
    const media = tiltMediaRef.current;

    if (!card || !media) {
      return;
    }

    const rotateX = -pointerRef.current.y * 6;
    const rotateY = pointerRef.current.x * 8;
    const shiftX = -pointerRef.current.x * 12;
    const shiftY = -pointerRef.current.y * 12;

    card.style.setProperty("--hero-rotate-x", `${rotateX}deg`);
    card.style.setProperty("--hero-rotate-y", `${rotateY}deg`);
    media.style.setProperty("--hero-shift-x", `${shiftX}px`);
    media.style.setProperty("--hero-shift-y", `${shiftY}px`);
  };

  const queueTiltUpdate = () => {
    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(applyTilt);
    }
  };

  const handleHeroPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotionRef.current) {
      return;
    }

    const card = tiltCardRef.current;
    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return;
    }

    const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    pointerRef.current.x = Math.max(-1, Math.min(1, normalizedX));
    pointerRef.current.y = Math.max(-1, Math.min(1, normalizedY));
    queueTiltUpdate();
  };

  const resetHeroTilt = () => {
    pointerRef.current.x = 0;
    pointerRef.current.y = 0;
    queueTiltUpdate();
  };

  return (
    <header className="relative overflow-hidden pb-24 pt-32 md:pb-28 md:pt-36">
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="pointer-events-none absolute left-1/2 top-[-22%] h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="container relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {t("badge")}
            </div>

            <h1 className="glitch-text mb-6 max-w-3xl text-balance text-5xl font-bold text-slate-50 sm:text-6xl lg:text-7xl">
              {t("title")}
              <br />
              <span className="gradient-text">{t("title_gradient")}</span>
            </h1>

            <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-slate-300 lg:mx-0">
              {t("description")}
            </p>

            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="px-9">
                <Link href="/contact" locale={locale}>
                  {t("cta_primary")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="px-9">
                <a href="#services">{t("cta_secondary")}</a>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[t("stats.individual"), t("stats.modern"), t("stats.partnership"), t("stats.quality")].map((label) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-700/45 bg-slate-900/45 px-3 py-2.5 text-xs font-medium text-slate-300"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div
              ref={tiltCardRef}
              onPointerMove={handleHeroPointerMove}
              onPointerLeave={resetHeroTilt}
              onPointerCancel={resetHeroTilt}
              className="hero-tilt-card group relative overflow-hidden rounded-[2rem] border border-primary/30 bg-slate-900/60 p-2 shadow-2xl shadow-black/35 backdrop-blur-xl"
            >
              <div className="hero-neon-pulse" aria-hidden="true" />
              <div className="relative aspect-[1.1/1] overflow-hidden rounded-[1.65rem] border border-slate-700/50">
                <div ref={tiltMediaRef} className="hero-tilt-media relative h-full w-full">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                    aria-hidden="true"
                  >
                    <source src="/videos/hero-case-1.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                </div>
              </div>

              <div className="absolute right-7 top-7 rounded-2xl border border-primary/30 bg-[#081228]/92 px-4 py-3 backdrop-blur-lg">
                <p className="text-[11px] text-slate-400">{t("growth_impact")}</p>
                <p className="text-xl font-semibold text-primary">+24.8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
