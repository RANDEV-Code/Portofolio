"use client";

import type { ContactSectionProps, SocialLinkData } from "@/types";
import { Field, Section, TextArea, TextInput } from "./ui";

interface ContactEditorProps {
  data: ContactSectionProps;
  onChange: (data: ContactSectionProps) => void;
}

const inputCls =
  "w-full rounded-[6px] bg-[#0f0f0f] px-3 py-2.5 font-['var(--font-jetbrains-mono)'] text-sm text-white placeholder-white/30 outline-none transition-shadow focus:shadow-[0_0_0_3px_#FFDE4D]";
const inputStyle = { border: "3px solid rgba(255,255,255,0.2)" };

const PLATFORMS: SocialLinkData["platform"][] = ["github", "linkedin", "email"];
const PLATFORM_ICONS: Record<string, string> = {
  github: "🐙",
  linkedin: "💼",
  email: "✉️",
};

export default function ContactEditor({ data, onChange }: ContactEditorProps) {
  function updateLink(index: number, field: keyof SocialLinkData, value: string) {
    const updated = data.socialLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    onChange({ ...data, socialLinks: updated });
  }

  const set = <K extends keyof ContactSectionProps>(
    key: K,
    value: ContactSectionProps[K]
  ) => onChange({ ...data, [key]: value });

  return (
    <div className="flex flex-col gap-6">
      <Section title="Judul & Teks">
        {/* The heading had no field here either — only the social links were
            editable, so the section title was effectively frozen. */}
        <Field label="Heading">
          <TextInput
            value={data.heading}
            onChange={(v) => set("heading", v)}
            placeholder="Get In Touch"
          />
        </Field>

        <Field label="Stiker Eyebrow">
          <TextInput
            value={data.eyebrow ?? ""}
            onChange={(v) => set("eyebrow", v)}
            placeholder="✉ Say hello"
          />
        </Field>

        <Field label="Paragraf Pengantar">
          <TextArea
            value={data.intro ?? ""}
            onChange={(v) => set("intro", v)}
            placeholder="Have an idea, a project, or just want to connect?..."
          />
        </Field>

        <Field
          label="Pill Waktu Respons"
          hint="Mengurangi keraguan pengunjung sebelum mengirim pesan."
        >
          <TextInput
            value={data.responseTime ?? ""}
            onChange={(v) => set("responseTime", v)}
            placeholder="Usually replies within 24 hours"
          />
        </Field>
      </Section>

      <Section title="Kolom Kanan">
        <Field label="Judul Kolom Social">
          <TextInput
            value={data.socialHeading ?? ""}
            onChange={(v) => set("socialHeading", v)}
            placeholder="Find me online"
          />
        </Field>

        <Field label="Kutipan">
          <TextArea
            rows={2}
            value={data.quote ?? ""}
            onChange={(v) => set("quote", v)}
            placeholder="Build functional things, ship them, iterate."
          />
        </Field>

        <Field label="Penulis Kutipan">
          <TextInput
            value={data.quoteAuthor ?? ""}
            onChange={(v) => set("quoteAuthor", v)}
            placeholder="Rico Adrian Naibaho"
          />
        </Field>
      </Section>

      <h3 className="font-['var(--font-space-grotesk)'] text-sm font-black uppercase tracking-wide text-[#FFDE4D]">
        Social Links
      </h3>

      {data.socialLinks.map((link, i) => (
        <div
          key={i}
          className="rounded-[6px] p-4"
          style={{ border: "3px solid rgba(255,255,255,0.15)", background: "#1a1a1a" }}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg">{PLATFORM_ICONS[link.platform] ?? "🔗"}</span>
            <span className="font-['var(--font-space-grotesk)'] text-sm font-black uppercase text-[#FFDE4D]">
              {link.platform}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {/* Platform */}
            <div>
              <label className="mb-1 block font-['var(--font-space-grotesk)'] text-[10px] font-bold uppercase tracking-wider text-white/50">
                Platform
              </label>
              <select
                style={inputStyle}
                className={`${inputCls} cursor-pointer`}
                value={link.platform}
                onChange={(e) => updateLink(i, "platform", e.target.value as SocialLinkData["platform"])}
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p} style={{ background: "#111" }}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Label */}
            <div>
              <label className="mb-1 block font-['var(--font-space-grotesk)'] text-[10px] font-bold uppercase tracking-wider text-white/50">
                Label
              </label>
              <input
                style={inputStyle}
                className={inputCls}
                value={link.label}
                onChange={(e) => updateLink(i, "label", e.target.value)}
                placeholder="e.g. GitHub"
              />
            </div>

            {/* URL */}
            <div>
              <label className="mb-1 block font-['var(--font-space-grotesk)'] text-[10px] font-bold uppercase tracking-wider text-white/50">
                URL
              </label>
              <input
                style={inputStyle}
                className={inputCls}
                value={link.url}
                onChange={(e) => updateLink(i, "url", e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
