import { ACCENT_BG, type DecorContent } from "@/types";
import { DEFAULT_DECOR } from "@/data/portfolio-defaults";

/**
 * DecorShapes
 *
 * A purely decorative layer of floating Neobrutalist badges, geometric shapes,
 * and a code card filling the canvas around the Hero content. Marked
 * `aria-hidden` and `pointer-events-none` so it affects neither assistive tech
 * nor clicks.
 *
 * The badge *text and colour* come from the admin panel; their *positions* stay
 * here. Each slot below was tuned against the width of the content column and
 * is gated to a breakpoint where a gutter actually exists — exposing
 * coordinates to the editor would make it trivial to drop a badge on top of the
 * headline.
 */

/**
 * Fixed layout slots, in the order the admin panel lists them.
 *
 * `wrapper` positions the badge; `rotate`/`animation` give each one its own
 * motion so the layer does not pulse in lockstep. Slots are consumed in order,
 * and any badge beyond the last slot is dropped.
 */
type BadgeSlot = {
  wrapper: string;
  rotate: string;
  animation: string;
  delay: string;
  /** Needs a wider gutter than the rest — gated to `2xl` instead of `xl`. */
  wide?: boolean;
};

const BADGE_SLOTS: BadgeSlot[] = [
  {
    wrapper: "left-[2%] top-[9%]",
    rotate: "rotate-[-3deg]",
    animation: "animate-float",
    delay: "0s",
  },
  {
    wrapper: "left-[5%] top-[13%]",
    rotate: "rotate-[2deg]",
    animation: "animate-wiggle",
    delay: "0.6s",
  },
  {
    wrapper: "left-[7%] top-[64%]",
    rotate: "rotate-[4deg]",
    animation: "animate-wiggle",
    delay: "0.9s",
  },
  {
    wrapper: "right-[2%] top-[9%]",
    rotate: "rotate-[2deg]",
    animation: "animate-float",
    delay: "0.45s",
  },
  {
    wrapper: "right-[5%] top-[14%]",
    rotate: "rotate-[-3deg]",
    animation: "animate-float-reverse",
    delay: "1.8s",
  },
  {
    // Sits in the headline's vertical band, so it needs the widest gutter.
    wrapper: "right-[2%] top-[45%] 2xl:flex",
    rotate: "rotate-[3deg]",
    animation: "animate-float",
    delay: "0.15s",
    wide: true,
  },
  {
    wrapper: "right-[5%] top-[80%]",
    rotate: "rotate-[-2deg]",
    animation: "animate-bounce-soft",
    delay: "0s",
  },
];

