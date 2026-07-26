"use client";

import Image from "next/image";
import { ACCENT_BG, type DecorContent, type HeroSectionProps } from "@/types";
import { DEFAULT_HERO } from "@/data/portfolio-defaults";
import NeobrutalistButton from "./NeobrutalistButton";
import DecorShapes from "./DecorShapes";
import Sticker from "./Sticker";

/**
 * Hero section — the first thing visitors see.
 *
 * Renders eyebrow stickers, primary headline (h1), profile photo with surrounding
 * floating badges and sparkles, tech stack pills, supporting subheadline,
 * CTA buttons, and an availability status pill. A rich set of decorative geometric
 * shapes sits behind and around the content so the section feels lively and vibrant.
 */
export default function HeroSection({
  headline,
  subheadline,
  ctaButtons,
  photo,
  photoAlt,
  stickers,
  flankingBadges,
  rotatingBadge,
  techPills,
  availability,
  scrollCue,
  decor,
}: HeroSectionProps & { decor?: DecorContent }) {
  // Every field below the CTAs is admin-editable and therefore optional; fall
  // back to the copy the component used to hardcode.
  const photoSrc = photo || DEFAULT_HERO.photo;
  const photoAltText = photoAlt || DEFAULT_HERO.photoAlt;
  const stickerList = stickers ?? DEFAULT_HERO.stickers;
  const badges = flankingBadges ?? DEFAULT_HERO.flankingBadges;
  const pills = techPills ?? DEFAULT_HERO.techPills;
  const rotating = rotatingBadge ?? DEFAULT_HERO.rotatingBadge;
  const availabilityText = availability ?? DEFAULT_HERO.availability;
  const scrollLabel = scrollCue ?? DEFAULT_HERO.scrollCue;
  /**
   * Smooth-scroll to the section with the given DOM id (e.g. "projects",
   * "contact", "about").
   */
  const scrollToSection = (targetId: string) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dots px-6 pb-16 pt-28 text-center"
    >
      {/* Decorative floating shapes & badges behind content */}
      <DecorShapes decor={decor} />

      {/* `z-10` keeps the content column above the DecorShapes layer (`z-0`) */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6">
        {/* Eyebrow stickers. Alternating tilt keeps the row hand-placed. */}
        {stickerList.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {stickerList.map((sticker, i) => (
              <Sticker
                key={`${sticker.label}-${i}`}
                color={ACCENT_BG[sticker.color]}
                rotate={i % 2 === 0 ? "-rotate-2" : "rotate-2"}
                // Only the first sticker is guaranteed room on small screens.
                className={i === 0 ? "" : "hidden sm:inline-block"}
              >
                {sticker.label}
              </Sticker>
            ))}
          </div>
        )}

        {/* ── Profile Photo with Floating Badges & Sparkles ── */}
        <div className="relative flex animate-float items-center justify-center">
          {/* Sparkle decorative icons around photo */}
          <span className="absolute -top-4 -left-6 text-2xl select-none animate-pulse-slow">✨</span>
          <span className="absolute -bottom-2 -left-6 text-xl select-none">✦</span>
          <span className="absolute -top-3 -right-6 text-xl select-none">★</span>

          {/* Flanking badges — first entry left, second right. */}
          {badges[0] && (
            <div
              className={`absolute -left-20 sm:-left-36 top-10 hidden sm:flex items-center gap-1.5 rounded-neo border-neo-sm border-structural px-3 py-1 font-heading text-xs font-bold text-structural shadow-neo-sm -rotate-6 animate-wiggle select-none ${
                ACCENT_BG[badges[0].color]
              }`}
            >
              {badges[0].label}
            </div>
          )}

          {badges[1] && (
            <div
              className={`absolute -right-20 sm:-right-36 top-10 hidden sm:flex items-center gap-1.5 rounded-neo border-neo-sm border-structural px-3 py-1 font-heading text-xs font-bold text-structural shadow-neo-sm rotate-6 animate-wiggle select-none ${
                ACCENT_BG[badges[1].color]
              }`}
            >
              {badges[1].label}
            </div>
          )}

          {/* Outer ring — thick black neobrutalism border + hard shadow */}
          <div
            className="relative rounded-full border-4 border-structural shadow-neo-xl"
            style={{ padding: "4px", background: "#FFDE4D" }}
          >
            <div className="overflow-hidden rounded-full border-4 border-structural">
              <Image
                src={photoSrc}
                alt={photoAltText}
                width={200}
                height={200}
                className="block h-[200px] w-[200px] object-cover"
                priority
              />
            </div>
          </div>

          {/* Rotating badge sticker */}
          {rotating && (
            <div
              className="absolute -bottom-3 -right-3 flex h-14 w-14 animate-spin-slow items-center justify-center rounded-full border-neo-sm border-structural bg-pink font-heading text-[9px] font-black uppercase leading-tight tracking-tighter text-structural shadow-neo-sm select-none"
              aria-hidden="true"
            >
              <span className="text-center">{rotating}</span>
            </div>
          )}
        </div>

        {/*
          Headline. Scaled up at `lg` and given a hard offset text shadow so it
          out-weighs the photo and the surrounding decor layer — previously the
          h1 sat at the same visual weight as the badges around it, which left
          the section without a clear focal point.
        */}
        <h1 className="font-heading text-h1-mobile text-structural drop-shadow-[3px_3px_0px_rgba(0,0,0,0.15)] md:text-h1-desktop lg:text-[58px] lg:leading-[1.05]">
          HI, I&apos;m{" "}
          <span className="inline-block -rotate-1 border-neo-lg border-structural bg-pink px-3 shadow-neo transition-transform duration-neo hover:rotate-0">
            RICO ADRIAN
          </span>{" "}
          NAIBAHO
        </h1>

        {/* Tech Stack Highlight Row */}
        {pills.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {pills.map((pill, i) => (
              <span
                key={`${pill.label}-${i}`}
                className={`border-neo-sm border-structural rounded-neo px-2.5 py-0.5 font-heading text-xs font-bold text-structural shadow-neo-sm transition-transform hover:scale-105 ${
                  ACCENT_BG[pill.color]
                }`}
              >
                {pill.label}
              </span>
            ))}
          </div>
        )}

        {/* Subheadline Box */}
        <p className="relative max-w-2xl overflow-hidden rounded-neo border-neo-sm border-structural bg-surface px-5 py-4 pl-7 font-body text-body text-structural shadow-neo">
          {/* Accent rail, echoing the Projects heading card */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-2.5 bg-purple"
          />
          {subheadline}
        </p>

        {/*
          CTA Buttons. The lead action uses the `accent` (lime) variant: on the
          yellow hero a yellow button had no fill contrast and read as the
          weaker of the two next to the white secondary.
        */}
        <div className="mt-2 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:justify-center">
          {ctaButtons.map((cta, index) => (
            <NeobrutalistButton
              key={cta.targetId}
              label={index === 0 ? `${cta.label} ➔` : `${cta.label} ✉️`}
              variant={index === 0 ? "accent" : "secondary"}
              onClick={() => scrollToSection(cta.targetId)}
              className="w-full sm:w-auto"
            />
          ))}
        </div>

        {/* Availability status pill with a pulsing dot */}
        {availabilityText && (
          <div className="mt-2 inline-flex items-center gap-2 border-neo-sm border-structural rounded-neo bg-lime px-4 py-2 font-heading text-sm font-bold uppercase tracking-wide text-structural shadow-neo-sm transition-transform hover:scale-105">
            <span className="h-3 w-3 rounded-full border-2 border-structural bg-structural animate-pulse-dot" />
            {availabilityText}
          </div>
        )}
      </div>

      {/* Interactive Scroll cue */}
      <button
        onClick={() => scrollToSection("about")}
        className="focus-neo absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 border-neo-sm border-structural rounded-neo bg-surface px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-widest text-structural shadow-neo-sm transition-all hover:bg-primary active:shadow-neo-pressed md:flex cursor-pointer"
        aria-label="Scroll down to About section"
      >
        <span>{scrollLabel}</span>
        <span className="animate-bounce">↓</span>
      </button>
    </section>
  );
}
