"use client";

import { useState } from "react";
import type { ProjectsSectionProps, ProjectCardData } from "@/types";
import NeobrutalistCard from "./NeobrutalistCard";
import ProjectModal from "./ProjectModal";
import Sticker from "./Sticker";
import ScrollReveal from "./ScrollReveal";
import { DEFAULT_PROJECTS } from "@/data/portfolio-defaults";

/**
 * ProjectsSection
 *
 * Renders the "Projects" showcase area of the portfolio. Each project card is
 * now clickable — clicking (or pressing Enter/Space on keyboard) opens a
 * `ProjectModal` with extended project detail: image, status, role, duration,
 * highlights, tech stack, and action links.
 *
 * State: `selectedProject` holds the currently-open project (null = closed).
 * This section is a client component because it needs useState to manage the
 * modal open/close state.
 */

/** Title-bar accent colors cycled across the project cards. */
const CARD_ACCENTS = ["bg-cyan", "bg-pink", "bg-lime", "bg-orange"];

export default function ProjectsSection({
  heading,
  projects,
  eyebrow,
  intro,
}: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<{
    project: ProjectCardData;
    accent: string;
  } | null>(null);

  const openModal = (project: ProjectCardData, accent: string) => {
    if (project.detail) setSelectedProject({ project, accent });
  };

  const closeModal = () => setSelectedProject(null);

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-y-neo-lg border-structural bg-primary bg-dots px-6 py-20"
    >
      {/* Oversized outlined watermark, mirroring the About section treatment */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 top-10 hidden select-none font-heading text-[9rem] font-black leading-none text-outline opacity-[0.08] lg:block"
      >
        WORK
      </span>

      <div className="relative mx-auto w-full max-w-7xl">
        <ScrollReveal>
          <div className="flex flex-col items-start gap-3">
            <Sticker color="bg-pink" rotate="rotate-2">
              {eyebrow ?? DEFAULT_PROJECTS.eyebrow}
            </Sticker>

            {/* White card so heading + description are clearly legible on the dot-grid background */}
            <div className="relative overflow-hidden rounded-neo border-neo-lg border-structural bg-surface px-6 py-5 shadow-neo">
              {/* Accent rail down the left edge of the heading card */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-3 bg-cyan"
              />
              <div className="pl-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-heading text-h2 text-structural">
                    {heading}
                  </h2>
                  <span className="rounded-full border-neo-sm border-structural bg-structural px-3 py-0.5 font-heading text-xs font-black text-primary">
                    {projects.length} CASE {projects.length === 1 ? "STUDY" : "STUDIES"}
                  </span>
                </div>
                <p className="mt-2 max-w-2xl font-heading text-base font-medium text-structural/80">
                  {intro ?? DEFAULT_PROJECTS.intro}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          {projects.map((project, i) => {
            const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
            const isClickable = Boolean(project.detail);
            /*
             * With an odd number of projects the two-column grid always left a
             * lone card stranded on the final row. Promoting the first project
             * to a full-width "featured" card absorbs the odd one out and
             * simultaneously establishes a hierarchy — the lead project reads
             * as the headline piece instead of one of N equals.
             */
            const isFeatured = i === 0 && projects.length % 2 === 1;

            return (
              <ScrollReveal
                key={project.title}
                delay={Math.min(i, 4) * 90}
                className={`h-full min-w-0 ${isFeatured ? "md:col-span-2" : ""}`}
              >
                <div
                  role={isClickable ? "button" : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  aria-label={
                    isClickable ? `View details for ${project.title}` : undefined
                  }
                  onClick={() => openModal(project, accent)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openModal(project, accent);
                    }
                  }}
                  className={[
                    "focus-neo relative h-full min-w-0 rounded-neo",
                    isClickable ? "cursor-pointer" : "",
                  ].join(" ")}
                >
                  {/* Featured ribbon, rotated out over the card's top corner */}
                  {isFeatured && (
                    <span className="absolute -left-2 -top-3 z-10 -rotate-3 rounded-neo border-neo-sm border-structural bg-structural px-3 py-1 font-heading text-[10px] font-black uppercase tracking-widest text-primary shadow-neo-sm">
                      ★ Featured build
                    </span>
                  )}

                  <NeobrutalistCard
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    index={String(i + 1).padStart(2, "0")}
                    accentClassName={accent}
                    className="h-full"
                  >
                    {/* "View Details" hint shown at card bottom when detail exists */}
                    {isClickable && (
                      <div className="mt-5 inline-flex items-center gap-1.5 rounded-neo border-neo-sm border-structural bg-primary px-3 py-1.5 font-heading text-xs font-black uppercase tracking-widest text-structural shadow-neo-sm transition-all duration-neo group-hover:-translate-y-0.5 group-hover:bg-lime group-hover:shadow-neo">
                        <span>View Details</span>
                        <span className="transition-transform duration-neo group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    )}
                  </NeobrutalistCard>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Project detail modal — rendered outside the grid to avoid overflow clipping */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject.project}
          accentClassName={selectedProject.accent}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
