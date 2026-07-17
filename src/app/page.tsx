import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import SocialLink from "@/components/SocialLink";
import {
  heroData,
  marqueeText,
  aboutData,
  projectsData,
  contactData,
} from "@/data/portfolio-data";

/**
 * Home — the single-page portfolio.
 *
 * This is a server component (no "use client"): it imports the static portfolio
 * content from `@/data/portfolio-data` and composes the section components. The
 * interactive sections (HeroSection, the ContactForm rendered inside
 * ContactSection) are themselves client components and render correctly as
 * children of this server page.
 *
 * Semantic document structure (Requirements 9.2, 9.3, 9.4):
 * - Exactly one `<header>` wraps the Hero, which serves as the page intro.
 * - Exactly one `<main>` holds the primary content: the decorative
 *   MarqueeBanner followed by the three content sections.
 * - Exactly one `<footer>` holds the closing call-to-action and copyright line.
 * - One `<section>` per content area (About / Projects / Contact) — each section
 *   component renders its own `<section>` with the appropriate `id` anchor
 *   (`about`, `projects`, `contact`) so the Hero CTAs can smooth-scroll to them.
 *
 * The yellow primary background and base body font are applied globally on
 * `<body>` via `globals.css`. A top-level wrapper applies `overflow-x-hidden`
 * (plus `w-full`) to guarantee no viewport width produces a horizontal
 * scrollbar (Requirement 8.6).
 */
export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full overflow-x-hidden">
      {/* Page header / intro */}
      <header>
        <HeroSection {...heroData} />
      </header>

      {/* Primary content */}
      <main>
        {/* Decorative scrolling skill banner */}
        <MarqueeBanner text={marqueeText} />

        <AboutSection {...aboutData} />
        <ProjectsSection {...projectsData} />
        <ContactSection {...contactData} />
      </main>

      {/* Page footer */}
      <footer className="border-t-neo-lg border-structural bg-structural text-surface">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 py-12 text-center">
          <p className="font-heading text-2xl font-bold uppercase text-primary">
            Let&apos;s build something
          </p>

          {/* Quick social links (dark footer variant) */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {contactData.socialLinks.map((link) => (
              <SocialLink
                key={link.platform}
                platform={link.platform}
                url={link.url}
                label={link.label}
              />
            ))}
          </div>

          <p className="font-body text-sm text-surface">
            © {currentYear} Rico Adrian Naibaho — Built with Next.js &amp;
            Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
