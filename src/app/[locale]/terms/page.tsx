import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSeoAlternates } from "@/lib/seo";
import TermsPageClient from "./page.client";

const ROUTE = "/terms";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("terms.title"),
    description: t("terms.description"),
    alternates: getSeoAlternates(locale, ROUTE),
    keywords: [
      "terms of use",
      "service terms",
      "intellectual property",
      "liability limitations",
      "VektaDev terms",
    ],
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TermsPageClient />;
}
