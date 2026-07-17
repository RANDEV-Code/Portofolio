"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { ProjectModalProps } from "@/types";
import TechBadge from "./TechBadge";

/**
 * ProjectModal
 *
 * A full-screen overlay modal that displays extended project detail.
 * Renders a project preview image, meta information grid (status / role /
 * duration), a long-form description, key highlights, the technology stack,
 * and optional action links — all styled with Neobrutalism design tokens.
 *
 * Accessibility:
 * - Uses role="dialog" with aria-modal and aria-labelledby.
 * - Closes on Escape key and backdrop click.
 * - Focuses the close button on mount for keyboard users.
 * - Body scroll is locked while the modal is open.
 */
export default function ProjectModal({
  project,
  accentClassName,
  onClose,
}: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { detail } = project;

  // Lock body scroll and focus close button on open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!detail) return null;

  const iconSvg = {
    github: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    live: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
    figma: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M15.332 8.668a3.333 3.333 0 000-6.663H8.668a3.333 3.333 0 000 6.663 3.333 3.333 0 000 6.665 3.333 3.333 0 103.332 3.332V8.668h3.332z" />
        <circle cx="15.332" cy="8.668" r="3.332" />
      </svg>
    ),
  };

  const statusColor: Record<string, string> = {
    Completed: "bg-lime",
    "Concept / In Progress": "bg-orange",
    "In Progress": "bg-cyan",
    Concept: "bg-purple",
  };
  const pillColor = statusColor[detail.status] ?? "bg-primary";

  return (
    /* Backdrop */
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-structural/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-neo border-neo-lg border-structural bg-surface shadow-neo-xl animate-modal-in">

        {/* ── Header bar ── */}
        <div className={`flex items-center justify-between border-b-neo-lg border-structural px-6 py-4 ${accentClassName}`}>
          <span className="font-heading text-xs font-black uppercase tracking-widest text-structural">
            ◆ Project Detail
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-neo border-neo-sm border-structural bg-surface font-heading text-lg font-black text-structural shadow-neo-sm transition-all duration-neo hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-structural"
          >
            ✕
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto">
          {/* Project image */}
          <div className="relative h-52 w-full border-b-neo-lg border-structural sm:h-64">
            <Image
              src={detail.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <div className="p-6 sm:p-8">
            {/* Title + status pill */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2
                id="modal-title"
                className="font-heading text-h3 text-structural"
              >
                {project.title}
              </h2>
              <span
                className={`shrink-0 rounded-neo border-neo-sm border-structural px-3 py-1 font-heading text-xs font-black uppercase tracking-wide text-structural shadow-neo-sm ${pillColor}`}
              >
                {detail.status}
              </span>
            </div>

            {/* Meta grid */}
            <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { label: "Role", value: detail.role },
                { label: "Duration", value: detail.duration },
                { label: "Stack", value: `${project.technologies.length} technologies` },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-neo border-neo-sm border-structural bg-primary px-4 py-3 shadow-neo-sm"
                >
                  <dt className="font-heading text-[10px] font-black uppercase tracking-widest text-structural/60">
                    {label}
                  </dt>
                  <dd className="mt-1 font-heading text-sm font-bold text-structural">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Description */}
            <p className="mt-6 font-body text-body text-structural">
              {detail.longDescription}
            </p>

            {/* Highlights */}
            <div className="mt-6">
              <h3 className="font-heading text-sm font-black uppercase tracking-widest text-structural">
                Key Highlights
              </h3>
              <ul className="mt-3 space-y-2">
                {detail.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-neo border-neo-sm border-structural bg-primary/30 px-4 py-2 font-body text-sm text-structural"
                  >
                    <span className="mt-0.5 shrink-0 font-heading font-black text-structural">
                      ◆
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div className="mt-6">
              <h3 className="font-heading text-sm font-black uppercase tracking-widest text-structural">
                Tech Stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} label={tech} />
                ))}
              </div>
            </div>

            {/* Action links */}
            {detail.links && detail.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {detail.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-neo border-neo-lg border-structural bg-structural px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-primary shadow-neo transition-all duration-neo hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {iconSvg[link.icon]}
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
