"use client";

import { useState } from "react";
import type { ProjectCardData, ProjectDetail } from "@/types";

interface ProjectFormProps {
  initial?: ProjectCardData;
  onSave: (data: ProjectCardData) => void;
  onCancel: () => void;
}

const inputCls =
  "w-full rounded-[6px] bg-[#0f0f0f] px-4 py-3 font-['var(--font-jetbrains-mono)'] text-sm text-white placeholder-white/30 outline-none transition-shadow focus:shadow-[0_0_0_3px_#FFDE4D]";
const inputStyle = { border: "3px solid rgba(255,255,255,0.2)" };
const labelCls =
  "mb-1.5 block font-['var(--font-space-grotesk)'] text-xs font-bold uppercase tracking-wider text-white/60";

const STATUS_OPTIONS = [
  "Completed",
  "In Progress",
  "Concept / In Progress",
  "Concept",
  "On Hold",
];

const BLANK_DETAIL: ProjectDetail = {
  image: "",
  longDescription: "",
  status: "Completed",
  role: "",
  duration: "",
  highlights: [""],
  links: [],
};

const BLANK: ProjectCardData = {
  title: "",
  description: "",
  technologies: [],
  detail: { ...BLANK_DETAIL },
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="border-b-2 border-white/10 pb-2 font-['var(--font-space-grotesk)'] text-xs font-black uppercase tracking-widest text-[#FFDE4D]">
      {children}
    </h3>
  );
}

