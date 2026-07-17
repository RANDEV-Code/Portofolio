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
  variant?: "primary" | "secondary";
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

/** Props for the Hero section. */
export interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaButtons: Array<{
    label: string;
    /** Section ID to scroll to when the button is clicked. */
    targetId: string;
  }>;
}

/** Props for the About section. */
export interface AboutSectionProps {
  heading: string;
  description: string;
  skills: string[];
  /** Optional quick-fact bullet items shown in the purple sidebar card. */
  quickFacts?: string[];
}

/** Props for the Projects section. */
export interface ProjectsSectionProps {
  heading: string;
  projects: ProjectCardData[];
}

/** Props for the Contact section. */
export interface ContactSectionProps {
  heading: string;
  socialLinks: SocialLinkData[];
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