export default function DecorShapes({
  className = "",
  decor,
}: {
  className?: string;
  decor?: DecorContent;
}) {
  const badges = decor?.badges ?? DEFAULT_DECOR.badges;
  const codeFileName = decor?.codeFileName ?? DEFAULT_DECOR.codeFileName;
  const codeStack = decor?.codeStack ?? DEFAULT_DECOR.codeStack;

  /* Syntax-highlight colours cycled across the code card's array items. */
  const stackColors = ["#0EA5E9", "#10B981", "#F59E0B", "#D946EF", "#EF4444"];

  return (
    <div
      aria-hidden="true"
      /*
       * `z-0`, not `-z-10`.
       *
       * The hero section is `position: relative` with `z-index: auto`, so it
       * does not form a stacking context — a negatively-stacked child of it
       * paints in the ROOT stacking context, below every block-level
       * background on the page including `body`'s opaque yellow fill. This
       * entire layer was laid out (correct sizes, `visibility: visible`,
       * opacity 1) but was never painted.
       *
       * At `z-0` it paints inside the hero and still sits under the content
       * column, which carries `z-10`.
       */
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden select-none ${className}`}
    >
      {/* ── Editable text badges, placed into fixed slots ── */}
      {badges.slice(0, BADGE_SLOTS.length).map((badge, i) => {
        const slot = BADGE_SLOTS[i];
        if (!badge.label) return null;
        return (
          <div
            key={`${badge.label}-${i}`}
            className={[
              "absolute hidden items-center gap-2 rounded-neo border-neo-sm border-structural px-3 py-1.5",
              "font-heading text-xs font-bold uppercase tracking-wider text-structural shadow-neo-sm",
              slot.wide ? "2xl:flex" : "xl:flex",
              slot.wrapper,
              slot.rotate,
              slot.animation,
              ACCENT_BG[badge.color],
            ].join(" ")}
            style={{ animationDelay: slot.delay }}
          >
            {badge.label}
          </div>
        );
      })}

      {/* ── Mid-Left Code Snippet Card ──
          Sits at the headline's vertical band, so it needs a real gutter: at
          `xl` (1280px) it runs into the h1. Gated to `2xl`. */}
      <div
        className="absolute left-[2%] top-[46%] hidden 2xl:flex flex-col gap-1.5 rounded-neo border-neo-sm border-structural bg-surface p-3 font-body text-xs text-structural shadow-neo rotate-[-4deg] animate-float-reverse"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="flex items-center gap-1.5 border-b border-structural pb-1 font-heading text-[10px] font-bold uppercase text-structural/70">
          <span className="h-2.5 w-2.5 rounded-full bg-pink border border-structural" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary border border-structural" />
          <span className="h-2.5 w-2.5 rounded-full bg-lime border border-structural" />
          <span>{codeFileName}</span>
        </div>
        <div className="font-mono text-[11px] font-bold text-structural">
          <span className="text-[#D946EF]">const</span> stack = [
          {codeStack.map((item, i) => (
            <span key={`${item}-${i}`}>
              <span style={{ color: stackColors[i % stackColors.length] }}>
                &quot;{item}&quot;
              </span>
              {i < codeStack.length - 1 && ", "}
            </span>
          ))}
          ];
        </div>
      </div>

      {/* ── Purely geometric decoration (not editable — shape, not content) ── */}
      <span
        className="absolute left-[13%] top-[22%] hidden xl:block h-12 w-12 rounded-full border-neo-lg border-structural bg-pink shadow-neo animate-float"
        style={{ animationDelay: "1.2s" }}
      />
      <span
        className="absolute left-[4%] top-[80%] hidden xl:block h-10 w-10 rotate-12 border-neo-sm border-structural bg-cyan shadow-neo-sm animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <span
        className="absolute right-[12%] top-[24%] hidden xl:block h-14 w-14 rotate-12 border-neo-lg border-structural bg-orange shadow-neo animate-wiggle"
        style={{ animationDelay: "0.75s" }}
      />

      {/* Spinning Star SVG */}
      <div
        className="absolute right-[9%] top-[60%] hidden xl:block animate-spin-slow"
        style={{ animationDelay: "1.35s" }}
      >
        <svg
          className="h-16 w-16 drop-shadow-[4px_4px_0px_#000]"
          viewBox="0 0 24 24"
          fill="#FFDE4D"
          stroke="#000"
          strokeWidth={2}
        >
          <path d="M12 1.5 14.6 8l6.9.3-5.4 4.3 1.9 6.7L12 15.8 6 19.3l1.9-6.7-5.4-4.3L9.4 8 12 1.5Z" />
        </svg>
      </div>

      {/* Scattered glyphs & crosses */}
      <span
        className="absolute left-[18%] top-[10%] hidden xl:block text-2xl font-black text-structural/40 select-none animate-pulse-slow"
        style={{ animationDelay: "0.6s" }}
      >
        +
      </span>
      <span
        className="absolute right-[20%] top-[11%] hidden xl:block text-2xl font-black text-structural/40 select-none animate-pulse-slow"
        style={{ animationDelay: "1.2s" }}
      >
        ✕
      </span>
      <span className="absolute left-[16%] top-[74%] hidden xl:block text-3xl font-black text-structural/30 select-none">
        ✦
      </span>
      <span className="absolute right-[16%] top-[75%] hidden xl:block text-2xl font-black text-structural/40 select-none">
        +
      </span>

      {/* Mini dots */}
      <span className="absolute left-[28%] top-[12%] hidden xl:block h-3 w-3 rounded-full border border-structural bg-structural" />
      <span className="absolute right-[30%] top-[12%] hidden xl:block h-3 w-3 rounded-full border border-structural bg-pink" />
      <span className="absolute left-[26%] top-[88%] hidden xl:block h-4 w-4 rounded-full border-2 border-structural bg-lime" />
      <span className="absolute right-[26%] top-[88%] hidden xl:block h-4 w-4 rounded-full border-2 border-structural bg-cyan" />
    </div>
  );
}
