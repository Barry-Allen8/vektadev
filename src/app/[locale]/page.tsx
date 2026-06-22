import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import { getSeoAlternates } from "@/lib/seo";

const ProblemSection = dynamic(
  () => import("@/components/sections/ProblemSection"),
  {
    loading: () => <section className="py-16" />,
  }
);

const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection"),
  {
    loading: () => <section id="services" className="section" />,
  }
);

const WhyUsSection = dynamic(
  () => import("@/components/sections/WhyUsSection"),
  {
    loading: () => <section className="section bg-card" />,
  }
);

const PricingSection = dynamic(
  () => import("@/components/sections/PricingSection"),
  {
    loading: () => <section id="pricing" className="section" />,
  }
);

const ProcessSection = dynamic(
  () => import("@/components/sections/ProcessSection"),
  {
    loading: () => <section className="section" />,
  }
);

const UseCasesSection = dynamic(
  () => import("@/components/sections/UseCasesSection"),
  {
    loading: () => <section className="section" />,
  }
);

const CTASection = dynamic(
  () => import("@/components/sections/CTASection"),
  {
    loading: () => <section className="section" />,
  }
);

const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
  {
    loading: () => <section id="contact" className="section" />,
  }
);

const ROUTE = "/";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    title: t("home.title"),
    description: t("home.description"),
    alternates: getSeoAlternates(locale, ROUTE),
    keywords: [
      "B2B websites",
      "business automation",
      "AI assistants",
      "custom client portals",
      "lead generation websites",
      "VektaDev",
    ],
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative isolate">
      <Hero />
      <ProblemSection />
      <ServicesSection />
      <WhyUsSection />
      <PricingSection />
      <ProcessSection />
      <UseCasesSection />
      <CTASection />
      <ContactSection />
    </div>
  );
}
