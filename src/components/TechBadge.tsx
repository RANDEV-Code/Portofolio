import type { TechBadgeProps } from "@/types";

/**
 * TechBadge
 *
 * A small Neobrutalist badge used to display a single technology/skill label.
 * Pure presentational component (no client-side interactivity required).
 *
 * Styling follows the Neobrutalism design tokens:
 * - `border-neo-sm` (3px) thick `border-structural` (black) border
 * - `rounded-neo` (6px) corner radius
 * - `shadow-neo` hard offset shadow (lifts to `shadow-neo-hover` on hover/focus)
 * - white `bg-surface` background by default (callers may override via className)
 * - label text rendered at `text-sm` (14px minimum) with a bold weight
 *
 * A `transition-all duration-neo` is included so callers that add a rotation or
 * hover transform (e.g. `-rotate-2 hover:rotate-0`) animate smoothly.
 */
export default function TechBadge({ label, className }: TechBadgeProps) {
  /*
   * Only apply the default white fill when the caller has not supplied its own
   * background.
   *
   * `bg-surface` used to be baked into the base string, so a caller passing
   * `bg-pink` produced two background utilities of equal specificity on the
   * same element. Which one won came down to their order in the generated
   * stylesheet, not the order in the class attribute — and `bg-surface` won, so
   * the About section's accent-tinted skill grid rendered entirely white.
   */
  const hasCustomBg = /(?:^|\s)bg-/.test(className ?? "");

  return (
    <span
      className={[
        "inline-block border-neo-sm border-structural rounded-neo shadow-neo px-3 py-2",
        "text-sm font-heading font-bold text-structural",
        "transition-all duration-neo hover:-translate-y-1 hover:shadow-neo-hover",
        hasCustomBg ? "" : "bg-surface",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </span>
  );
}
