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
        "modal-in": {
          "0%": { opacity: "0", transform: "scale(0.93) translateY(12px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        "marquee-reverse": "marquee-reverse 20s linear infinite",
        float: "float 4s ease-in-out infinite",
        wiggle: "wiggle 2.8s ease-in-out infinite",
        "spin-slow": "spin-slow 9s linear infinite",
        "pulse-dot": "pulse-dot 1.4s ease-in-out infinite",
        "modal-in": "modal-in 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
