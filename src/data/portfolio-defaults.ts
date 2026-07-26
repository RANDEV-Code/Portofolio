import type {
  AboutSectionProps,
  ContactSectionProps,
  DecorContent,
  FooterContent,
  HeroSectionProps,
  ProjectsSectionProps,
  SiteSettings,
} from "@/types";

/**
 * Default portfolio content and the merge helper that applies it.
 *
 * Every string the page renders is editable from the admin panel, which means
 * every string can also be *absent* — from a `portfolio-data.json` written
 * before a field existed, or from a save that omitted one. Rendering `undefined`
 * would leave blank chips and empty headings scattered across the site, so each
 * field falls back to the value the component originally hardcoded.
 *
 * `withDefaults()` is deliberately shallow-per-section: it fills in missing
 * keys but never merges *into* an array. If the admin saves an empty skills
 * list, that empty list is respected rather than being repopulated with
 * defaults — otherwise deleting the last item would be impossible.
 */

export const DEFAULT_SITE: SiteSettings = {
  brandName: "RAN",
  brandSuffix: ".dev",
  navCtaLabel: "Hire Me",
  navCtaTarget: "contact",
  metaTitle: "Rico Adrian Naibaho — IT Student & Developer",
  metaDescription:
    "Portfolio of Rico Adrian Naibaho, an Information Technology student and developer focused on backend development and web development, building functional web applications and interactive systems.",
};

export const DEFAULT_HERO: Required<
  Omit<HeroSectionProps, "headline" | "subheadline" | "ctaButtons">
> = {
  photo: "/foto1.png",
  photoAlt: "Rico Adrian Naibaho — IT Developer",
  stickers: [
    { label: "★ Portfolio RANDEV", color: "cyan" },
    { label: "⚡ IT & Fullstack Dev", color: "lime" },
  ],
  flankingBadges: [
    { label: "💻 Fullstack", color: "cyan" },
    { label: "🎓 GPA 3.86", color: "lime" },
  ],
  rotatingBadge: "✦ OPEN TO WORK ✦",
  techPills: [
    { label: "PHP", color: "purple" },
    { label: "Laravel", color: "pink" },
    { label: "React", color: "cyan" },
    { label: "MySQL", color: "lime" },
    { label: "Tailwind CSS", color: "orange" },
    { label: "Unity", color: "primary" },
  ],
  availability: "Available for collaboration",
  scrollCue: "Scroll Down",
};

export const DEFAULT_ABOUT: Required<
  Omit<AboutSectionProps, "heading" | "description" | "skills" | "quickFacts">
> = {
  eyebrow: "● Who am I",
  cardLabel: "profile.md",
  statusLine: "Currently open to opportunities",
  skillsHeading: "My Tech Stack",
  stats: [
    { value: "3.86", suffix: "/4.00", label: "GPA", glyph: "🎓", color: "lime" },
    { value: "12", suffix: "+", label: "Technologies", glyph: "🧰", color: "cyan" },
    { value: "3", suffix: "+", label: "Shipped Projects", glyph: "🚀", color: "pink" },
    { value: "100", suffix: "%", label: "Remote Ready", glyph: "🌐", color: "purple" },
  ],
};

export const DEFAULT_PROJECTS: Required<
  Omit<ProjectsSectionProps, "heading" | "projects">
> = {
  eyebrow: "◆ What I build",
  intro:
    "A selection of systems I've designed and built — from inventory tooling to data-driven agri-tech concepts.",
};

export const DEFAULT_CONTACT: Required<
  Omit<ContactSectionProps, "heading" | "socialLinks">
> = {
  eyebrow: "✉ Say hello",
  intro:
    "Have an idea, a project, or just want to connect? Drop a message and I'll get back to you.",
  responseTime: "Usually replies within 24 hours",
  socialHeading: "Find me online",
  quote: "Build functional things, ship them, iterate.",
  quoteAuthor: "Rico Adrian Naibaho",
};

