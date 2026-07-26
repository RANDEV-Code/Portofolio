"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar, { type Tab } from "../_components/AdminSidebar";
import AdminHeader from "../_components/AdminHeader";
import HeroEditor from "../_components/HeroEditor";
import AboutEditor from "../_components/AboutEditor";
import ProjectsEditor from "../_components/ProjectsEditor";
import ContactEditor from "../_components/ContactEditor";
import MarqueeEditor from "../_components/MarqueeEditor";
import SiteEditor from "../_components/SiteEditor";
import FooterEditor from "../_components/FooterEditor";
import DecorEditor from "../_components/DecorEditor";
import {
  DEFAULT_DECOR,
  DEFAULT_FOOTER,
  DEFAULT_SITE,
} from "@/data/portfolio-defaults";
import type {
  HeroSectionProps,
  AboutSectionProps,
  ProjectsSectionProps,
  ContactSectionProps,
  SiteSettings,
  FooterContent,
  DecorContent,
} from "@/types";

interface PortfolioData {
  site: SiteSettings;
  hero: HeroSectionProps;
  about: AboutSectionProps;
  projects: ProjectsSectionProps;
  contact: ContactSectionProps;
  footer: FooterContent;
  decor: DecorContent;
  marqueeText: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [savedData, setSavedData] = useState<string>("");
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") ?? "" : "";

  // Auth guard + load data
  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) { router.push("/admin"); return; }

    fetch("/api/admin/data", { headers: { "x-admin-token": t } })
      .then((r) => {
        if (r.status === 401) { localStorage.removeItem("admin_token"); router.push("/admin"); return; }
        return r.json();
      })
      .then((d) => {
        if (!d) return;
        setData(d);
        setSavedData(JSON.stringify(d));
      })
      .catch(() => showToast("error", "Gagal memuat data."));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasUnsaved = data ? JSON.stringify(data) !== savedData : false;

  /*
   * Warn before leaving with edits that were never sent to the server.
   *
   * Adding a project only puts it in this component's state; it is not
   * persisted until "Save to site" is pressed. Without this guard, closing the
   * tab at that point silently discarded the work with no indication that
   * anything had been lost.
   */
  useEffect(() => {
    if (!hasUnsaved) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [hasUnsaved]);

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  }

  const handleSave = useCallback(async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSavedData(JSON.stringify(data));
        showToast("success", "Tersimpan! Halaman utama sudah diperbarui.");
      } else {
        // Surface the status — a bare "coba lagi" gave no way to tell an
        // expired login (401) apart from a real server failure.
        showToast(
          "error",
          res.status === 401
            ? "Sesi login habis. Silakan login ulang — perubahan belum tersimpan."
            : `Gagal menyimpan (HTTP ${res.status}). Perubahan belum tersimpan.`
        );
      }
    } catch {
      showToast("error", "Error koneksi ke server.");
    } finally {
      setSaving(false);
    }
  }, [data, token]);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#FFDE4D]" />
          <p className="font-['var(--font-jetbrains-mono)'] text-sm text-white/40">Loading data...</p>
        </div>
      </div>
    );
  }

  const editorTitle: Record<Tab, string> = {
    site: "Site & SEO",
    hero: "Hero Section",
    decor: "Hero Decorations",
    about: "About Section",
    projects: "Projects",
    contact: "Contact & Social Links",
    marquee: "Marquee Banner",
    footer: "Footer",
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f0f0f]">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} onChange={setActiveTab} />

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader hasUnsaved={hasUnsaved} onSave={handleSave} saving={saving} />

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-3xl">
            {/* Section heading */}
            <div className="mb-6 border-b-4 border-white/10 pb-4">
              <h2 className="font-['var(--font-space-grotesk)'] text-2xl font-black uppercase text-white">
                {editorTitle[activeTab]}
              </h2>
            </div>

            {/* Editors.
                The `?? DEFAULT_*` fallbacks guard the case where the API
                response predates a section (e.g. a cached response), so an
                editor never binds to `undefined` and writes blanks on save. */}
            {activeTab === "site" && (
              <SiteEditor
                data={data.site ?? DEFAULT_SITE}
                onChange={(site) => setData((d) => (d ? { ...d, site } : d))}
              />
            )}
            {activeTab === "decor" && (
              <DecorEditor
                data={data.decor ?? DEFAULT_DECOR}
                onChange={(decor) => setData((d) => (d ? { ...d, decor } : d))}
              />
            )}
            {activeTab === "footer" && (
              <FooterEditor
                data={data.footer ?? DEFAULT_FOOTER}
                onChange={(footer) => setData((d) => (d ? { ...d, footer } : d))}
              />
            )}
            {activeTab === "hero" && (
              <HeroEditor
                data={data.hero}
                onChange={(hero) => setData((d) => d ? { ...d, hero } : d)}
              />
            )}
            {activeTab === "about" && (
              <AboutEditor
                data={data.about}
                onChange={(about) => setData((d) => d ? { ...d, about } : d)}
              />
            )}
            {activeTab === "projects" && (
              <ProjectsEditor
                data={data.projects}
                onChange={(projects) => setData((d) => d ? { ...d, projects } : d)}
              />
            )}
            {activeTab === "contact" && (
              <ContactEditor
                data={data.contact}
                onChange={(contact) => setData((d) => d ? { ...d, contact } : d)}
              />
            )}
            {activeTab === "marquee" && (
              <MarqueeEditor
                text={data.marqueeText}
                onChange={(marqueeText) => setData((d) => d ? { ...d, marqueeText } : d)}
              />
            )}
          </div>
        </main>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className={[
            "fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-[6px] px-5 py-3.5 shadow-[5px_5px_0px_0px_#fff]",
            "font-['var(--font-space-grotesk)'] text-sm font-bold text-black",
            "animate-modal-in",
            toast.type === "success" ? "bg-[#BEF264]" : "bg-[#FF8A4C]",
          ].join(" ")}
          style={{ border: "3px solid #fff" }}
        >
          <span>{toast.type === "success" ? "✓" : "✕"}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
