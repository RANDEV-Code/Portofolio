"use client";

import { useState } from "react";
import type { ProjectsSectionProps, ProjectCardData } from "@/types";
import ProjectForm from "./ProjectForm";

interface ProjectsEditorProps {
  data: ProjectsSectionProps;
  onChange: (data: ProjectsSectionProps) => void;
}

type EditingState =
  | { mode: "none" }
  | { mode: "add" }
  | { mode: "edit"; index: number };

const ACCENT_COLORS = ["#5CE1E6", "#FF90E8", "#BEF264", "#FF8A4C"];

export default function ProjectsEditor({ data, onChange }: ProjectsEditorProps) {
  const [editing, setEditing] = useState<EditingState>({ mode: "none" });

  function saveProject(project: ProjectCardData) {
    let projects: ProjectCardData[];
    if (editing.mode === "add") {
      projects = [...data.projects, project];
    } else if (editing.mode === "edit") {
      projects = data.projects.map((p, i) => (i === editing.index ? project : p));
    } else {
      return;
    }
    onChange({ ...data, projects });
    setEditing({ mode: "none" });
  }

  function deleteProject(index: number) {
    if (!confirm("Hapus project ini?")) return;
    onChange({ ...data, projects: data.projects.filter((_, i) => i !== index) });
  }

  function moveProject(index: number, dir: -1 | 1) {
    const projects = [...data.projects];
    const target = index + dir;
    if (target < 0 || target >= projects.length) return;
    [projects[index], projects[target]] = [projects[target], projects[index]];
    onChange({ ...data, projects });
  }

  if (editing.mode !== "none") {
    const initial =
      editing.mode === "edit" ? data.projects[editing.index] : undefined;
    return (
      <div>
        <button
          onClick={() => setEditing({ mode: "none" })}
          className="mb-4 flex items-center gap-1.5 font-['var(--font-space-grotesk)'] text-xs font-bold uppercase text-white/50 hover:text-white"
        >
          ← Back to list
        </button>
        <h2 className="mb-5 font-['var(--font-space-grotesk)'] text-base font-black uppercase text-white">
          {editing.mode === "add" ? "New Project" : "Edit Project"}
        </h2>
        <ProjectForm
          initial={initial}
          onSave={saveProject}
          onCancel={() => setEditing({ mode: "none" })}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Project list */}
      {data.projects.length === 0 && (
        <p className="font-['var(--font-jetbrains-mono)'] text-sm text-white/40">
          Belum ada project. Klik &quot;+ Add Project&quot; untuk menambahkan.
        </p>
      )}

      {data.projects.map((project, i) => {
        const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
        return (
          <div
            key={i}
            className="flex items-start gap-4 rounded-[6px] p-4"
            style={{ border: "3px solid rgba(255,255,255,0.15)", background: "#1a1a1a" }}
          >
            {/* Accent bar */}
            <div
              className="mt-1 h-10 w-2 shrink-0 rounded-sm"
              style={{ background: accent, border: "2px solid #000" }}
            />

            <div className="flex-1 min-w-0">
              <p className="font-['var(--font-space-grotesk)'] text-sm font-black text-white">
                {project.title || <span className="text-white/30">Untitled</span>}
              </p>
              <p className="mt-0.5 truncate font-['var(--font-jetbrains-mono)'] text-xs text-white/40">
                {project.technologies.join(" · ") || "No technologies"}
              </p>
              {project.detail?.status && (
                <span
                  className="mt-2 inline-block rounded-[4px] px-2 py-0.5 font-['var(--font-space-grotesk)'] text-[10px] font-black uppercase"
                  style={{ background: accent, border: "2px solid #000", color: "#000" }}
                >
                  {project.detail.status}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => moveProject(i, -1)}
                disabled={i === 0}
                className="rounded px-2 py-1 text-white/40 hover:text-white disabled:opacity-20"
                aria-label="Move up"
              >↑</button>
              <button
                onClick={() => moveProject(i, 1)}
                disabled={i === data.projects.length - 1}
                className="rounded px-2 py-1 text-white/40 hover:text-white disabled:opacity-20"
                aria-label="Move down"
              >↓</button>
              <button
                onClick={() => setEditing({ mode: "edit", index: i })}
                className="rounded-[6px] px-3 py-1.5 font-['var(--font-space-grotesk)'] text-xs font-bold uppercase text-white/70 transition-colors hover:text-white"
                style={{ border: "2px solid rgba(255,255,255,0.2)" }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteProject(i)}
                className="rounded-[6px] px-3 py-1.5 font-['var(--font-space-grotesk)'] text-xs font-bold uppercase text-red-400/70 transition-colors hover:text-red-400"
                style={{ border: "2px solid rgba(239,68,68,0.3)" }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

      {/* Add button */}
      <button
        onClick={() => setEditing({ mode: "add" })}
        className="mt-2 flex items-center justify-center gap-2 rounded-[6px] py-3 font-['var(--font-space-grotesk)'] text-sm font-black uppercase tracking-wide text-[#FFDE4D] transition-all hover:bg-white/5"
        style={{ border: "3px dashed rgba(255,222,77,0.5)" }}
      >
        + Add New Project
      </button>
    </div>
  );
}
