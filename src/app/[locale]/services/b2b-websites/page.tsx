import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getSeoAlternates } from "@/lib/seo";
import { getServiceSchema } from "@/lib/schema";
import ServiceDetailPageClient from "../ServiceDetailPageClient";

const ROUTE = "/services/b2b-websites";
const SERVICE_KEY = "b2b_websites";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t(`${SERVICE_KEY}.metadata.title`),
    description: t(`${SERVICE_KEY}.metadata.description`),
    keywords: t(`${SERVICE_KEY}.metadata.keywords`),
    alternates: getSeoAlternates(locale, ROUTE),
    openGraph: {
      title: t(`${SERVICE_KEY}.metadata.title`),
      description: t(`${SERVICE_KEY}.metadata.description`),
      type: "website",
    },
  };
}

export default async function B2BWebsitesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const schema = getServiceSchema({
    locale,
    name: t(`${SERVICE_KEY}.title`),
    description: t(`${SERVICE_KEY}.description`),
    path: ROUTE,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceDetailPageClient serviceKey={SERVICE_KEY} />
    </>
  );
}
