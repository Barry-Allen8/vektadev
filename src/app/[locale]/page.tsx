import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import TrustedBySection from "@/components/sections/TrustedBySection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import CTASection from "@/components/sections/CTASection";
import { defaultLocale, locales } from "@/i18n";

const BASE_URL = "https://vektadev.com";
const ROUTE = "/";

const getLocalizedUrl = (locale: string, route: string) => {
  const normalizedRoute = route === "/" ? "" : route;
  const localePrefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${BASE_URL}${localePrefix}${normalizedRoute}`;
};

const getAlternates = (route: string) =>
  Object.fromEntries(locales.map((locale) => [locale, getLocalizedUrl(locale, route)]));

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("home.title"),
    description: t("home.description"),
    alternates: {
      canonical: getLocalizedUrl(locale, ROUTE),
      languages: getAlternates(ROUTE),
    },
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBySection />
      <ServicesSection />
      <WhyUsSection />
      <CaseStudiesSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
