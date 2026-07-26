"use client";

import type { ReactNode } from "react";
import { ACCENT_COLORS, ACCENT_HEX, type AccentColor } from "@/types";

/**
 * Shared form primitives for the admin editors.
 *
 * Every editor previously re-declared its own `Field` component and repeated
 * the same input class string, so styling drifted between tabs. These are the
 * single source of truth for the dashboard's dark form styling.
 */

export const inputCls =
  "w-full rounded-[6px] bg-[#0f0f0f] px-4 py-3 font-['var(--font-jetbrains-mono)'] text-sm text-white placeholder-white/30 outline-none transition-shadow focus:shadow-[0_0_0_3px_#FFDE4D]";

export const inputStyle = { border: "3px solid rgba(255,255,255,0.2)" };

/** Labelled form row with an optional helper line. */
export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-['var(--font-space-grotesk)'] text-xs font-bold uppercase tracking-wider text-white/60">
        {label}
      </label>
      {hint && (
        <p className="mb-2 font-['var(--font-jetbrains-mono)'] text-[11px] leading-snug text-white/35">
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

/** Single-line text input. */
export function TextInput({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      style={inputStyle}
      className={`${inputCls} ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

/** Multi-line text input. */
export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      rows={rows}
      style={inputStyle}
      className={`${inputCls} resize-y`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

/**
 * Accent picker rendered as colour swatches.
 *
 * A free-text colour field would let the panel emit a class Tailwind never
 * compiled, which silently renders as no background at all — so the choice is
 * constrained to the theme's named accents.
 */
export function ColorPicker({
  value,
  onChange,
}: {
  value: AccentColor;
  onChange: (c: AccentColor) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {ACCENT_COLORS.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          title={c}
          aria-label={`Warna ${c}`}
          aria-pressed={value === c}
          className="h-9 w-9 rounded-[6px] transition-transform hover:scale-110"
          style={{
            background: ACCENT_HEX[c],
            border:
              value === c ? "3px solid #FFFFFF" : "3px solid rgba(0,0,0,0.6)",
            boxShadow: value === c ? "0 0 0 2px #FFDE4D" : "none",
          }}
        />
      ))}
    </div>
  );
}

/** Framed group with a title, used to break long editors into blocks. */
export function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="flex flex-col gap-5 rounded-[6px] p-5"
      style={{ border: "3px solid rgba(255,255,255,0.12)", background: "#141414" }}
    >
      <div>
        <h3 className="font-['var(--font-space-grotesk)'] text-sm font-black uppercase tracking-wide text-[#FFDE4D]">
          {title}
        </h3>
        {hint && (
          <p className="mt-1 font-['var(--font-jetbrains-mono)'] text-[11px] leading-snug text-white/35">
            {hint}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

/**
 * Editor for an ordered list of items with add / remove / reorder controls.
 *
 * `renderItem` draws one row; the list handles the array plumbing so each
 * caller does not reimplement splice/swap logic (and get the edge cases at the
 * ends of the list subtly wrong).
 */
export function ListEditor<T>({
  items,
  onChange,
  renderItem,
  makeNew,
  addLabel,
  emptyLabel = "Belum ada item.",
}: {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, update: (next: T) => void, index: number) => ReactNode;
  makeNew: () => T;
  addLabel: string;
  emptyLabel?: string;
}) {
  const update = (i: number, next: T) =>
    onChange(items.map((it, j) => (j === i ? next : it)));

  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));

  const move = (i: number, dir: -1 | 1) => {
    const target = i + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[i], next[target]] = [next[target], next[i]];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.length === 0 && (
        <p className="font-['var(--font-jetbrains-mono)'] text-xs text-white/35">
          {emptyLabel}
        </p>
      )}

      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-[6px] p-3"
          style={{ border: "2px solid rgba(255,255,255,0.12)", background: "#0f0f0f" }}
        >
          <div className="flex-1 min-w-0">{renderItem(item, (n) => update(i, n), i)}</div>

          <div className="flex shrink-0 flex-col gap-1">
            <button
              type="button"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              aria-label="Pindah ke atas"
              className="rounded px-2 py-0.5 text-white/40 hover:text-white disabled:opacity-20"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1}
              aria-label="Pindah ke bawah"
              className="rounded px-2 py-0.5 text-white/40 hover:text-white disabled:opacity-20"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Hapus"
              className="rounded px-2 py-0.5 text-red-400/60 hover:text-red-400"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...items, makeNew()])}
        className="flex items-center justify-center gap-2 rounded-[6px] py-2.5 font-['var(--font-space-grotesk)'] text-xs font-black uppercase tracking-wide text-[#FFDE4D] transition-all hover:bg-white/5"
        style={{ border: "3px dashed rgba(255,222,77,0.4)" }}
      >
        + {addLabel}
      </button>
    </div>
  );
}

/** Simple string-array editor (skills, quick facts, highlights). */
export function StringListEditor({
  items,
  onChange,
  addLabel,
  placeholder,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  addLabel: string;
  placeholder?: string;
}) {
  return (
    <ListEditor<string>
      items={items}
      onChange={onChange}
      makeNew={() => ""}
      addLabel={addLabel}
      renderItem={(item, update) => (
        <TextInput value={item} onChange={update} placeholder={placeholder} />
      )}
    />
  );
}

/** Label + accent-colour pair editor, used for chips/pills/stickers. */
export function ChipListEditor({
  items,
  onChange,
  addLabel,
  placeholder,
}: {
  items: Array<{ label: string; color: AccentColor }>;
  onChange: (items: Array<{ label: string; color: AccentColor }>) => void;
  addLabel: string;
  placeholder?: string;
}) {
  return (
    <ListEditor
      items={items}
      onChange={onChange}
      makeNew={() => ({ label: "", color: "cyan" as AccentColor })}
      addLabel={addLabel}
      renderItem={(item, update) => (
        <div className="flex flex-col gap-2">
          <TextInput
            value={item.label}
            onChange={(label) => update({ ...item, label })}
            placeholder={placeholder}
          />
          <ColorPicker
            value={item.color}
            onChange={(color) => update({ ...item, color })}
          />
        </div>
      )}
    />
  );
}
