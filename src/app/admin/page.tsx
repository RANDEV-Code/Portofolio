"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Password salah. Coba lagi.");
        setLoading(false);
        return;
      }
      const { token } = await res.json();
      localStorage.setItem("admin_token", token);
      router.push("/admin/dashboard");
    } catch {
      setError("Gagal terhubung ke server.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] px-4">
      {/* Card */}
      <div className="w-full max-w-sm rounded-[6px] border-4 border-white bg-[#1a1a1a] shadow-[8px_8px_0px_0px_#FFDE4D]">
        {/* Header bar */}
        <div className="border-b-4 border-white bg-[#FFDE4D] px-6 py-4">
          <p className="font-['var(--font-space-grotesk)'] text-xs font-black uppercase tracking-widest text-black">
            ◆ Portfolio CMS
          </p>
        </div>

        <div className="px-6 py-8">
          <h1 className="mb-1 font-['var(--font-space-grotesk)'] text-2xl font-black uppercase text-white">
            Admin Login
          </h1>
          <p className="mb-6 font-['var(--font-jetbrains-mono)'] text-sm text-white/50">
            Masuk untuk mengelola konten portfolio.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block font-['var(--font-space-grotesk)'] text-xs font-bold uppercase tracking-wider text-white/70"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-[6px] border-3 border-white bg-[#0f0f0f] px-4 py-3 font-['var(--font-jetbrains-mono)'] text-sm text-white placeholder-white/30 outline-none transition-shadow focus:shadow-[0_0_0_3px_#FFDE4D]"
                style={{ borderWidth: "3px" }}
              />
            </div>

            {error && (
              <p className="rounded-[6px] border-2 border-red-500 bg-red-500/10 px-3 py-2 font-['var(--font-jetbrains-mono)'] text-sm text-red-400">
                ✕ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-[6px] border-3 border-white bg-[#FFDE4D] px-6 py-3 font-['var(--font-space-grotesk)'] text-sm font-black uppercase tracking-wider text-black shadow-[4px_4px_0px_0px_#ffffff] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#ffffff] disabled:opacity-50"
              style={{ borderWidth: "3px" }}
            >
              {loading ? "Logging in..." : "Masuk →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
