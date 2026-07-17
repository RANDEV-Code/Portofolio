"use client";

import type { ContactSectionProps, SocialLinkData } from "@/types";

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

  return (
    <div className="flex flex-col gap-6">
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
