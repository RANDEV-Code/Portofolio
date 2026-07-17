"use client";

import type { HeroSectionProps } from "@/types";

interface HeroEditorProps {
  data: HeroSectionProps;
  onChange: (data: HeroSectionProps) => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block font-['var(--font-space-grotesk)'] text-xs font-bold uppercase tracking-wider text-white/60">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-[6px] bg-[#0f0f0f] px-4 py-3 font-['var(--font-jetbrains-mono)'] text-sm text-white placeholder-white/30 outline-none transition-shadow focus:shadow-[0_0_0_3px_#FFDE4D]";
const inputStyle = { border: "3px solid rgba(255,255,255,0.2)" };

export default function HeroEditor({ data, onChange }: HeroEditorProps) {
  return (
    <div className="flex flex-col gap-5">
      <Field label="Headline">
        <input
          style={inputStyle}
          className={inputCls}
          value={data.headline}
          onChange={(e) => onChange({ ...data, headline: e.target.value })}
          placeholder="HI, I'm YOUR NAME"
        />
      </Field>

      <Field label="Subheadline">
        <textarea
          rows={3}
          style={inputStyle}
          className={`${inputCls} resize-none`}
          value={data.subheadline}
          onChange={(e) => onChange({ ...data, subheadline: e.target.value })}
          placeholder="Short bio / tagline..."
        />
      </Field>

      <Field label="CTA Buttons">
        <div className="flex flex-col gap-3">
          {data.ctaButtons.map((btn, i) => (
            <div key={i} className="flex gap-2">
              <input
                style={inputStyle}
                className={`${inputCls} flex-1`}
                value={btn.label}
                onChange={(e) => {
                  const updated = data.ctaButtons.map((b, j) =>
                    j === i ? { ...b, label: e.target.value } : b
                  );
                  onChange({ ...data, ctaButtons: updated });
                }}
                placeholder="Button label"
              />
              <input
                style={inputStyle}
                className={`${inputCls} w-36`}
                value={btn.targetId}
                onChange={(e) => {
                  const updated = data.ctaButtons.map((b, j) =>
                    j === i ? { ...b, targetId: e.target.value } : b
                  );
                  onChange({ ...data, ctaButtons: updated });
                }}
                placeholder="targetId"
              />
            </div>
          ))}
        </div>
      </Field>
    </div>
  );
}
