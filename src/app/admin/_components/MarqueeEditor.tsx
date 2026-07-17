"use client";

interface MarqueeEditorProps {
  text: string;
  onChange: (text: string) => void;
}

export default function MarqueeEditor({ text, onChange }: MarqueeEditorProps) {
  return (
    <div>
      <label className="mb-1.5 block font-['var(--font-space-grotesk)'] text-xs font-bold uppercase tracking-wider text-white/60">
        Marquee Banner Text
      </label>
      <p className="mb-3 font-['var(--font-jetbrains-mono)'] text-xs text-white/40">
        Teks ini akan scroll secara horizontal di bawah hero. Pisahkan item dengan bullet (•).
      </p>
      <textarea
        rows={4}
        className="w-full resize-none rounded-[6px] bg-[#0f0f0f] px-4 py-3 font-['var(--font-jetbrains-mono)'] text-sm text-white placeholder-white/30 outline-none transition-shadow focus:shadow-[0_0_0_3px_#FFDE4D]"
        style={{ border: "3px solid rgba(255,255,255,0.2)" }}
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder="• WEB DEVELOPMENT • LARAVEL • ..."
      />
      {/* Preview */}
      <div className="mt-3 overflow-hidden rounded-[6px] border-2 border-white/10 bg-black px-4 py-3">
        <p className="truncate font-['var(--font-space-grotesk)'] text-xs font-bold uppercase tracking-widest text-[#FFDE4D]">
          Preview: {text}
        </p>
      </div>
    </div>
  );
}
