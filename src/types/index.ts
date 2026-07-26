import type { ReactNode } from "react";

/**
 * Shared TypeScript type definitions for the Neobrutalism portfolio.
 *
 * This module centralizes the data/domain models and the component prop
 * interfaces described in the design document so that components, data files,
 * and validation utilities share a single source of truth.
 */

// ---------------------------------------------------------------------------
// Data / domain models
// ---------------------------------------------------------------------------

/** Shape of the contact form's user-provided values. */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/** Per-field validation error messages for the contact form. */
export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/** A single social/contact link displayed in the Contact section. */
export interface SocialLinkData {
  platform: "github" | "linkedin" | "email";
  url: string;
  label: string;
}

/**
 * Named accent colors from the Tailwind theme.
 *
 * Editors pick a name rather than a raw class so the admin panel cannot emit a
 * class Tailwind never compiled — the names are mapped to literal utility
 * strings in `ACCENT_BG`, which keeps them visible to the JIT scanner.
 */
export type AccentColor =
  | "pink"
  | "cyan"
  | "lime"
  | "purple"
  | "orange"
  | "primary"
  | "surface";

/** All selectable accent names, in the order the admin panel lists them. */
export const ACCENT_COLORS: AccentColor[] = [
  "pink",
  "cyan",
  "lime",
  "purple",
  "orange",
  "primary",
  "surface",
];

/** Accent name → Tailwind background utility. Values must stay literal. */
export const ACCENT_BG: Record<AccentColor, string> = {
  pink: "bg-pink",
  cyan: "bg-cyan",
  lime: "bg-lime",
  purple: "bg-purple",
  orange: "bg-orange",
  primary: "bg-primary",
  surface: "bg-surface",
};

/** Accent name → hex, used for swatches in the admin panel. */
export const ACCENT_HEX: Record<AccentColor, string> = {
  pink: "#FF90E8",
  cyan: "#5CE1E6",
  lime: "#BEF264",
  purple: "#B393FF",
  orange: "#FF8A4C",
  primary: "#FFDE4D",
  surface: "#FFFFFF",
};

/** A short label chip with an accent fill (stickers, pills, badges). */
export interface LabelChip {
  label: string;
  color: AccentColor;
}

/** One tile in the About section's headline stat strip. */
export interface StatItem {
  /** Big number, e.g. "3.86" */
  value: string;
  /** Smaller trailing unit, e.g. "/4.00" or "+" */
  suffix: string;
  /** Caption under the number */
  label: string;
  /** Decorative emoji watermark */
  glyph: string;
  color: AccentColor;
}

/** Site-wide branding and SEO metadata. */
export interface SiteSettings {
  /** Nav wordmark, first part (rendered in yellow) */
  brandName: string;
  /** Nav wordmark, second part (rendered in cyan) */
  brandSuffix: string;
  /** Label of the nav's primary action button */
  navCtaLabel: string;
  /** Section id the nav CTA scrolls to */
  navCtaTarget: string;
  /** <title> for the page */
  metaTitle: string;
  /** <meta name="description"> for the page */
  metaDescription: string;
}

/** Content of the inverted page footer. */
export interface FooterContent {
  /** First line of the display headline (solid) */
  headlineTop: string;
  /** Second line of the display headline (outlined) */
  headlineOutline: string;
  /** Name shown above the blurb */
  name: string;
  /** Short paragraph under the name */
  blurb: string;
  /** Availability pill text */
  availability: string;
  /** Right-hand note in the legal bar */
  location: string;
  /** Name used in the copyright line */
  copyrightName: string;
  /** Credit suffix after the copyright name */
  credit: string;
}

/** The floating decorative badges scattered around the Hero section. */
export interface DecorContent {
  /**
   * Text badges, in fixed layout slots. Slot order is defined by
   * `DecorShapes` — index 0 is top-left, 1 is upper-left, and so on. Entries
   * beyond the available slots are ignored; missing entries hide their slot.
   */
  badges: LabelChip[];
  /** Filename shown in the floating code card's title bar */
  codeFileName: string;
  /** Array contents rendered inside the floating code card */
  codeStack: string[];
}

/** Content for a single project card in the Projects section. */
export interface ProjectCardData {
  title: string;
  description: string;
  technologies: string[];
  /** Optional — if present the card opens a detail modal */
  detail?: ProjectDetail;
}

