"use client";

import type { NeobrutalistButtonProps } from "@/types";

/**
 * Reusable Neobrutalism button primitive.
 *
 * Renders as a `<button>` by default and as an `<a>` when `href` is provided.
 * Both renderings share the same Neobrutalist styling: a thick structural
 * border, hard offset shadow, and a hover/focus interaction that nudges the
 * element up-and-left while expanding the shadow.
 *
 * Design tokens (see `tailwind.config.ts`):
 * - `border-neo-lg` (4px), `border-structural` (#000000), `rounded-neo` (6px)
 * - `shadow-neo` (default) / `shadow-neo-hover` (hover & focus-visible)
 * - `duration-neo` (150ms) for the `transition-all`
 *
 * Accessibility:
 * - `focus-visible:` mirrors the hover visual so keyboard users get the same
 *   feedback as pointer users (Requirement 7.5).
 * - Generous padding plus a 44×44px minimum keeps the touch target comfortable
 *   on mobile (Requirement 8.5).
 */
export default function NeobrutalistButton({
  label,
  onClick,
  href,
  variant = "primary",
  type = "button",
  className = "",
}: NeobrutalistButtonProps) {
  // Base styles shared by both the <button> and <a> renderings.
  const baseClasses = [
    "inline-flex items-center justify-center",
    "min-h-[44px] min-w-[44px] px-6 py-3",
    "font-heading font-bold",
    "border-neo-lg border-structural rounded-neo shadow-neo",
    "transition-all duration-neo",
    "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-hover",
    "focus-visible:-translate-x-1 focus-visible:-translate-y-1 focus-visible:shadow-neo-hover",
    "focus-visible:outline-none",
    "cursor-pointer select-none",
  ].join(" ");

  // Variant background colors: primary = yellow, secondary = white surface.
  const variantClasses =
    variant === "secondary"
      ? "bg-surface text-structural"
      : "bg-primary text-structural";

  const classes = `${baseClasses} ${variantClasses} ${className}`.trim();

  // When an href is supplied, render an anchor while keeping all styling.
  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {label}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {label}
    </button>
  );
}
