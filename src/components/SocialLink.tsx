import type { SocialLinkProps } from "@/types";
import SocialIcon from "./SocialIcon";

/**
 * SocialLink
 *
 * A Neobrutalist-styled external link used in the Contact section to point at a
 * social/contact destination (GitHub, LinkedIn, or email). It renders an inline
 * platform icon alongside the label, with the hard-shadow + thick-border
 * Neobrutalism treatment and an on-hover/focus "lift" (translate up-left +
 * expanded shadow), matching the NeobrutalistButton/Card interaction.
 *
 * Security: external links open in a new tab (`target="_blank"`) and use
 * `rel="noopener noreferrer"` to prevent reverse-tabnabbing and referrer leakage.
 *
 * Because the interaction is pure CSS (`hover:`/`focus-visible:`), this stays a
 * server component — no `"use client"` directive is required.
 *
 * Accessibility: a 44×44px minimum (`min-h-[44px] min-w-[44px]`) keeps the touch
 * target comfortable on mobile (Requirement 8.5), and `focus-visible:` mirrors
 * the hover lift so keyboard users get equivalent feedback (Requirement 7.5).
 *
 * _Requirements: 5.6, 7.5, 8.5_
 */

/**
 * Per-platform accent background. Each platform gets a distinct, on-brand
 * surface color so the three links are visually differentiable while keeping
 * the shared Neobrutalist border/shadow treatment.
 */
const PLATFORM_ACCENT: Record<SocialLinkProps["platform"], string> = {
  github: "bg-cyan",
  linkedin: "bg-purple",
  email: "bg-pink",
};

export default function SocialLink({
  platform,
  url,
  label,
  className,
}: SocialLinkProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-3 min-h-[44px] min-w-[44px] px-5 py-3 font-heading font-bold text-structural " +
    "border-neo-lg border-structural rounded-neo shadow-neo " +
    "transition-all duration-neo " +
    "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-hover " +
    "focus-visible:-translate-x-1 focus-visible:-translate-y-1 focus-visible:shadow-neo-hover " +
    "focus-visible:outline-none";

  const accentClass = PLATFORM_ACCENT[platform];

  const classes = [baseClasses, accentClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={classes}>
      <SocialIcon platform={platform} className="h-5 w-5" />
      {label}
    </a>
  );
}
