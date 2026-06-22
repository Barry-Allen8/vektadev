import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSeoAlternates } from "@/lib/seo";
import AboutPageClient from "./page.client";

const ROUTE = "/about";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    title: t("about.title"),
    description: t("about.description"),
    alternates: getSeoAlternates(locale, ROUTE),
    keywords: [
      "VektaDev team",
      "software engineers Poland",
      "AI solutions partner",
      "B2B websites Poland",
      "business automation Poland",
      "web apps Poland",
    ],
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPageClient />;
}
