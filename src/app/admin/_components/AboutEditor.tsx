"use client";

import { useState } from "react";
import type { AboutSectionProps, StatItem } from "@/types";
import {
  ColorPicker,
  Field,
  ListEditor,
  Section,
  TextArea,
  TextInput,
  inputCls,
  inputStyle,
} from "./ui";

interface AboutEditorProps {
  data: AboutSectionProps;
  onChange: (data: AboutSectionProps) => void;
}

export default function AboutEditor({ data, onChange }: AboutEditorProps) {
  const [newSkill, setNewSkill] = useState("");
  const [newFact, setNewFact] = useState("");

  const facts = data.quickFacts ?? [];

  const set = <K extends keyof AboutSectionProps>(
    key: K,
    value: AboutSectionProps[K]
  ) => onChange({ ...data, [key]: value });

  /* ── Skills ── */
  function addSkill() {
    const trimmed = newSkill.trim();
    if (!trimmed || data.skills.includes(trimmed)) return;
    set("skills", [...data.skills, trimmed]);
    setNewSkill("");
  }
  function removeSkill(skill: string) {
    set(
      "skills",
      data.skills.filter((s) => s !== skill)
    );
  }

  /* ── Quick Facts ── */
  function addFact() {
    const trimmed = newFact.trim();
    if (!trimmed) return;
    set("quickFacts", [...facts, trimmed]);
    setNewFact("");
  }
  function removeFact(index: number) {
    set(
      "quickFacts",
      facts.filter((_, i) => i !== index)
    );
  }
  function updateFact(index: number, value: string) {
    set(
      "quickFacts",
      facts.map((f, i) => (i === index ? value : f))
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Section title="Judul & Deskripsi">
        {/* The heading was previously not editable at all — the section title
            on the live site was fixed to whatever the JSON already held. */}
        <Field label="Heading">
          <TextInput
            value={data.heading}
            onChange={(v) => set("heading", v)}
            placeholder="About Me"
          />
        </Field>

        <Field label="Stiker Eyebrow" hint="Label kecil di atas heading.">
          <TextInput
            value={data.eyebrow ?? ""}
            onChange={(v) => set("eyebrow", v)}
            placeholder="● Who am I"
          />
        </Field>

        <Field label="Description">
          <TextArea
            rows={5}
            value={data.description}
            onChange={(v) => set("description", v)}
            placeholder="About me description..."
          />
        </Field>

        <Field label="Label Tab Kartu" hint="Tab kecil di sudut atas kartu deskripsi.">
          <TextInput
            value={data.cardLabel ?? ""}
            onChange={(v) => set("cardLabel", v)}
            placeholder="profile.md"
          />
        </Field>

        <Field label="Baris Status" hint="Teks di bawah garis putus-putus kartu deskripsi.">
          <TextInput
            value={data.statusLine ?? ""}
            onChange={(v) => set("statusLine", v)}
            placeholder="Currently open to opportunities"
          />
        </Field>
      </Section>

      <Section
        title="Statistik"
        hint="Empat kotak angka di bawah heading. Nilai = angka besar, suffix = satuan kecil."
      >
        <ListEditor<StatItem>
          items={data.stats ?? []}
          onChange={(v) => set("stats", v)}
          addLabel="Tambah Statistik"
          makeNew={() => ({
            value: "",
            suffix: "",
            label: "",
            glyph: "⭐",
            color: "cyan",
          })}
          renderItem={(item, update) => (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  style={inputStyle}
                  className={`${inputCls} flex-1`}
                  value={item.value}
                  onChange={(e) => update({ ...item, value: e.target.value })}
                  placeholder="3.86"
                />
                <input
                  style={inputStyle}
                  className={`${inputCls} w-24`}
                  value={item.suffix}
                  onChange={(e) => update({ ...item, suffix: e.target.value })}
                  placeholder="/4.00"
                />
                <input
                  style={inputStyle}
                  className={`${inputCls} w-20 text-center`}
                  value={item.glyph}
                  onChange={(e) => update({ ...item, glyph: e.target.value })}
                  placeholder="🎓"
                />
              </div>
              <TextInput
                value={item.label}
                onChange={(label) => update({ ...item, label })}
                placeholder="GPA"
              />
              <ColorPicker
                value={item.color}
                onChange={(color) => update({ ...item, color })}
              />
            </div>
          )}
        />
      </Section>

      <Section title="Quick Facts" hint="Daftar poin di kartu ungu.">
        <div className="mb-1 flex flex-col gap-2">
          {facts.map((fact, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="shrink-0 font-['var(--font-jetbrains-mono)'] text-sm text-[#BEF264]">
                ▹
              </span>
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

        <div className="flex gap-2">
          <input
            style={inputStyle}
            className={`${inputCls} flex-1`}
            value={newFact}
            onChange={(e) => setNewFact(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addFact())
            }
            placeholder="Add quick fact (Enter to add)"
          />
          <button
            onClick={addFact}
            className="rounded-[6px] bg-[#FFDE4D] px-4 py-2 font-['var(--font-space-grotesk)'] text-xs font-black uppercase text-black shadow-[3px_3px_0px_0px_#fff] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
            style={{ border: "3px solid #fff" }}
          >
            + Add
          </button>
        </div>
      </Section>

      <Section title="Skills / Tech Stack">
        <Field label="Judul Grid Skills">
          <TextInput
            value={data.skillsHeading ?? ""}
            onChange={(v) => set("skillsHeading", v)}
            placeholder="My Tech Stack"
          />
        </Field>

        <Field label="Daftar Skill">
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

          <div className="flex gap-2">
            <input
              style={inputStyle}
              className={`${inputCls} flex-1`}
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addSkill())
              }
              placeholder="Add skill (Enter to add)"
            />
            <button
              onClick={addSkill}
              className="rounded-[6px] bg-[#FFDE4D] px-4 py-2 font-['var(--font-space-grotesk)'] text-xs font-black uppercase text-black shadow-[3px_3px_0px_0px_#fff] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{ border: "3px solid #fff" }}
            >
              + Add
            </button>
          </div>
        </Field>
      </Section>
    </div>
  );
}