/** Extended detail shown inside the project modal. */
export interface ProjectDetail {
  /** Preview / mockup image path (relative to /public) */
  image: string;
  /** Full-length description for the modal body */
  longDescription: string;
  /** E.g. "Completed", "In Progress", "Concept" */
  status: string;
  /** Developer role on this project */
  role: string;
  /** Duration string, e.g. "3 months" */
  duration: string;
  /** 3-5 bullet points of key highlights */
  highlights: string[];
  /** Optional live / source links */
  links?: Array<{ label: string; url: string; icon: "github" | "live" | "figma" }>;
}

/** Props for the ProjectModal component. */
export interface ProjectModalProps {
  project: ProjectCardData;
  accentClassName: string;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Component prop interfaces
// ---------------------------------------------------------------------------

/** Props for the reusable Neobrutalist button primitive. */
export interface NeobrutalistButtonProps {
  label: string;
  onClick?: () => void;
  /** If provided, the button renders as an anchor element. */
  href?: string;
  /**
   * `primary` (yellow) reads well on white surfaces but has no fill contrast
   * against the yellow page background — use `accent` for the main call to
   * action on a yellow section.
   */
  variant?: "primary" | "secondary" | "accent";
  type?: "button" | "submit";
  className?: string;
}

/** Props for the reusable Neobrutalist card primitive. */
export interface NeobrutalistCardProps {
  title: string;
  description: string;
  technologies: string[];
  className?: string;
  children?: ReactNode;
  /** Optional decorative index label shown as a corner chip (e.g. "01"). */
  index?: string;
  /** Optional Tailwind bg utility for the title bar accent (e.g. "bg-cyan"). */
  accentClassName?: string;
}

/** Props for the small technology badge primitive. */
export interface TechBadgeProps {
  label: string;
  className?: string;
}

/**
 * Props for the Hero section.
 *
 * Everything below `ctaButtons` used to be hardcoded in the component. The
 * fields are optional so a `portfolio-data.json` written before they existed
 * still loads — `portfolio-defaults.ts` fills in the original values.
 */
export interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaButtons: Array<{
    label: string;
    /** Section ID to scroll to when the button is clicked. */
    targetId: string;
  }>;
  /** Profile photo path, relative to /public */
  photo?: string;
  /** Alt text for the profile photo */
  photoAlt?: string;
  /** Eyebrow stickers above the photo */
  stickers?: LabelChip[];
  /** The two badges flanking the profile photo */
  flankingBadges?: LabelChip[];
  /** Text inside the spinning circular badge on the photo */
  rotatingBadge?: string;
  /** Tech pills under the headline */
  techPills?: LabelChip[];
  /** Availability pill text under the CTAs */
  availability?: string;
  /** Label of the scroll cue at the bottom of the hero */
  scrollCue?: string;
}

/** Props for the About section. */
export interface AboutSectionProps {
  heading: string;
  description: string;
  skills: string[];
  /** Optional quick-fact bullet items shown in the purple sidebar card. */
  quickFacts?: string[];
  /** Sticker text above the heading */
  eyebrow?: string;
  /** File-tab label on the description card */
  cardLabel?: string;
  /** Status line at the bottom of the description card */
  statusLine?: string;
  /** Heading above the skills grid */
  skillsHeading?: string;
  /** Headline number tiles */
  stats?: StatItem[];
}

/** Props for the Projects section. */
export interface ProjectsSectionProps {
  heading: string;
  projects: ProjectCardData[];
  /** Sticker text above the heading */
  eyebrow?: string;
  /** Paragraph under the heading */
  intro?: string;
}

/** Props for the Contact section. */
export interface ContactSectionProps {
  heading: string;
  socialLinks: SocialLinkData[];
  /** Sticker text above the heading */
  eyebrow?: string;
  /** Paragraph under the heading */
  intro?: string;
  /** Response-time expectation pill */
  responseTime?: string;
  /** Heading above the social links column */
  socialHeading?: string;
  /** Pull quote in the social column */
  quote?: string;
  /** Attribution under the pull quote */
  quoteAuthor?: string;
}

/** Props for the contact form. */
export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
}

/** Props for the scrolling marquee banner. */
export interface MarqueeBannerProps {
  /** The text content to scroll. */
  text: string;
  className?: string;
}

/** Props for an individual social link element. */
export interface SocialLinkProps extends SocialLinkData {
  className?: string;
}
