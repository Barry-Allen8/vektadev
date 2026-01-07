import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { locales, defaultLocale } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vektadev.com";

  // Static page paths
  const staticPaths = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/websites", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/chatbots", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/ai-solutions", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/consulting", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/mobile-apps", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/cloud", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  // Generate URLs for all locales (only pl and en)
  const staticPages: MetadataRoute.Sitemap = staticPaths.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: locale === defaultLocale ? page.priority : page.priority * 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page.path}`])
        ),
      },
    }))
  );

  // Dynamic blog pages for all locales
  const blogPages: MetadataRoute.Sitemap = blogPosts.flatMap((post) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: locale === defaultLocale ? 0.6 : 0.54,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/blog/${post.slug}`])
        ),
      },
    }))
  );

  return [...staticPages, ...blogPages];
}
