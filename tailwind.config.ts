import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFDE4D", // Yellow background
        surface: "#FFFFFF", // Card surfaces
        structural: "#000000", // Borders, shadows, text
        // Neobrutalism accent palette — high-saturation pops used for
        // decorative shapes, badges, stickers, and card accents.
        pink: "#FF90E8",
        cyan: "#5CE1E6",
        lime: "#BEF264",
        purple: "#B393FF",
        orange: "#FF8A4C",
        blue: "#4D9FFF",
        red: "#FF5A5A",
        // Warm off-white used as an alternate surface so consecutive white
        // cards/sections do not read as one flat plane.
        cream: "#FFF6E0",
        // Deep ink used for inverted panels (footer, marquee, nav on scroll).
        ink: "#111111",
      },
      borderWidth: {
        "neo-sm": "3px", // Small elements (badges, inputs)
        "neo-lg": "4px", // Large elements (cards, buttons)
      },
      borderRadius: {
        neo: "6px", // Standard Neobrutalism radius (4-8px range)
      },
      boxShadow: {
        "neo-sm": "3px 3px 0px 0px #000000", // Compact hard shadow
        neo: "5px 5px 0px 0px #000000", // Default hard shadow
        "neo-hover": "9px 9px 0px 0px #000000", // Hover/focus expanded shadow
        "neo-xl": "10px 10px 0px 0px #000000", // Feature/hero hard shadow
        // Pressed state — shadow collapses so the element reads as pushed in.
        "neo-pressed": "0px 0px 0px 0px #000000",
        // Layered "double" shadows: a colored slab outlined in black. Gives the
        // flat Neobrutalist surfaces a second plane of depth without gradients.
        "neo-pink": "5px 5px 0px 0px #FF90E8, 5px 5px 0px 3px #000000",
        "neo-cyan": "5px 5px 0px 0px #5CE1E6, 5px 5px 0px 3px #000000",
        "neo-lime": "5px 5px 0px 0px #BEF264, 5px 5px 0px 3px #000000",
        "neo-purple": "5px 5px 0px 0px #B393FF, 5px 5px 0px 3px #000000",
        "neo-pink-hover": "9px 9px 0px 0px #FF90E8, 9px 9px 0px 3px #000000",
        "neo-cyan-hover": "9px 9px 0px 0px #5CE1E6, 9px 9px 0px 3px #000000",
        "neo-lime-hover": "9px 9px 0px 0px #BEF264, 9px 9px 0px 3px #000000",
        "neo-purple-hover": "9px 9px 0px 0px #B393FF, 9px 9px 0px 3px #000000",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "h1-mobile": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "h1-desktop": ["48px", { lineHeight: "1.1", fontWeight: "700" }],
        h2: ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        h3: ["24px", { lineHeight: "1.3", fontWeight: "700" }],
        body: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
      },
      transitionDuration: {
        neo: "150ms",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(12px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        "pulse-slow": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "modal-in": {
          "0%": { opacity: "0", transform: "scale(0.93) translateY(12px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        // Scroll-reveal entrance used by <ScrollReveal>.
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Nav bar drops in once the page is scrolled past the hero.
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Mobile nav panel expansion.
        "menu-in": {
          "0%": { opacity: "0", transform: "translateY(-8px) scaleY(0.9)" },
          "100%": { opacity: "1", transform: "translateY(0) scaleY(1)" },
        },
        // Terminal-style caret used in the About stat strip.
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        // Diagonal light sweep across a surface (hover treat on feature cards).
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        "marquee-reverse": "marquee-reverse 20s linear infinite",
        float: "float 4s ease-in-out infinite",
        "float-reverse": "float-reverse 4.5s ease-in-out infinite",
        wiggle: "wiggle 2.8s ease-in-out infinite",
        "spin-slow": "spin-slow 9s linear infinite",
        "pulse-dot": "pulse-dot 1.4s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        "modal-in": "modal-in 0.2s ease-out forwards",
        "reveal-up": "reveal-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-down": "slide-down 0.25s ease-out forwards",
        "menu-in": "menu-in 0.18s ease-out forwards",
        blink: "blink 1.1s steps(1) infinite",
        shimmer: "shimmer 1.1s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
