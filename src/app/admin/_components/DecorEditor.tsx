"use client";

import type { DecorContent } from "@/types";
import { ChipListEditor, Field, Section, StringListEditor, TextInput } from "./ui";

interface DecorEditorProps {
  data: DecorContent;
  onChange: (data: DecorContent) => void;
}

/**
 * Editor for the floating decorative badges around the Hero section.
 *
 * Positions stay fixed in `DecorShapes` — only the text and colour are
 * editable. Exposing coordinates would turn this into a layout tool and make it
 * easy to drop a badge on top of the headline; the slots were tuned against the
 * content column and are gated to wide viewports.
 */
const SLOT_NAMES = [
  "1 — Kiri atas",
  "2 — Kiri, di bawahnya",
  "3 — Kiri tengah-bawah",
  "4 — Kanan atas",
  "5 — Kanan, di bawahnya",
  "6 — Kanan tengah",
  "7 — Kanan bawah",
];

export default function DecorEditor({ data, onChange }: DecorEditorProps) {
  const set = <K extends keyof DecorContent>(key: K, value: DecorContent[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="flex flex-col gap-6">
      <Section
        title="Badge Melayang"
        hint={`Hanya tampil di layar lebar (≥1280px). Urutan menentukan posisi: ${SLOT_NAMES.join(", ")}. Maksimal ${SLOT_NAMES.length} badge — sisanya diabaikan.`}
      >
        <ChipListEditor
          items={data.badges}
          onChange={(v) => set("badges", v)}
          addLabel="Tambah Badge"
          placeholder="📍 MAKASSAR, INDONESIA"
        />
        {data.badges.length > SLOT_NAMES.length && (
          <p className="font-['var(--font-jetbrains-mono)'] text-[11px] text-orange-300">
            ⚠ Ada {data.badges.length} badge, tapi hanya {SLOT_NAMES.length}{" "}
            pertama yang punya posisi dan akan tampil.
          </p>
        )}
      </Section>

      <Section
        title="Kartu Kode"
        hint="Kartu kecil bergaya editor di kiri hero. Tampil di layar ≥1536px."
      >
        <Field label="Nama File">
          <TextInput
            value={data.codeFileName}
            onChange={(v) => set("codeFileName", v)}
            placeholder="dev-mode.ts"
          />
        </Field>

        <Field
          label="Isi Array Stack"
          hint='Dirender sebagai: const stack = ["item1", "item2", ...];'
        >
          <StringListEditor
            items={data.codeStack}
            onChange={(v) => set("codeStack", v)}
            addLabel="Tambah Item"
            placeholder="Laravel"
          />
        </Field>
      </Section>
    </div>
  );
}
