"use client";

import CookieBanner from "@/components/ui/CookieBanner";

/**
 * Client-side layout wrapper.
 * Renders client-only components like CookieBanner that require
 * browser APIs (localStorage, etc.) and should not be server-rendered.
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <CookieBanner />
    </>
  );
}
