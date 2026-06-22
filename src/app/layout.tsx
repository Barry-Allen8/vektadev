import type { Metadata, Viewport } from "next";
import { defaultLocale } from "@/i18n";
import { getOrganizationSchema } from "@/lib/schema";
import "./globals.css";

const BASE_URL = "https://vektadev.com";
const SITE_TITLE = "VektaDev — Strony B2B, Asystenci AI i Automatyzacja Biznesu";
const SITE_DESCRIPTION =
  "VektaDev tworzy strony B2B, asystentów AI i systemy automatyzacji, które pomagają firmom zdobywać więcej zapytań, szybciej odpowiadać klientom i ograniczać ręczną pracę.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | VektaDev",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    url: BASE_URL,
    siteName: "VektaDev",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#020617",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang={defaultLocale}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
