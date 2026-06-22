import type { MetadataRoute } from "next";
import { locales } from "@/i18n";

const BASE_URL = "https://vektadev.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/services/b2b-websites",
    "/services/business-automation",
    "/services/ai-assistants",
    "/services/web-apps",
  ];

  const routes = baseRoutes;

  const localizedRoutes = locales.flatMap((locale) =>
    routes.map((route) => `/${locale}${route}`)
  );

  return localizedRoutes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));
}
