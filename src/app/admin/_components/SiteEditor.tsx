"use client";

import type { SiteSettings } from "@/types";
import { Field, Section, TextArea, TextInput } from "./ui";

interface SiteEditorProps {
  data: SiteSettings;
  onChange: (data: SiteSettings) => void;
}

/**
 * Branding and SEO editor.
 *
 * Covers the navbar wordmark and the page `<title>` / meta description, which
 * were previously fixed in `Navbar.tsx` and `layout.tsx` — the two places a
 * name change would otherwise have to be made by hand.
 */
export default function SiteEditor({ data, onChange }: SiteEditorProps) {
  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="flex flex-col gap-6">
      <Section
        title="Navbar"
        hint="Wordmark di kiri atas terdiri dari dua bagian dengan warna berbeda."
      >
        <Field label="Nama Brand" hint="Bagian pertama, warna kuning.">
          <TextInput
            value={data.brandName}
            onChange={(v) => set("brandName", v)}
            placeholder="RAN"
          />
        </Field>

        <Field label="Akhiran Brand" hint="Bagian kedua, warna cyan. Boleh dikosongkan.">
          <TextInput
            value={data.brandSuffix}
            onChange={(v) => set("brandSuffix", v)}
            placeholder=".dev"
          />
        </Field>

        <Field label="Label Tombol CTA">
          <TextInput
            value={data.navCtaLabel}
            onChange={(v) => set("navCtaLabel", v)}
            placeholder="Hire Me"
          />
        </Field>

        <Field
          label="Target Tombol CTA"
          hint="Id section tujuan: home, about, projects, atau contact."
        >
          <TextInput
            value={data.navCtaTarget}
            onChange={(v) => set("navCtaTarget", v)}
            placeholder="contact"
          />
        </Field>
      </Section>

      <Section
        title="SEO / Metadata"
        hint="Muncul di tab browser dan hasil pencarian Google."
      >
        <Field label="Judul Halaman (title)">
          <TextInput
            value={data.metaTitle}
            onChange={(v) => set("metaTitle", v)}
            placeholder="Nama Anda — IT Student & Developer"
          />
        </Field>

        <Field
          label="Deskripsi Meta"
          hint="Idealnya 150–160 karakter."
        >
          <TextArea
            rows={4}
            value={data.metaDescription}
            onChange={(v) => set("metaDescription", v)}
            placeholder="Portfolio of..."
          />
        </Field>
        <p className="font-['var(--font-jetbrains-mono)'] text-[11px] text-white/35">
          {data.metaDescription.length} karakter
        </p>
      </Section>
    </div>
  );
}
