import type {
  AboutSectionProps,
  ContactSectionProps,
  HeroSectionProps,
  ProjectsSectionProps,
} from "@/types";
import rawData from "./portfolio-data.json";

/**
 * Portfolio content loaded from `portfolio-data.json`.
 *
 * The JSON file is the single source of truth — it is written by the admin
 * panel API route (`/api/admin/data`) and read here at request time by the
 * Next.js server component. Casting through `unknown` is intentional: the JSON
 * shape is validated by the admin API before writes, so we trust it here.
 */

export const heroData = rawData.hero as HeroSectionProps;
export const aboutData = rawData.about as AboutSectionProps;
export const projectsData = rawData.projects as ProjectsSectionProps;
export const contactData = rawData.contact as ContactSectionProps;
export const marqueeText: string = rawData.marqueeText;
