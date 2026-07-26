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
        // Structural Neobrutalism styling. `overflow-hidden` lets the accent
        // header bleed to the card edges without escaping the rounded corners.
        "group relative overflow-hidden border-neo-lg border-structural rounded-neo shadow-neo bg-surface",
        // Smooth transition for the hover/focus lift effect
        "transition-all duration-neo",
        // Hover: lift (-4px, -4px) and expand shadow
        "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-hover",
        // Keyboard focus mirrors the hover affordance (req 7.5) and adds a
        // dashed outline so the focused card is unambiguous.
        "focus-visible:-translate-x-1 focus-visible:-translate-y-1 focus-visible:shadow-neo-hover focus-neo",
        // Also respond when an inner interactive element gains focus
        "focus-within:-translate-x-1 focus-within:-translate-y-1 focus-within:shadow-neo-hover",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/*
        Accent "title bar" — the card is framed like an application window.
        This replaces the previous 16px accent stub, which was too small to
        establish a color identity per card, and it gives the index chip a
        home that does not overhang the card edge.
      */}
      <div
        className={`flex items-center gap-2 border-b-neo-lg border-structural px-5 py-2.5 bg-stripes ${accentClassName}`}
      >
        {/* Window "traffic light" dots, purely decorative */}
        <span
          aria-hidden="true"
          className="flex shrink-0 items-center gap-1.5"
        >
          <span className="h-3 w-3 rounded-full border-2 border-structural bg-surface" />
          <span className="h-3 w-3 rounded-full border-2 border-structural bg-surface/60" />
          <span className="h-3 w-3 rounded-full border-2 border-structural bg-surface/30" />
        </span>

        {index && (
          <span
            aria-hidden="true"
            className="ml-auto flex h-7 min-w-[28px] items-center justify-center rounded-full border-2 border-structural bg-structural px-2 font-heading text-xs font-black text-primary"
          >
            {index}
          </span>
        )}
      </div>

      {/* Hover sweep — a single diagonal light pass across the card body. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/45 to-transparent group-hover:animate-shimmer"
      />

      <div className="relative p-6">
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
    </div>
  );
}
