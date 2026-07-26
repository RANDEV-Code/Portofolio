/**
 * SectionDivider
 *
 * A decorative edge between two stacked sections. The page previously butted
 * sections directly against each other (only Projects had a border), so the
 * scroll read as one continuous slab of yellow. A hard zigzag edge gives each
 * section a defined boundary in the same flat, geometric language as the rest
 * of the design — no gradients, no soft blends.
 *
 * `variant`:
 * - `zigzag` — sawtooth edge, drawn as a repeating CSS gradient.
 * - `ticker` — a slim black rail with repeating glyphs, used as a heavier beat.
 *
 * `color` is the fill of the divider band (should match the section *below* it
 * for `zigzag`, so the teeth read as that section biting upward).
 */
export default function SectionDivider({
  variant = "zigzag",
  color = "#FFDE4D",
  glyph = "✦",
}: {
  variant?: "zigzag" | "ticker";
  /** Hex fill for the zigzag band. */
  color?: string;
  /** Repeated glyph for the ticker variant. */
  glyph?: string;
}) {
  if (variant === "ticker") {
    return (
      <div
        aria-hidden="true"
        className="flex h-8 w-full items-center gap-6 overflow-hidden border-y-neo-lg border-structural bg-structural bg-stripes-light px-4 text-primary select-none"
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className={`font-heading text-xs font-black ${
              i % 3 === 0 ? "text-pink" : i % 3 === 1 ? "text-cyan" : "text-lime"
            }`}
          >
            {glyph}
          </span>
        ))}
      </div>
    );
  }

  /*
   * Sawtooth drawn as a repeating 40×20 SVG tile rather than CSS gradients —
   * two stacked linear-gradients cover each other and just render a solid bar,
   * whereas an explicit polygon gives clean teeth at any width.
   *
   * Each tile holds a black triangle with a slightly smaller colored triangle
   * on top, leaving a ~4px black rim that reads as the structural outline.
   */
  const tile = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="20" viewBox="0 0 40 20" preserveAspectRatio="none">',
    '<path d="M0 20 L20 0 L40 20 Z" fill="#000000"/>',
    `<path d="M0 21 L20 5.5 L40 21 Z" fill="${color}"/>`,
    "</svg>",
  ].join("");

  return (
    <div
      aria-hidden="true"
      className="h-5 w-full select-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(tile)}")`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "40px 20px",
      }}
    />
  );
}