export const DEFAULT_FOOTER: FooterContent = {
  headlineTop: "Let's build",
  headlineOutline: "something great",
  name: "Rico Adrian Naibaho",
  blurb:
    "Informatics Engineering graduate building functional web applications and interactive systems.",
  availability: "Open to opportunities",
  location: "Made in Makassar, Indonesia 🇮🇩",
  copyrightName: "Rico Adrian Naibaho",
  credit: "Built with Next.js & Tailwind CSS",
};

export const DEFAULT_DECOR: DecorContent = {
  badges: [
    { label: "📍 MAKASSAR, INDONESIA", color: "surface" },
    { label: "🎓 GPA 3.86 / 4.00", color: "lime" },
    { label: "⚡ Fullstack Developer", color: "purple" },
    { label: "⚡ SYSTEM ARCHITECTURE", color: "primary" },
    { label: "🚀 FAST SHIPPED CODE", color: "cyan" },
    { label: "🔥 100% PASSION FOR CODE", color: "pink" },
    { label: "✨ CREATIVE MIND", color: "lime" },
  ],
  codeFileName: "dev-mode.ts",
  codeStack: ["PHP", "Laravel", "React"],
};

/**
 * Overlay `value` onto `fallback`, keeping the fallback wherever the source is
 * missing or null.
 *
 * Iterates the keys of `fallback`, not of `value`: only fields the defaults
 * actually declare are copied across, so stale or unknown keys left in the JSON
 * by an older schema are dropped instead of leaking into the render.
 */
function fill<T extends object>(value: unknown, fallback: T): T {
  const out = { ...fallback };
  if (!value || typeof value !== "object") return out;

  const src = value as Record<string, unknown>;
  for (const key of Object.keys(fallback) as Array<keyof T & string>) {
    const v = src[key];
    if (v !== undefined && v !== null) out[key] = v as T[keyof T & string];
  }
  return out;
}

/** The shape stored in `portfolio-data.json` — every section optional. */
export interface RawPortfolioData {
  site?: Partial<SiteSettings>;
  hero?: Partial<HeroSectionProps>;
  about?: Partial<AboutSectionProps>;
  projects?: Partial<ProjectsSectionProps>;
  contact?: Partial<ContactSectionProps>;
  footer?: Partial<FooterContent>;
  decor?: Partial<DecorContent>;
  marqueeText?: string;
}

/** The fully-resolved shape the page renders from. */
export interface ResolvedPortfolioData {
  site: SiteSettings;
  hero: HeroSectionProps;
  about: AboutSectionProps;
  projects: ProjectsSectionProps;
  contact: ContactSectionProps;
  footer: FooterContent;
  decor: DecorContent;
  marqueeText: string;
}

/** Apply defaults to a raw parsed `portfolio-data.json`. */
export function withDefaults(raw: RawPortfolioData): ResolvedPortfolioData {
  return {
    site: fill(raw.site, DEFAULT_SITE),
    // The spread comes first and the required fields last, so a key the raw
    // data does define always wins over whatever `fill` copied across.
    hero: {
      ...fill(raw.hero, DEFAULT_HERO),
      headline: raw.hero?.headline ?? "",
      subheadline: raw.hero?.subheadline ?? "",
      ctaButtons: raw.hero?.ctaButtons ?? [],
    },
    about: {
      ...fill(raw.about, DEFAULT_ABOUT),
      heading: raw.about?.heading ?? "",
      description: raw.about?.description ?? "",
      skills: raw.about?.skills ?? [],
      quickFacts: raw.about?.quickFacts ?? [],
    },
    projects: {
      ...fill(raw.projects, DEFAULT_PROJECTS),
      heading: raw.projects?.heading ?? "",
      projects: raw.projects?.projects ?? [],
    },
    contact: {
      ...fill(raw.contact, DEFAULT_CONTACT),
      heading: raw.contact?.heading ?? "",
      socialLinks: raw.contact?.socialLinks ?? [],
    },
    footer: fill(raw.footer, DEFAULT_FOOTER),
    decor: fill(raw.decor, DEFAULT_DECOR),
    marqueeText: raw.marqueeText ?? "",
  };
}
