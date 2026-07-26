"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Navbar
 *
 * Sticky top navigation for the single-page portfolio. Previously the page had
 * no wayfinding at all — visitors could only scroll blindly through four
 * sections — so this supplies the three things that were missing:
 *
 * 1. **Persistent section links** with an active-section indicator (scrollspy),
 *    so the current location in the page is always legible.
 * 2. **A reading-progress bar** along the bottom edge of the bar, giving a
 *    sense of document length.
 * 3. **A mobile menu**, since the link row cannot fit below `md`.
 *
 * Visual treatment follows the existing Neobrutalist tokens: thick structural
 * border, hard offset shadows, flat accent fills. The bar starts transparent
 * over the hero and swaps to a solid surface once scrolled, so it never fights
 * the hero composition on first paint.
 */

type NavItem = { id: string; label: string; glyph: string; accent: string };

/** Section anchors, in document order. `home` is the hero. */
const NAV_ITEMS: NavItem[] = [
  // Not `bg-primary`: over the yellow hero the bar is transparent, so a yellow
  // active pill would have no fill contrast against the page behind it.
  { id: "home", label: "Home", glyph: "◆", accent: "bg-orange" },
  { id: "about", label: "About", glyph: "●", accent: "bg-lime" },
  { id: "projects", label: "Projects", glyph: "▲", accent: "bg-cyan" },
  { id: "contact", label: "Contact", glyph: "✉", accent: "bg-pink" },
];

/** Distance from the viewport top at which a section counts as "current". */
const SPY_OFFSET = 140;

export default function Navbar({
  brandName = "RAN",
  brandSuffix = ".dev",
  ctaLabel = "Hire Me",
  ctaTarget = "contact",
}: {
  brandName?: string;
  brandSuffix?: string;
  ctaLabel?: string;
  ctaTarget?: string;
} = {}) {
  const [activeId, setActiveId] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    /**
     * Single scroll handler drives all three pieces of derived state. A
     * position sweep is used instead of IntersectionObserver because sections
     * have very different heights — thresholds would fire inconsistently,
     * while "last section whose top has passed the offset" is exact.
     */
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, y / scrollable) : 0);

      let current = NAV_ITEMS[0].id;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= SPY_OFFSET) {
          current = item.id;
        }
      }
      // At the very bottom the last section may never cross the offset (it can
      // be shorter than the viewport), so pin the final item.
      if (scrollable > 0 && y >= scrollable - 4) {
        current = NAV_ITEMS[NAV_ITEMS.length - 1].id;
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Close the mobile menu on Escape for keyboard parity with the modal.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const goTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b-neo-lg border-structural bg-surface shadow-neo"
          : "border-b-neo-lg border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Wordmark — doubles as the "back to top" affordance */}
        <button
          onClick={() => goTo("home")}
          aria-label="Back to top"
          className="focus-neo group flex items-center gap-2 rounded-neo border-neo-sm border-structural bg-structural px-3 py-1.5 font-heading text-sm font-black uppercase tracking-tight text-primary shadow-neo-sm transition-all duration-neo hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo active:translate-x-0 active:translate-y-0 active:shadow-neo-pressed"
        >
          <span className="text-pink transition-transform duration-neo group-hover:rotate-180">
            ✦
          </span>
          {brandName}
          {brandSuffix && (
            <span className="hidden text-cyan sm:inline">{brandSuffix}</span>
          )}
        </button>

        {/* Desktop link row */}
        <ul className="hidden items-center gap-1.5 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => goTo(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "focus-neo flex items-center gap-1.5 rounded-neo border-neo-sm px-3 py-1.5",
                    "font-heading text-xs font-bold uppercase tracking-wide text-structural",
                    "transition-all duration-neo",
                    isActive
                      ? `${item.accent} border-structural shadow-neo-sm -translate-y-0.5`
                      : "border-transparent hover:border-structural hover:bg-surface hover:shadow-neo-sm",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className={isActive ? "opacity-100" : "opacity-40"}
                  >
                    {item.glyph}
                  </span>
                  {item.label}
                </button>
              </li>
            );
          })}

          {/* Primary action, visually separated from the plain links */}
          <li className="ml-2">
            <button
              onClick={() => goTo(ctaTarget)}
              className="focus-neo rounded-neo border-neo-sm border-structural bg-lime px-3 py-1.5 font-heading text-xs font-black uppercase tracking-wide text-structural shadow-neo-sm transition-all duration-neo hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo active:translate-x-0 active:translate-y-0 active:shadow-neo-pressed"
            >
              {ctaLabel} ➔
            </button>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="focus-neo flex h-11 w-11 items-center justify-center rounded-neo border-neo-sm border-structural bg-primary shadow-neo-sm transition-all duration-neo active:translate-x-0.5 active:translate-y-0.5 active:shadow-neo-pressed md:hidden"
        >
          {/* Hamburger drawn as three bars that morph into an X when open */}
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 block h-[3px] w-5 rounded-full bg-structural transition-all duration-200 ${
                menuOpen ? "top-[7px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-[3px] w-5 rounded-full bg-structural transition-all duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-[3px] w-5 rounded-full bg-structural transition-all duration-200 ${
                menuOpen ? "top-[7px] -rotate-45" : "top-[14px]"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Reading-progress rail pinned to the bar's bottom edge */}
      <div
        aria-hidden="true"
        className={`h-1.5 w-full origin-left transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="h-full bg-pink"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {/* Mobile panel */}
      {menuOpen && (
        <div
          id="mobile-nav-panel"
          className="mx-4 mt-2 origin-top animate-menu-in rounded-neo border-neo-lg border-structural bg-surface p-3 shadow-neo-xl md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => goTo(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "focus-neo flex w-full items-center gap-3 rounded-neo border-neo-sm border-structural px-4 py-3",
                      "font-heading text-sm font-bold uppercase tracking-wide text-structural",
                      "transition-all duration-neo active:translate-x-0.5 active:translate-y-0.5 active:shadow-neo-pressed",
                      isActive
                        ? `${item.accent} shadow-neo-sm`
                        : "bg-surface shadow-neo-sm",
                    ].join(" ")}
                  >
                    <span aria-hidden="true">{item.glyph}</span>
                    {item.label}
                    {isActive && (
                      <span className="ml-auto text-[10px] font-black tracking-widest">
                        ← YOU ARE HERE
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
