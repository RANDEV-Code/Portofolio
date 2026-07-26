import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { getPortfolioData } from "@/data/portfolio-data";
import "./globals.css";

/*
 * Optimized font loading via next/font (Requirements 1.5, 9.5).
 *
 * Space Grotesk is the heading font. Weight 700 is included to satisfy the
 * Design_System requirement that headings render at font-weight 700 or higher.
 * The font is exposed through the `--font-space-grotesk` CSS variable that
 * `tailwind.config.ts` maps to the `font-heading` utility.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

/*
 * JetBrains Mono is the monospace body font. Weight 400 covers body text per
 * the Design_System; 500/700 are available for emphasis. The font is exposed
 * through the `--font-jetbrains-mono` CSS variable that `globals.css` uses as
 * the default `body` font-family and `tailwind.config.ts` maps to `font-body`.
 */
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
});

/**
 * Page metadata, read from the same JSON the admin panel writes.
 *
 * `generateMetadata` runs per request (the page is `force-dynamic`), so a title
 * or description changed in the admin panel takes effect immediately — a static
 * `metadata` export would have frozen both at build time.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { site } = getPortfolioData();
  return {
    title: site.metaTitle,
    description: site.metaDescription,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        {/*
          <ScrollReveal> starts its children at opacity 0 and reveals them from
          a client-side IntersectionObserver. Without JS that observer never
          runs, so force the wrappers visible for JS-off visitors and crawlers
          that do not execute scripts.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
