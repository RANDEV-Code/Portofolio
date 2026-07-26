"use client";

import { useRouter } from "next/navigation";

interface AdminHeaderProps {
  hasUnsaved: boolean;
  onSave: () => void;
  saving: boolean;
}

export default function AdminHeader({ hasUnsaved, onSave, saving }: AdminHeaderProps) {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  }

  return (
    <header className="flex items-center justify-between border-b-4 border-white/20 bg-[#111] px-6 py-4">
      <div className="flex items-center gap-3">
        <h1 className="font-['var(--font-space-grotesk)'] text-base font-black uppercase text-white">
          Dashboard
        </h1>
        {hasUnsaved ? (
          <span className="animate-pulse rounded-full border-2 border-orange-400 bg-orange-400/15 px-2.5 py-0.5 font-['var(--font-jetbrains-mono)'] text-[10px] font-bold uppercase text-orange-400">
            ● Belum tersimpan
          </span>
        ) : (
          <span className="rounded-full border-2 border-emerald-400/50 bg-emerald-400/10 px-2.5 py-0.5 font-['var(--font-jetbrains-mono)'] text-[10px] font-bold uppercase text-emerald-400">
            ✓ Tersimpan
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[6px] border-3 border-white/30 px-4 py-2 font-['var(--font-space-grotesk)'] text-xs font-bold uppercase tracking-wide text-white/60 transition-all duration-150 hover:border-white hover:text-white"
          style={{ borderWidth: "3px" }}
        >
          Preview Site ↗
        </a>

        {/*
          Always rendered, rather than only while `hasUnsaved` is true.
          Previously this button appeared out of nowhere after an edit and
          vanished again after saving, so there was nothing to discover: the
          per-section forms looked like they did the saving. Keeping it in
          place — greyed out when there is nothing to save — makes it obvious
          that publishing to the site is a distinct, deliberate step.
        */}
        <button
          onClick={onSave}
          disabled={saving || !hasUnsaved}
          title={
            hasUnsaved
              ? "Simpan semua perubahan ke website"
              : "Tidak ada perubahan untuk disimpan"
          }
          className={[
            "rounded-[6px] px-5 py-2 font-['var(--font-space-grotesk)'] text-xs font-black uppercase tracking-wide transition-all duration-150",
            hasUnsaved
              ? "border-white bg-[#FFDE4D] text-black shadow-[3px_3px_0px_0px_#ffffff] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#ffffff]"
              : "cursor-not-allowed border-white/20 bg-transparent text-white/30",
            saving ? "opacity-50" : "",
          ].join(" ")}
          style={{ borderWidth: "3px", borderStyle: "solid" }}
        >
          {saving ? "Menyimpan..." : "💾 Save to site"}
        </button>

        <button
          onClick={handleLogout}
          className="rounded-[6px] border-3 border-white/30 px-4 py-2 font-['var(--font-space-grotesk)'] text-xs font-bold uppercase tracking-wide text-white/60 transition-all duration-150 hover:border-red-400 hover:text-red-400"
          style={{ borderWidth: "3px" }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
