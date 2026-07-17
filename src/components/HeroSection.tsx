"use client";

import Image from "next/image";
import type { HeroSectionProps } from "@/types";
import NeobrutalistButton from "./NeobrutalistButton";
import DecorShapes from "./DecorShapes";
import Sticker from "./Sticker";

/**
 * Hero section — the first thing visitors see.
 *
 * Renders an eyebrow sticker, the primary headline (h1), a supporting
 * subheadline, an "available for work" status pill, and the CTA buttons that
 * smooth-scroll to other sections of the page. A decorative dot-grid texture
 * and floating geometric shapes sit behind the content so the hero does not
 * feel flat. The section fills (roughly) the viewport so the headline and CTAs
 * are fully visible on load (Requirement 2.6).
 *
 * Design tokens (see `tailwind.config.ts`):
 * - `font-heading` for the headline, `font-body` for the subheadline
 * - Responsive headline size: `text-h1-mobile` (32px) / `md:text-h1-desktop` (48px)
 *
 * Interactivity:
 * - `scrollToSection` uses native smooth scrolling to the target section's
 *   element ID, so this component is a client component.
 */
export default function HeroSection({
  headline,
  subheadline,
  ctaButtons,
}: HeroSectionProps) {
  /**
   * Smooth-scroll to the section with the given DOM id (e.g. "projects",
   * "contact"). Uses optional chaining so a missing target is a no-op rather
   * than a runtime error.
   */
  const scrollToSection = (targetId: string) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dots px-6 py-16 text-center">
      {/* Decorative floating shapes behind the content */}
      <DecorShapes />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6">
        {/* Eyebrow sticker */}
        <Sticker color="bg-cyan" rotate="-rotate-2">
          ★ Portfolio 2026
        </Sticker>

        {/* ── Profile Photo ── */}
        <div className="relative flex animate-float items-center justify-center">
          {/* Outer ring — thick black neobrutalism border + hard shadow */}
          <div
            className="relative rounded-full border-4 border-structural shadow-neo-xl"
            style={{ padding: "4px", background: "#FFDE4D" }}
          >
            <div className="overflow-hidden rounded-full border-4 border-structural">
              <Image
                src="/foto.jpg"
                alt="Rico Adrian Naibaho — IT Developer"
                width={200}
                height={200}
                className="block h-[200px] w-[200px] object-cover"
                priority
              />
            </div>
          </div>

          {/* Rotating badge sticker */}
          <div
            className="absolute -bottom-3 -right-3 flex h-14 w-14 animate-spin-slow items-center justify-center rounded-full border-neo-sm border-structural bg-pink font-heading text-[9px] font-black uppercase leading-tight tracking-tighter text-structural shadow-neo-sm"
            aria-hidden="true"
          >
            <span className="text-center">✦ OPEN TO WORK ✦</span>
          </div>
        </div>

        <h1 className="font-heading text-h1-mobile md:text-h1-desktop text-structural">
          HI, I&apos;m{" "}
          <span className="inline-block -rotate-1 border-neo-sm border-structural bg-pink px-2 shadow-neo-sm">
            RICO ADRIAN
          </span>{" "}
          NAIBAHO
        </h1>

        <p className="max-w-2xl border-neo-sm border-structural rounded-neo bg-surface px-5 py-4 font-body text-body text-structural shadow-neo">
          {subheadline}
        </p>

        <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {ctaButtons.map((cta, index) => (
            <NeobrutalistButton
              key={cta.targetId}
              label={cta.label}
              variant={index === 0 ? "primary" : "secondary"}
              onClick={() => scrollToSection(cta.targetId)}
            />
          ))}
        </div>

        {/* Availability status pill with a pulsing dot */}
        <div className="mt-4 inline-flex items-center gap-2 border-neo-sm border-structural rounded-neo bg-lime px-4 py-2 font-heading text-sm font-bold uppercase tracking-wide text-structural shadow-neo-sm">
          <span className="h-3 w-3 rounded-full border-2 border-structural bg-structural animate-pulse-dot" />
          Available for collaboration
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-heading text-xs font-bold uppercase tracking-widest text-structural md:block">
        Scroll ↓
      </div>
    </section>
  );
}
