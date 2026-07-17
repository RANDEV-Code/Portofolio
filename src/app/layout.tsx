import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Rico Adrian Naibaho — IT Student & Developer",
  description:
    "Portfolio of Rico Adrian Naibaho, an Information Technology student and developer focused on backend development and web development, building functional web applications and interactive systems.",
};

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
      <body>{children}</body>
    </html>
  );
}
