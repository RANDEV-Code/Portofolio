import type { NeobrutalistCardProps } from "@/types";
import TechBadge from "./TechBadge";

/**
 * NeobrutalistCard
 *
 * A reusable Neobrutalist surface card used to present projects and other
 * content blocks. It renders an optional decorative index chip and accent bar,
 * a title (`h3`), a description paragraph, and a wrapping grid of
 * {@link TechBadge} elements for the provided technologies.
 *
 * Styling follows the centralized Neobrutalism design tokens:
 * - `border-neo-lg` (4px) `border-structural` (black) `rounded-neo` (6px)
 * - `shadow-neo` (5px hard offset shadow) on a `bg-surface` (white) background
 *
 * Interaction is purely CSS-driven (no client-side JS required): on hover and
 * keyboard focus the card translates by (-4px, -4px) and expands its shadow to
 * `shadow-neo-hover` (9px) within a 150ms (`duration-neo`) transition. The card
 * is made focusable via `tabIndex={0}` so keyboard users receive the same
 * affordance as pointer users.
 *
 * Optional props:
 * - `index` — a decorative corner chip label (e.g. "01").
 * - `accentClassName` — a Tailwind bg utility tinting the title accent bar.
 */
export default function NeobrutalistCard({
  title,
  description,
  technologies,
  className,
  children,
  index,
  accentClassName = "bg-primary",
}: NeobrutalistCardProps) {
  return (
    <div
      tabIndex={0}
      className={[
        // Structural Neobrutalism styling
        "group relative border-neo-lg border-structural rounded-neo shadow-neo bg-surface",
        "p-6",
        // Smooth transition for the hover/focus lift effect
        "transition-all duration-neo",
        // Hover: lift (-4px, -4px) and expand shadow
        "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-hover",
        // Keyboard focus mirrors the hover affordance (req 7.5)
        "focus-visible:-translate-x-1 focus-visible:-translate-y-1 focus-visible:shadow-neo-hover focus-visible:outline-none",
        // Also respond when an inner interactive element gains focus
        "focus-within:-translate-x-1 focus-within:-translate-y-1 focus-within:shadow-neo-hover",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Decorative index chip in the top-right corner */}
      {index && (
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-3 flex h-11 w-11 items-center justify-center rounded-full border-neo-lg border-structural bg-structural font-heading text-sm font-bold text-primary shadow-neo-sm"
        >
          {index}
        </span>
      )}

      {/* Accent bar above the title for a less plain card head */}
      <span
        aria-hidden="true"
        className={`mb-4 block h-3 w-16 border-neo-sm border-structural ${accentClassName}`}
      />

      <h3 className="font-heading text-h3 text-structural">{title}</h3>

      <p className="mt-3 font-body text-structural">{description}</p>

      {technologies.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      )}

      {children}
    </div>
  );
}
