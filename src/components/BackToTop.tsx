"use client";

import { useEffect, useState } from "react";

/**
 * BackToTop
 *
 * A floating return-to-top control that appears after the reader has scrolled
 * past roughly one viewport. On a long single-page portfolio the only way back
 * to the hero was a manual scroll — this removes that dead-end, and doubles as
 * a persistent visual anchor in the lower-right corner.
 *
 * Hidden from assistive tech only when off-screen (it is removed from the DOM),
 * so there is no focusable-but-invisible control.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="focus-neo group fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-neo border-neo-lg border-structural bg-primary shadow-neo transition-all duration-neo hover:-translate-y-1 hover:bg-pink hover:shadow-neo-hover active:translate-y-0 active:shadow-neo-pressed sm:h-14 sm:w-14"
    >
      <span
        aria-hidden="true"
        className="font-heading text-xl font-black text-structural transition-transform duration-neo group-hover:-translate-y-0.5"
      >
        ↑
      </span>
    </button>
  );
}
