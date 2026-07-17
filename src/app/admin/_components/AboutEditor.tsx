"use client";

import { useState } from "react";
import type { AboutSectionProps } from "@/types";

interface AboutEditorProps {
  data: AboutSectionProps;
  onChange: (data: AboutSectionProps) => void;
}

const inputCls =
  "w-full rounded-[6px] bg-[#0f0f0f] px-4 py-3 font-['var(--font-jetbrains-mono)'] text-sm text-white placeholder-white/30 outline-none transition-shadow focus:shadow-[0_0_0_3px_#FFDE4D]";
const inputStyle = { border: "3px solid rgba(255,255,255,0.2)" };
const labelCls =
  "mb-2 block font-['var(--font-space-grotesk)'] text-xs font-bold uppercase tracking-wider text-white/60";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <label className={labelCls}>{children}</label>;
}

export default function AboutEditor({ data, onChange }: AboutEditorProps) {
  const [newSkill, setNewSkill] = useState("");
  const [newFact, setNewFact] = useState("");

  const facts = data.quickFacts ?? [];

  /* ── Skills ── */
  function addSkill() {
    const trimmed = newSkill.trim();
    if (!trimmed || data.skills.includes(trimmed)) return;
    onChange({ ...data, skills: [...data.skills, trimmed] });
    setNewSkill("");
  }
  function removeSkill(skill: string) {
    onChange({ ...data, skills: data.skills.filter((s) => s !== skill) });
  }

  /* ── Quick Facts ── */
  function addFact() {
    const trimmed = newFact.trim();
    if (!trimmed) return;
    onChange({ ...data, quickFacts: [...facts, trimmed] });
    setNewFact("");
  }
  function removeFact(index: number) {
    onChange({ ...data, quickFacts: facts.filter((_, i) => i !== index) });
  }
  function updateFact(index: number, value: string) {
    const updated = facts.map((f, i) => (i === index ? value : f));
    onChange({ ...data, quickFacts: updated });
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ── Description ── */}
      <div>
        <SectionLabel>Description</SectionLabel>
        <textarea
          rows={4}
          style={inputStyle}
          className={`${inputCls} resize-none`}
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="About me description..."
        />
      </div>

      {/* ── Quick Facts ── */}
      <div>
        <SectionLabel>Quick Facts (kartu ungu)</SectionLabel>

        <div className="flex flex-col gap-2 mb-3">
          {facts.map((fact, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="font-['var(--font-jetbrains-mono)'] text-[#BEF264] text-sm shrink-0">▹</span>
              <input
                style={inputStyle}
                className={`${inputCls} flex-1`}
                value={fact}
                onChange={(e) => updateFact(i, e.target.value)}
                placeholder={`Fact ${i + 1}`}
              />
              <button
                onClick={() => removeFact(i)}
                className="rounded-[6px] px-3 py-2 font-bold text-red-400/70 transition-colors hover:text-red-400"
                style={{ border: "2px solid rgba(239,68,68,0.3)" }}
                aria-label={`Remove fact ${i + 1}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Add new fact */}
        <div className="flex gap-2">
          <input
            style={inputStyle}
            className={`${inputCls} flex-1`}
            value={newFact}
            onChange={(e) => setNewFact(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFact())}
            placeholder="Add quick fact (Enter to add)"
          />
          <button
            onClick={addFact}
            className="rounded-[6px] bg-[#FFDE4D] px-4 py-2 font-['var(--font-space-grotesk)'] text-xs font-black uppercase text-black shadow-[3px_3px_0px_0px_#fff] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
            style={{ borderWidth: "3px", border: "3px solid #fff" }}
          >
            + Add
          </button>
        </div>
      </div>

      {/* ── Skills ── */}
      <div>
        <SectionLabel>Skills / Tech Stack</SectionLabel>

        {/* Current skills as removable tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 font-['var(--font-space-grotesk)'] text-xs font-bold uppercase text-black"
              style={{ background: "#FFDE4D", border: "2px solid #000" }}
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 font-black text-black/60 hover:text-black"
                aria-label={`Remove ${skill}`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>

        {/* Add new skill */}
        <div className="flex gap-2">
          <input
            style={inputStyle}
            className={`${inputCls} flex-1`}
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            placeholder="Add skill (Enter to add)"
          />
          <button
            onClick={addSkill}
            className="rounded-[6px] bg-[#FFDE4D] px-4 py-2 font-['var(--font-space-grotesk)'] text-xs font-black uppercase text-black shadow-[3px_3px_0px_0px_#fff] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
            style={{ borderWidth: "3px", border: "3px solid #fff" }}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
