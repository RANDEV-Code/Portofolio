import { ACCENT_BG, type StatItem } from "@/types";
import { DEFAULT_ABOUT } from "@/data/portfolio-defaults";
import ScrollReveal from "./ScrollReveal";

/**
 * StatsStrip
 *
 * A row of headline numbers for the About section. That section was previously
 * two paragraphs of prose and a badge grid — dense to read and with nothing for
 * a skimming recruiter to latch onto. Numbers are the fastest-scanning content
 * on a portfolio, so they get their own high-contrast band.
 *
 * Each tile uses a different accent fill and a colored "double" shadow so the
 * row reads as four distinct objects rather than a striped table.
 */

export default function StatsStrip({ stats }: { stats?: StatItem[] }) {
  const items = stats ?? DEFAULT_ABOUT.stats;
  if (items.length === 0) return null;

  return (
    <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((stat, i) => (
        <ScrollReveal as="li" key={`${stat.label}-${i}`} delay={i * 80}>
          <div
            className={[
              "group relative h-full overflow-hidden rounded-neo border-neo-lg border-structural p-4",
              ACCENT_BG[stat.color],
              "shadow-neo hover:shadow-neo-hover",
              "transition-all duration-neo hover:-translate-x-1 hover:-translate-y-1",
            ].join(" ")}
          >
            {/* Oversized watermark glyph bleeding off the tile corner */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-3 -top-2 text-5xl opacity-20 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-30"
            >
              {stat.glyph}
            </span>

            <p className="relative font-heading text-3xl font-black leading-none text-structural sm:text-4xl">
              {stat.value}
              {stat.suffix && (
                <span className="align-super text-base font-bold opacity-70">
                  {stat.suffix}
                </span>
              )}
            </p>
            <p className="relative mt-2 font-heading text-[11px] font-bold uppercase tracking-widest text-structural/75">
              {stat.label}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </ul>
  );
}
