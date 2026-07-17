/**
 * DecorShapes
 *
 * A purely decorative layer of floating Neobrutalist geometric shapes
 * (circles, squares, stars, zig-zags) used to break up the flat background.
 * Rendered absolutely-positioned within a `relative` parent and marked
 * `aria-hidden` so assistive tech ignores it. Shapes sit behind content
 * (`-z-10`) and never intercept pointer events.
 *
 * Animations (float / wiggle / spin) are defined in tailwind.config.ts and are
 * automatically disabled under `prefers-reduced-motion` via globals.css.
 */
export default function DecorShapes({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {/* Top-left circle */}
      <span className="absolute left-[6%] top-[14%] hidden h-16 w-16 rounded-full border-neo-lg border-structural bg-pink shadow-neo animate-float sm:block" />

      {/* Top-right square (rotated) */}
      <span className="absolute right-[8%] top-[18%] hidden h-14 w-14 rotate-12 border-neo-lg border-structural bg-cyan shadow-neo animate-wiggle md:block" />

      {/* Mid-left small square */}
      <span className="absolute left-[12%] top-[55%] hidden h-10 w-10 -rotate-6 border-neo-sm border-structural bg-lime shadow-neo-sm md:block" />

      {/* Bottom-right circle */}
      <span className="absolute bottom-[12%] right-[10%] hidden h-20 w-20 rounded-full border-neo-lg border-structural bg-purple shadow-neo animate-float lg:block" />

      {/* Spinning star (SVG) */}
      <svg
        className="absolute right-[20%] top-[60%] hidden h-16 w-16 animate-spin-slow lg:block"
        viewBox="0 0 24 24"
        fill="#FF8A4C"
        stroke="#000"
        strokeWidth={1.5}
      >
        <path d="M12 1.5 14.6 8l6.9.3-5.4 4.3 1.9 6.7L12 15.8 6 19.3l1.9-6.7-5.4-4.3L9.4 8 12 1.5Z" />
      </svg>
    </div>
  );
}
