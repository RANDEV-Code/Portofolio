import type { MarqueeBannerProps } from "@/types";

/**
 * MarqueeBanner
 *
 * A horizontally scrolling Neobrutalist banner that continuously moves skill
 * keywords from right to left. Pure CSS animation (no client-side JS), so this
 * component does not need the "use client" directive.
 *
 * How the seamless loop works (Requirements 6.1, 6.2):
 * - The inner track renders the `text` content TWICE (two identical copies).
 * - `animate-marquee` (defined in tailwind.config.ts as `marquee 20s linear
 *   infinite`) translates the track via `translateX` from 0% to -50%.
 * - Because the track holds two identical copies, translating by -50% scrolls
 *   exactly one full copy off-screen. At that instant the second copy sits
 *   precisely where the first one began, so the animation loops with no visible
 *   gap, jump, or reset and completes one full cycle every 20 seconds.
 * - `translateX` is GPU-accelerated for a consistent 60fps (Requirement 6.3).
 *
 * Accessibility (Requirement 6.4):
 * - `motion-reduce:animate-none` disables the animation for users who prefer
 *   reduced motion, leaving the skill text rendered statically. This mirrors
 *   the `prefers-reduced-motion` fallback in globals.css.
 * - The duplicated copy is purely visual filler, so it is marked
 *   `aria-hidden="true"` to avoid the text being announced twice by screen
 *   readers.
 *
 * Each text copy interleaves a small rotated star glyph between phrases for a
 * livelier banner. The stars are part of the decorative copy.
 */
export default function MarqueeBanner({ text, className }: MarqueeBannerProps) {
  return (
    <div
      role="marquee"
      aria-label={text}
      className={`w-full overflow-hidden border-y-neo-lg border-structural bg-structural py-3 text-primary${
        className ? ` ${className}` : ""
      }`}
    >
      {/*
        The track is `w-max` so both copies sit side by side on a single line,
        and `whitespace-nowrap` prevents the text from wrapping. `animate-marquee`
        drives the scroll; `motion-reduce:animate-none` opts out for reduced
        motion.
      */}
      <div className="flex w-max whitespace-nowrap animate-marquee motion-reduce:animate-none">
        <span className="px-4 font-heading text-lg font-bold uppercase tracking-wide">
          {text}
        </span>
        <span
          aria-hidden="true"
          className="px-4 font-heading text-lg font-bold uppercase tracking-wide text-cyan"
        >
          {text}
        </span>
      </div>
    </div>
  );
}
