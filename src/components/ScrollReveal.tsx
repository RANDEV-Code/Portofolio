"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * ScrollReveal
 *
 * Wraps a block of content and fades/slides it in the first time it enters the
 * viewport. The page previously rendered every section fully formed on load,
 * which made a long scroll feel static — a short entrance gives each section a
 * beat of its own without turning into a scroll-jacking effect.
 *
 * Notes:
 * - Reveals once, then unobserves. Content never re-hides on scroll-back.
 * - `data-reveal` is targeted by a `prefers-reduced-motion` rule in
 *   `globals.css` that forces the element visible, so motion-sensitive users
 *   are never left with blank sections.
 * - A `<noscript>` override in `layout.tsx` does the same for JS-off visitors.
 * - `delay` staggers siblings (e.g. a row of cards) in milliseconds.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  /** Stagger offset in ms, applied as an animation-delay. */
  delay?: number;
  className?: string;
  /** Element tag to render — use `li`/`section` where semantics require it. */
  as?: "div" | "li" | "section";
}) {
  /*
   * All three permitted tags accept the same props we pass (className, style,
   * ref), so the tag name is narrowed to "div" for JSX's benefit. Without this
   * the union makes the `ref` and prop types resolve to `never`.
   */
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Elements already in view on first paint (above the fold) should reveal
    // immediately rather than waiting for a scroll event.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      // Trigger slightly before the element is fully on screen so the motion
      // finishes about when the reader arrives at it.
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={visible && delay ? { animationDelay: `${delay}ms` } : undefined}
      className={[
        visible ? "animate-reveal-up opacity-0" : "opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
