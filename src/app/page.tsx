import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import SocialLink from "@/components/SocialLink";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import SectionDivider from "@/components/SectionDivider";
import { getPortfolioData } from "@/data/portfolio-data";

/**
 * Render this page per request instead of prerendering it at build time.
 *
 * The portfolio content lives in a JSON file that the admin panel rewrites at
 * runtime. As a statically prerendered route, the page was baked at `next
 * build` and never picked up those writes — projects added through the admin
 * panel were saved to disk but never shown until the app was rebuilt.
 */
export const dynamic = "force-dynamic";

/**
 * Home — the single-page portfolio.
 *
 * This is a server component (no "use client"): it reads the portfolio content
 * from `@/data/portfolio-data` at request time and composes the sections. The
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
  // Re-read on every render so admin panel saves are reflected immediately.
  const {
    site,
    hero: heroData,
    about: aboutData,
    projects: projectsData,
    contact: contactData,
    footer,
    decor,
    marqueeText,
  } = getPortfolioData();

  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full overflow-x-hidden">
      {/* Sticky section navigation + reading progress */}
      <Navbar
        brandName={site.brandName}
        brandSuffix={site.brandSuffix}
        ctaLabel={site.navCtaLabel}
        ctaTarget={site.navCtaTarget}
      />

      {/* Page header / intro */}
      <header>
        <HeroSection {...heroData} decor={decor} />
      </header>

      {/* Primary content */}
      <main>
        {/* Decorative scrolling skill banner */}
        <MarqueeBanner text={marqueeText} />

        <AboutSection {...aboutData} />

        {/* Hard sawtooth edge into the Projects band. Sections previously butted
            directly together, so the scroll read as one continuous slab. */}
        <SectionDivider color="#FFDE4D" />

        <ProjectsSection {...projectsData} />

        <SectionDivider color="#FFDE4D" />

        <ContactSection {...contactData} />
      </main>

      {/* Ticker rail marking the transition into the inverted footer */}
      <SectionDivider variant="ticker" glyph="✦" />

      {/*
        Page footer.
        Rebuilt from a single centered stack into a three-column sitemap with a
        display-type headline and a separate legal bar, so the closing frame has
        the same structure as the rest of the page instead of trailing off.
      */}
      <footer className="relative overflow-hidden bg-ink bg-stripes-light text-surface">
        <div className="mx-auto w-full max-w-7xl px-6 pb-8 pt-14">
          {/* Oversized closing statement */}
          <p className="font-heading text-4xl font-black uppercase leading-[0.95] tracking-tight text-primary sm:text-6xl lg:text-7xl">
            {footer.headlineTop}
            <br />
            <span className="text-outline-light">{footer.headlineOutline}</span>
            <span className="text-pink">.</span>
          </p>

          <div className="mt-10 grid gap-10 border-t-2 border-dashed border-surface/25 pt-10 md:grid-cols-3">
            {/* Column 1 — identity */}
            <div>
              <p className="font-heading text-sm font-black uppercase tracking-widest text-cyan">
                {footer.name}
              </p>
              <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-surface/70">
                {footer.blurb}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-neo border-2 border-surface/30 px-3 py-1.5 font-heading text-[11px] font-bold uppercase tracking-widest text-lime">
                <span className="h-2 w-2 animate-pulse-dot rounded-full bg-lime" />
                {footer.availability}
              </p>
            </div>

            {/* Column 2 — in-page navigation */}
            <nav aria-label="Footer navigation">
              <p className="font-heading text-sm font-black uppercase tracking-widest text-cyan">
                Navigate
              </p>
              <ul className="mt-3 space-y-2">
                {[
                  { href: "#home", label: "Home" },
                  { href: "#about", label: "About" },
                  { href: "#projects", label: "Projects" },
                  { href: "#contact", label: "Contact" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="focus-neo-light group inline-flex items-center gap-2 font-body text-sm text-surface/75 transition-colors hover:text-primary"
                    >
                      <span
                        aria-hidden="true"
                        className="text-pink transition-transform duration-neo group-hover:translate-x-1"
                      >
                        ▸
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 3 — social */}
            <div>
              <p className="font-heading text-sm font-black uppercase tracking-widest text-cyan">
                Elsewhere
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {contactData.socialLinks.map((link) => (
                  <SocialLink
                    key={link.platform}
                    platform={link.platform}
                    url={link.url}
                    label={link.label}
                    className="text-sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="border-t-2 border-surface/20 bg-structural">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center sm:flex-row sm:text-left">
            <p className="font-body text-xs text-surface/60">
              © {currentYear} {footer.copyrightName} — {footer.credit}
            </p>
            <p className="font-heading text-[11px] font-bold uppercase tracking-widest text-surface/50">
              {footer.location}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating return-to-top control */}
      <BackToTop />
    </div>
  );
}
