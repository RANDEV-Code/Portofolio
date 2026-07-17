"use client";

type Tab = "hero" | "about" | "projects" | "contact" | "marquee";

const NAV: { id: Tab; label: string; icon: string }[] = [
  { id: "hero", label: "Hero", icon: "🏠" },
  { id: "about", label: "About", icon: "👤" },
  { id: "projects", label: "Projects", icon: "🗂️" },
  { id: "contact", label: "Contact", icon: "📬" },
  { id: "marquee", label: "Marquee", icon: "📢" },
];

interface AdminSidebarProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

export type { Tab };

export default function AdminSidebar({ activeTab, onChange }: AdminSidebarProps) {
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r-4 border-white/20 bg-[#111]">
      {/* Brand */}
      <div className="border-b-4 border-white/20 px-5 py-5">
        <span className="block font-['var(--font-space-grotesk)'] text-[10px] font-black uppercase tracking-widest text-white/40">
          Portfolio CMS
        </span>
        <span className="mt-0.5 block font-['var(--font-space-grotesk)'] text-lg font-black uppercase text-[#FFDE4D]">
          Admin Panel
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-3" aria-label="Admin sections">
        {NAV.map(({ id, label, icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={[
                "flex items-center gap-3 rounded-[6px] px-4 py-3 text-left transition-all duration-150",
                "font-['var(--font-space-grotesk)'] text-sm font-bold uppercase tracking-wide",
                isActive
                  ? "border-3 border-white bg-[#FFDE4D] text-black shadow-[3px_3px_0px_0px_#ffffff]"
                  : "border-3 border-transparent text-white/60 hover:border-white/20 hover:bg-white/5 hover:text-white",
              ].join(" ")}
              style={{ borderWidth: "3px" }}
            >
              <span className="text-base">{icon}</span>
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
