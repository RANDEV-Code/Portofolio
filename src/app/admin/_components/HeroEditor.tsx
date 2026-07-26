"use client";

import type { HeroSectionProps } from "@/types";
import {
  ChipListEditor,
  Field,
  Section,
  TextArea,
  TextInput,
  inputCls,
  inputStyle,
} from "./ui";

interface HeroEditorProps {
  data: HeroSectionProps;
  onChange: (data: HeroSectionProps) => void;
}

export default function HeroEditor({ data, onChange }: HeroEditorProps) {
  const set = <K extends keyof HeroSectionProps>(
    key: K,
    value: HeroSectionProps[K]
  ) => onChange({ ...data, [key]: value });

  return (
    <div className="flex flex-col gap-6">
      <Section title="Teks Utama">
        <Field label="Headline">
          <TextInput
            value={data.headline}
            onChange={(v) => set("headline", v)}
            placeholder="HI, I'm YOUR NAME"
          />
        </Field>

        <Field label="Subheadline">
          <TextArea
            value={data.subheadline}
            onChange={(v) => set("subheadline", v)}
            placeholder="Short bio / tagline..."
          />
        </Field>
      </Section>

      <Section
        title="Foto Profil"
        hint="Letakkan file gambar di folder /public, lalu tulis path-nya diawali garis miring."
      >
        <Field label="Path Gambar">
          <TextInput
            value={data.photo ?? ""}
            onChange={(v) => set("photo", v)}
            placeholder="/foto1.png"
          />
        </Field>

        <Field
          label="Alt Text"
          hint="Deskripsi gambar untuk pembaca layar dan SEO."
        >
          <TextInput
            value={data.photoAlt ?? ""}
            onChange={(v) => set("photoAlt", v)}
            placeholder="Nama Anda — IT Developer"
          />
        </Field>

        <Field
          label="Badge Berputar"
          hint="Teks di lingkaran kecil yang berputar di sudut foto."
        >
          <TextInput
            value={data.rotatingBadge ?? ""}
            onChange={(v) => set("rotatingBadge", v)}
            placeholder="✦ OPEN TO WORK ✦"
          />
        </Field>

        <Field
          label="Badge Kiri & Kanan Foto"
          hint="Dua badge yang mengapit foto. Hanya 2 pertama yang tampil."
        >
          <ChipListEditor
            items={data.flankingBadges ?? []}
            onChange={(v) => set("flankingBadges", v)}
            addLabel="Tambah Badge"
            placeholder="💻 Fullstack"
          />
        </Field>
      </Section>

      <Section title="Stiker & Tech Pills">
        <Field label="Stiker Atas" hint="Label kecil di atas foto profil.">
          <ChipListEditor
            items={data.stickers ?? []}
            onChange={(v) => set("stickers", v)}
            addLabel="Tambah Stiker"
            placeholder="★ Portfolio"
          />
        </Field>

        <Field
          label="Tech Pills"
          hint="Deretan teknologi di bawah headline."
        >
          <ChipListEditor
            items={data.techPills ?? []}
            onChange={(v) => set("techPills", v)}
            addLabel="Tambah Pill"
            placeholder="Laravel"
          />
        </Field>
      </Section>

      <Section title="Tombol & Status">
        <Field
          label="CTA Buttons"
          hint="Kolom kanan adalah id section tujuan scroll: home, about, projects, atau contact."
        >
          <div className="flex flex-col gap-3">
            {data.ctaButtons.map((btn, i) => (
              <div key={i} className="flex gap-2">
                <input
                  style={inputStyle}
                  className={`${inputCls} flex-1`}
                  value={btn.label}
                  onChange={(e) =>
                    set(
                      "ctaButtons",
                      data.ctaButtons.map((b, j) =>
                        j === i ? { ...b, label: e.target.value } : b
                      )
                    )
                  }
                  placeholder="Button label"
                />
                <input
                  style={inputStyle}
                  className={`${inputCls} w-36`}
                  value={btn.targetId}
                  onChange={(e) =>
                    set(
                      "ctaButtons",
                      data.ctaButtons.map((b, j) =>
                        j === i ? { ...b, targetId: e.target.value } : b
                      )
                    )
                  }
                  placeholder="targetId"
                />
              </div>
            ))}
          </div>
        </Field>

        <Field label="Pill Ketersediaan">
          <TextInput
            value={data.availability ?? ""}
            onChange={(v) => set("availability", v)}
            placeholder="Available for collaboration"
          />
        </Field>

        <Field label="Teks Scroll Cue">
          <TextInput
            value={data.scrollCue ?? ""}
            onChange={(v) => set("scrollCue", v)}
            placeholder="Scroll Down"
          />
        </Field>
      </Section>
    </div>
  );
}
