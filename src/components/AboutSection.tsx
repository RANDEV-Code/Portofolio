import type { AboutSectionProps } from "@/types";
import TechBadge from "./TechBadge";
import Sticker from "./Sticker";

/**
 * AboutSection
 *
 * The "About Me" content section. It presents an eyebrow sticker, a heading
 * (`h2`), a short profile description card, and a tech stack grid composed of
 * {@link TechBadge} elements — one badge per provided skill, each tinted with a
 * rotating accent color for a livelier, less "plain" look.
 *
 * This is a pure presentational, server-renderable component (no client-side
 * interactivity is required).
 *
 * The tech stack uses a responsive grid that follows the Requirement 8
 * breakpoints: a single-column stack on mobile (< 768px), a two-column grid on
 * tablet (`md`, 768–1023px), and a multi-column (4-up) grid on desktop (`lg`,
 * ≥ 1024px). Content is constrained with `max-w-7xl mx-auto` and horizontal
 * padding so it never touches the viewport edge.
 */

/** Accent colors cycled across the tech badges for visual variety. */
const BADGE_ACCENTS = [
  "bg-pink",
  "bg-cyan",
  "bg-lime",
  "bg-purple",
  "bg-orange",
  "bg-surface",
];

/** Slight alternating rotations so the badge grid feels hand-placed. */
const BADGE_ROTATIONS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function AboutSection({
  heading,
  description,
  skills,
  quickFacts,
}: AboutSectionProps) {
  const facts = quickFacts ?? [
    "IT Student & Developer",
    "Backend & web architecture",
    "Inventory & agri-tech systems",
    "Always shipping side projects",
  ];
  return (
    <section id="about" className="relative overflow-hidden bg-grid">
      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="flex flex-col items-start gap-3">
          <Sticker color="bg-lime" rotate="-rotate-2">
            ● Who am I
          </Sticker>
          <h2 className="font-heading text-h2 text-structural">{heading}</h2>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Profile description card */}
          <p className="border-neo-lg border-structural rounded-neo bg-surface p-6 font-body text-structural shadow-neo text-justify">
            {description}
          </p>

          {/* Quick-facts mini card. Uses div rows (not ul/li) so the skills
              grid below remains the only list in this section. */}
          <div className="border-neo-lg border-structural rounded-neo bg-purple p-6 font-body text-structural shadow-neo">
            <p className="font-heading text-lg font-bold uppercase">Quick facts</p>
            <div className="mt-3 space-y-2 text-sm">
              {facts.map((fact, i) => (
                <p key={i}>▹ {fact}</p>
              ))}
            </div>
          </div>
        </div>

        {skills.length > 0 && (
          <>
            <p className="mt-12 font-heading text-lg font-bold uppercase tracking-wide text-structural">
              My Tech Stack
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {skills.map((skill, i) => (
                <li key={skill}>
                  <TechBadge
                    label={skill}
                    className={`block w-full text-center ${
                      BADGE_ACCENTS[i % BADGE_ACCENTS.length]
                    } ${BADGE_ROTATIONS[i % BADGE_ROTATIONS.length]} hover:rotate-0`}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