export default function ProjectForm({ initial, onSave, onCancel }: ProjectFormProps) {
  const [form, setForm] = useState<ProjectCardData>(
    initial ? JSON.parse(JSON.stringify(initial)) : BLANK
  );
  const [techInput, setTechInput] = useState("");

  const detail = form.detail ?? { ...BLANK_DETAIL };

  function setDetail(patch: Partial<ProjectDetail>) {
    setForm((f) => ({ ...f, detail: { ...(f.detail ?? BLANK_DETAIL), ...patch } }));
  }

  /* ── Technologies ── */
  function addTech() {
    const t = techInput.trim();
    if (!t) return;
    if (!form.technologies.includes(t)) {
      setForm((f) => ({ ...f, technologies: [...f.technologies, t] }));
    }
    setTechInput("");
  }

  function removeTech(tech: string) {
    setForm((f) => ({ ...f, technologies: f.technologies.filter((t) => t !== tech) }));
  }

  /* ── Highlights ── */
  function updateHighlight(i: number, val: string) {
    const hl = [...(detail.highlights ?? [])];
    hl[i] = val;
    setDetail({ highlights: hl });
  }

  function addHighlight() {
    setDetail({ highlights: [...(detail.highlights ?? []), ""] });
  }

  function removeHighlight(i: number) {
    setDetail({ highlights: (detail.highlights ?? []).filter((_, j) => j !== i) });
  }

  /* ── Links ── */
  function updateLink(i: number, field: string, val: string) {
    const links = [...(detail.links ?? [])];
    links[i] = { ...links[i], [field]: val };
    setDetail({ links });
  }

  function addLink() {
    setDetail({ links: [...(detail.links ?? []), { label: "", url: "", icon: "github" as const }] });
  }

  function removeLink(i: number) {
    setDetail({ links: (detail.links ?? []).filter((_, j) => j !== i) });
  }

  /* ── Submit ── */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...form, detail });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* ── Basic Info ── */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Basic Info</SectionTitle>

        <div>
          <label className={labelCls}>Project Title *</label>
          <input required style={inputStyle} className={inputCls} value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="My Awesome Project" />
        </div>

        <div>
          <label className={labelCls}>Short Description *</label>
          <textarea required rows={2} style={inputStyle} className={`${inputCls} resize-none`}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="One or two line summary..." />
        </div>

        {/* Technologies */}
        <div>
          <label className={labelCls}>Technologies</label>
          <div className="mb-2 flex flex-wrap gap-2">
            {form.technologies.map((t) => (
              <span key={t} className="flex items-center gap-1 rounded-[4px] px-2.5 py-1 font-['var(--font-space-grotesk)'] text-xs font-bold text-black"
                style={{ background: "#FFDE4D", border: "2px solid #000" }}>
                {t}
                <button type="button" onClick={() => removeTech(t)} className="ml-1 text-black/50 hover:text-black">✕</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input style={inputStyle} className={`${inputCls} flex-1`} value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
              placeholder="Laravel, PHP, MySQL..." />
            <button type="button" onClick={addTech}
              className="rounded-[6px] px-4 py-2 font-['var(--font-space-grotesk)'] text-xs font-black uppercase text-black"
              style={{ background: "#FFDE4D", border: "3px solid #fff" }}>+ Add</button>
          </div>
        </div>
      </div>

      {/* ── Detail ── */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Detail (Modal)</SectionTitle>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className={labelCls}>Status</label>
            <select style={inputStyle} className={`${inputCls} cursor-pointer`}
              value={detail.status}
              onChange={(e) => setDetail({ status: e.target.value })}>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s} style={{ background: "#111" }}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Role</label>
            <input style={inputStyle} className={inputCls} value={detail.role}
              onChange={(e) => setDetail({ role: e.target.value })} placeholder="Full-Stack Developer" />
          </div>
          <div>
            <label className={labelCls}>Duration</label>
            <input style={inputStyle} className={inputCls} value={detail.duration}
              onChange={(e) => setDetail({ duration: e.target.value })} placeholder="3 months" />
          </div>
        </div>

        <div>
          <label className={labelCls}>Preview Image Path</label>
          <input style={inputStyle} className={inputCls} value={detail.image}
            onChange={(e) => setDetail({ image: e.target.value })}
            placeholder="/project-myapp.png" />
          <p className="mt-1 font-['var(--font-jetbrains-mono)'] text-[11px] text-white/30">
            Letakkan file gambar di folder /public lalu tulis path-nya di sini.
          </p>
        </div>

        <div>
          <label className={labelCls}>Long Description</label>
          <textarea rows={4} style={inputStyle} className={`${inputCls} resize-none`}
            value={detail.longDescription}
            onChange={(e) => setDetail({ longDescription: e.target.value })}
            placeholder="Detailed description shown inside the modal..." />
        </div>

        {/* Highlights */}
        <div>
          <label className={labelCls}>Key Highlights</label>
          <div className="flex flex-col gap-2">
            {(detail.highlights ?? []).map((hl, i) => (
              <div key={i} className="flex gap-2">
                <input style={inputStyle} className={`${inputCls} flex-1`} value={hl}
                  onChange={(e) => updateHighlight(i, e.target.value)}
                  placeholder={`Highlight ${i + 1}`} />
                <button type="button" onClick={() => removeHighlight(i)}
                  className="rounded-[6px] px-3 py-2 font-bold text-red-400 transition-colors hover:text-red-300"
                  style={{ border: "2px solid rgba(239,68,68,0.3)" }}>✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addHighlight}
            className="mt-2 rounded-[6px] px-4 py-2 font-['var(--font-space-grotesk)'] text-xs font-bold uppercase text-white/60 transition-colors hover:text-white"
            style={{ border: "2px solid rgba(255,255,255,0.2)" }}>
            + Add Highlight
          </button>
        </div>

        {/* Links */}
        <div>
          <label className={labelCls}>Links</label>
          {(detail.links ?? []).map((link, i) => (
            <div key={i} className="mb-3 flex gap-2">
              <select style={{ ...inputStyle, width: "110px" }} className={`${inputCls} w-28 shrink-0 cursor-pointer`}
                value={link.icon}
                onChange={(e) => updateLink(i, "icon", e.target.value)}>
                <option value="github" style={{ background: "#111" }}>GitHub</option>
                <option value="live" style={{ background: "#111" }}>Live</option>
                <option value="figma" style={{ background: "#111" }}>Figma</option>
              </select>
              <input style={inputStyle} className={`${inputCls} flex-1`} value={link.label}
                onChange={(e) => updateLink(i, "label", e.target.value)} placeholder="Label" />
              <input style={inputStyle} className={`${inputCls} flex-1`} value={link.url}
                onChange={(e) => updateLink(i, "url", e.target.value)} placeholder="https://..." />
              <button type="button" onClick={() => removeLink(i)}
                className="rounded-[6px] px-3 py-2 font-bold text-red-400"
                style={{ border: "2px solid rgba(239,68,68,0.3)" }}>✕</button>
            </div>
          ))}
          <button type="button" onClick={addLink}
            className="rounded-[6px] px-4 py-2 font-['var(--font-space-grotesk)'] text-xs font-bold uppercase text-white/60 transition-colors hover:text-white"
            style={{ border: "2px solid rgba(255,255,255,0.2)" }}>
            + Add Link
          </button>
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="flex justify-end gap-3 border-t-2 border-white/10 pt-4">
        <button type="button" onClick={onCancel}
          className="rounded-[6px] px-5 py-2.5 font-['var(--font-space-grotesk)'] text-xs font-bold uppercase text-white/60 transition-colors hover:text-white"
          style={{ border: "3px solid rgba(255,255,255,0.2)" }}>
          Cancel
        </button>
        <button type="submit"
          className="rounded-[6px] px-6 py-2.5 font-['var(--font-space-grotesk)'] text-xs font-black uppercase text-black shadow-[3px_3px_0px_0px_#fff] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#fff]"
          style={{ background: "#FFDE4D", border: "3px solid #fff" }}>
          ✓ Save Project
        </button>
      </div>
    </form>
  );
}
