"use client";

import { useState } from "react";
import type { ProjectsSectionProps, ProjectCardData } from "@/types";
import NeobrutalistCard from "./NeobrutalistCard";
import ProjectModal from "./ProjectModal";
import Sticker from "./Sticker";

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
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-start gap-3">
          <Sticker color="bg-pink" rotate="rotate-2">
            ◆ What I build
          </Sticker>

          {/* White card so heading + description are clearly legible on the dot-grid background */}
          <div className="rounded-neo border-neo-lg border-structural bg-surface px-6 py-5 shadow-neo">
            <h2 className="font-heading text-h2 text-structural">{heading}</h2>
            <p className="mt-2 max-w-2xl font-heading text-base font-medium text-structural/80">
              A selection of systems I&apos;ve designed and built — from inventory
              tooling to data-driven agri-tech concepts.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          {projects.map((project, i) => {
            const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
            const isClickable = Boolean(project.detail);

            return (
              <div
                key={project.title}
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
                  "min-w-0",
                  isClickable ? "cursor-pointer" : "",
                ].join(" ")}
              >
                <NeobrutalistCard
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  index={String(i + 1).padStart(2, "0")}
                  accentClassName={accent}
                >
                  {/* "View Details" hint shown at card bottom when detail exists */}
                  {isClickable && (
                    <div className="mt-5 flex items-center gap-1.5 font-heading text-xs font-black uppercase tracking-widest text-structural/50 transition-colors duration-neo group-hover:text-structural">
                      <span>View Details</span>
                      <span className="transition-transform duration-neo group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  )}
                </NeobrutalistCard>
              </div>
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
