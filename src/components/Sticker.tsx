import type { ReactNode } from "react";

/**
 * Sticker
 *
 * A small rotated Neobrutalist "label sticker" used as an eyebrow above section
 * headings (e.g. "★ ABOUT ME", "WHAT I BUILD"). Provides a colorful accent and
 * visual hierarchy. Purely presentational.
 */
export default function Sticker({
  children,
  color = "bg-pink",
  rotate = "-rotate-2",
  className = "",
}: {
  children: ReactNode;
  /** Tailwind background color utility (e.g. "bg-cyan", "bg-lime"). */
  color?: string;
  /** Tailwind rotation utility (e.g. "-rotate-2", "rotate-3"). */
  rotate?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-block border-neo-sm border-structural rounded-neo ${color} ${rotate} px-3 py-1 font-heading text-sm font-bold uppercase tracking-wide text-structural shadow-neo-sm ${className}`}
    >
      {children}
    </span>
  );
}
