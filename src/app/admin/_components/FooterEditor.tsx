"use client";

import type { FooterContent } from "@/types";
import { Field, Section, TextArea, TextInput } from "./ui";

interface FooterEditorProps {
  data: FooterContent;
  onChange: (data: FooterContent) => void;
}

/** Editor for the inverted page footer. */
export default function FooterEditor({ data, onChange }: FooterEditorProps) {
  const set = <K extends keyof FooterContent>(
    key: K,
    value: FooterContent[K]
  ) => onChange({ ...data, [key]: value });

  return (
    <div className="flex flex-col gap-6">
      <Section
        title="Headline Besar"
        hint="Dua baris. Baris kedua dirender sebagai huruf outline (hanya garis tepi)."
      >
        <Field label="Baris 1 (solid)">
          <TextInput
            value={data.headlineTop}
            onChange={(v) => set("headlineTop", v)}
            placeholder="Let's build"
          />
        </Field>

        <Field label="Baris 2 (outline)">
          <TextInput
            value={data.headlineOutline}
            onChange={(v) => set("headlineOutline", v)}
            placeholder="something great"
          />
        </Field>
      </Section>

      <Section title="Kolom Identitas">
        <Field label="Nama">
          <TextInput
            value={data.name}
            onChange={(v) => set("name", v)}
            placeholder="Rico Adrian Naibaho"
          />
        </Field>

        <Field label="Deskripsi Singkat">
          <TextArea
            rows={3}
            value={data.blurb}
            onChange={(v) => set("blurb", v)}
            placeholder="Informatics Engineering graduate building..."
          />
        </Field>

        <Field label="Pill Ketersediaan">
          <TextInput
            value={data.availability}
            onChange={(v) => set("availability", v)}
            placeholder="Open to opportunities"
          />
        </Field>
      </Section>

      <Section title="Baris Bawah">
        <Field label="Nama Copyright" hint="Tahun ditambahkan otomatis.">
          <TextInput
            value={data.copyrightName}
            onChange={(v) => set("copyrightName", v)}
            placeholder="Rico Adrian Naibaho"
          />
        </Field>

        <Field label="Teks Kredit">
          <TextInput
            value={data.credit}
            onChange={(v) => set("credit", v)}
            placeholder="Built with Next.js & Tailwind CSS"
          />
        </Field>

        <Field label="Lokasi (kanan bawah)">
          <TextInput
            value={data.location}
            onChange={(v) => set("location", v)}
            placeholder="Made in Makassar, Indonesia 🇮🇩"
          />
        </Field>
      </Section>
    </div>
  );
}
