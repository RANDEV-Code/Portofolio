import type { AboutSectionProps } from "@/types";
import { DEFAULT_ABOUT } from "@/data/portfolio-defaults";
import TechBadge from "./TechBadge";
import Sticker from "./Sticker";
import StatsStrip from "./StatsStrip";
import ScrollReveal from "./ScrollReveal";

/**
 * AboutSection
 *
 * The "About Me" content section. It presents an eyebrow sticker, a heading
 * (`h2`), a headline stat strip, a profile description card, a quick-facts
 * panel, and a tech stack grid composed of {@link TechBadge} elements — one
 * badge per provided skill, each tinted with a rotating accent color.
 *
 * Layout notes:
 * - A {@link StatsStrip} sits directly under the heading. The section was
 *   previously prose-first, which gave a skimming reader nothing to anchor on;
 *   numbers scan fastest, so they lead.
 * - The description card is the visual "primary" of the two-column row and gets
 *   a drop cap plus a signature line; the quick-facts panel is secondary and is
 *   tilted slightly so the row does not read as two equal-weight boxes.
 * - Content is constrained with `max-w-7xl mx-auto` and horizontal padding.
 *
 * The tech stack grid follows the Requirement 8 breakpoints: one column on
 * mobile, two on `md`, four on `lg`.
 */

/** Accent colors cycled across the tech badges for visual variety. */
const BADGE_ACCENTS = [
  "bg-pink",
  "bg-cyan",
  "bg-lime",
  "bg-purple",
  "bg-orange",
  "bg-surface",
];

/** Slight alternating rotations so the badge grid feels hand-placed. */
const BADGE_ROTATIONS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

/** Glyphs cycled across the quick-facts rows in place of a plain bullet. */
const FACT_GLYPHS = ["◆", "▲", "●", "■", "✦", "▸"];

export default function AboutSection({
  heading,
  description,
  skills,
  quickFacts,
  eyebrow,
  cardLabel,
  statusLine,
  skillsHeading,
  stats,
}: AboutSectionProps) {
  const facts = quickFacts ?? [
    "IT Student & Developer",
    "Backend & web architecture",
    "Inventory & agri-tech systems",
    "Always shipping side projects",
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-grid">
      {/* Oversized outlined watermark word — anchors the section without
          competing with the heading, since it carries no fill. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-8 hidden select-none font-heading text-[9rem] font-black leading-none text-outline opacity-[0.07] lg:block"
      >
        ABOUT
      </span>

      {/*
        Corner geometry to keep the section from reading as a plain slab.
        Gated at `2xl` and pinned to the extreme edges: the content column is
        `max-w-7xl` (1280px), so below ~1600px viewport there is no gutter for
        these to sit in and they collide with the stat cards.
      */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[1%] top-[24%] hidden h-16 w-16 rotate-12 rounded-neo border-neo-lg border-structural bg-orange/70 shadow-neo 2xl:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[12%] right-[1.5%] hidden h-12 w-12 rounded-full border-neo-lg border-structural bg-cyan/70 shadow-neo 2xl:block"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20">
        <ScrollReveal>
          <div className="flex flex-col items-start gap-3">
            <Sticker color="bg-lime" rotate="-rotate-2">
              {eyebrow ?? DEFAULT_ABOUT.eyebrow}
            </Sticker>

            {/* Heading with a highlighter swash behind it — a flat accent slab
                offset under the baseline, in keeping with the sticker language. */}
            <h2 className="relative inline-block font-heading text-h2 text-structural">
              <span
                aria-hidden="true"
                className="absolute -inset-x-1 bottom-1 h-3 -rotate-1 bg-pink"
              />
              <span className="relative">{heading}</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Headline numbers — fastest-scanning content in the section */}
        <StatsStrip stats={stats} />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Profile description card */}
          <ScrollReveal>
            <div className="relative h-full rounded-neo border-neo-lg border-structural bg-surface p-6 shadow-neo transition-all duration-neo hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-hover">
              {/* File-tab label clipped to the card's top edge */}
              <span
                aria-hidden="true"
                className="absolute -top-[3px] left-6 rounded-b-neo border-x-neo-sm border-b-neo-sm border-structural bg-primary px-3 py-1 font-heading text-[10px] font-black uppercase tracking-widest text-structural"
              >
                {cardLabel ?? DEFAULT_ABOUT.cardLabel}
              </span>

              <p className="mt-5 font-body text-structural text-justify">
                {/* Drop cap gives the block a defined entry point */}
                <span className="float-left mr-3 mt-1 flex h-12 w-12 items-center justify-center rounded-neo border-neo-sm border-structural bg-lime font-heading text-2xl font-black leading-none text-structural shadow-neo-sm">
                  {description.trim().charAt(0)}
                </span>
                {description.trim().slice(1)}
              </p>

              {/* Signature line */}
              <div className="mt-6 flex items-center gap-3 border-t-2 border-dashed border-structural/30 pt-4">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 animate-pulse-dot rounded-full bg-lime ring-2 ring-structural"
                />
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-structural/70">
                  {statusLine ?? DEFAULT_ABOUT.statusLine}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick-facts mini card. Uses div rows (not ul/li) so the skills
              grid below remains the only list in this section. */}
          <ScrollReveal delay={120}>
            <div className="h-full rotate-1 rounded-neo border-neo-lg border-structural bg-purple p-6 font-body text-structural shadow-neo transition-transform duration-neo hover:rotate-0">
              <p className="flex items-center gap-2 font-heading text-lg font-black uppercase tracking-tight">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-neo border-2 border-structural bg-primary text-sm"
                >
                  ⚡
                </span>
                Quick facts
              </p>

              <div className="mt-4 space-y-2.5 text-sm">
                {facts.map((fact, i) => (
                  <p
                    key={i}
                    className="flex items-start gap-2.5 rounded-neo border-2 border-structural bg-surface/70 px-3 py-2 transition-colors duration-neo hover:bg-surface"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 font-black text-structural/60"
                    >
                      {FACT_GLYPHS[i % FACT_GLYPHS.length]}
                    </span>
                    <span>{fact}</span>
                  </p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {skills.length > 0 && (
          <>
            <ScrollReveal>
              <div className="mt-14 flex flex-wrap items-center gap-3">
                <p className="font-heading text-lg font-black uppercase tracking-wide text-structural">
                  {skillsHeading ?? DEFAULT_ABOUT.skillsHeading}
                </p>
                {/* Count chip — sets an expectation before the grid is scanned */}
                <span className="rounded-full border-neo-sm border-structural bg-structural px-3 py-0.5 font-heading text-xs font-black text-primary">
                  {skills.length} TOOLS
                </span>
                <span
                  aria-hidden="true"
                  className="hidden h-[3px] flex-1 bg-structural/25 sm:block"
                />
              </div>
            </ScrollReveal>

            <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {skills.map((skill, i) => (
                <ScrollReveal as="li" key={skill} delay={Math.min(i, 8) * 50}>
                  <TechBadge
                    label={skill}
                    className={`block w-full text-center ${
                      BADGE_ACCENTS[i % BADGE_ACCENTS.length]
                    } ${BADGE_ROTATIONS[i % BADGE_ROTATIONS.length]} hover:rotate-0`}
                  />
                </ScrollReveal>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
