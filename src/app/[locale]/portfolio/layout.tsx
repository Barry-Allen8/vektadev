import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - VektaDev",
  description: "Our completed projects and case studies",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

