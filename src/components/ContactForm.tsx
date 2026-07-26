"use client";

import { useState } from "react";
import type { ContactFormData, ContactFormProps, FormErrors } from "@/types";
import { contactFormRules, validateContactForm } from "@/lib/validation";
import NeobrutalistButton from "./NeobrutalistButton";

/**
 * ContactForm
 *
 * A controlled Neobrutalist contact form with `name`, `email`, and `message`
 * fields. Validation runs on submit (not on change) via the pure
 * {@link validateContactForm} utility so the form, validation rules, and tests
 * share a single source of truth.
 *
 * Behavior:
 * - `maxLength` attributes mirror the validation rules (name 100, email 254,
 *   message 1000) to discourage over-length input at the input layer.
 * - On submit, the form is validated. If any field is invalid, per-field error
 *   messages are shown adjacent to the field and the success message is cleared.
 * - On a fully valid submission, the optional `onSubmit` callback is invoked
 *   with the form data, a success confirmation is shown, and every field is
 *   reset to empty.
 *
 * Accessibility:
 * - Each input is associated with a `<label htmlFor>` / `id` pairing.
 * - Invalid fields set `aria-invalid` and reference their error message via
 *   `aria-describedby`; error messages use `role="alert"` so assistive tech
 *   announces them on submit.
 *
 * Styling follows the Neobrutalism design tokens for small elements:
 * `border-neo-sm` (3px) `border-structural` (black) `rounded-neo` (6px) on a
 * `bg-surface` (white) background, with generous padding and a 44px minimum
 * height to keep touch targets comfortable on mobile (Requirement 8.5).
 */
const SUCCESS_MESSAGE = "✓ Pesan terkirim! Saya akan segera membalas.";

const EMPTY_FORM: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    field: keyof ContactFormData
  ): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
    return (event) => {
      const { value } = event.target;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    // The submit button stays clickable while a request is in flight (it only
    // dims), so guard here to prevent a duplicate send on a double click.
    if (loading) return;
    setServerError("");

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    // Valid — send to API
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSubmit?.(formData);
        setErrors({});
        setFormData(EMPTY_FORM);
        setSuccessMessage(SUCCESS_MESSAGE);
      } else {
        const data = await res.json().catch(() => ({}));
        setServerError(data.error ?? "Gagal mengirim pesan. Coba lagi.");
      }
    } catch {
      setServerError("Tidak dapat terhubung ke server. Periksa koneksi Anda.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Shared input/textarea styling.
   *
   * The focused state now lifts the field and expands its hard shadow — the
   * same affordance buttons and cards use — plus a dashed `focus-neo` outline,
   * so which field is active is unmistakable. Invalid fields additionally get a
   * red fill; previously an error was communicated only by a line of plain
   * black text that looked identical to every other line on the page.
   */
  const fieldClasses = (invalid?: boolean) =>
    [
      "w-full min-h-[44px] px-4 py-3",
      "text-structural font-body placeholder:text-structural/40",
      "border-neo-sm border-structural rounded-neo",
      "transition-all duration-neo",
      "focus-neo focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-neo focus:outline-none",
      invalid ? "bg-red/25" : "bg-cream focus:bg-surface",
    ].join(" ");

  const labelClasses =
    "flex items-center gap-2 font-heading font-bold text-structural mb-2";
  const errorClasses =
    "mt-2 inline-flex items-center gap-1.5 rounded-neo border-2 border-structural bg-red px-2.5 py-1 font-body text-sm font-bold text-structural";

  /** Small colored index chip rendered before each field label. */
  const fieldMarker = (glyph: string, fill: string) => (
    <span
      aria-hidden="true"
      className={`flex h-6 w-6 items-center justify-center rounded-neo border-2 border-structural ${fill} text-xs`}
    >
      {glyph}
    </span>
  );

  const messageLength = formData.message.length;
  // `maxLength` is optional on ValidationRule; fall back to the documented cap.
  const messageMax = contactFormRules.message.maxLength ?? 1000;

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-xl">
      {successMessage && (
        <div
          role="status"
          className="mb-6 flex animate-reveal-up items-center gap-3 rounded-neo border-neo-lg border-structural bg-lime px-4 py-3 font-heading font-bold text-structural shadow-neo"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-structural bg-surface"
          >
            ✓
          </span>
          {successMessage}
        </div>
      )}

      {serverError && (
        // Red rather than orange: orange is used decoratively elsewhere in the
        // palette, so it did not read as a failure state.
        <div
          role="alert"
          className="mb-6 flex animate-reveal-up items-center gap-3 rounded-neo border-neo-lg border-structural bg-red px-4 py-3 font-heading font-bold text-structural shadow-neo"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-structural bg-surface"
          >
            ✕
          </span>
          {serverError}
        </div>
      )}

      {/* Name field */}
      <div className="mb-5">
        <label htmlFor="contact-name" className={labelClasses}>
          {fieldMarker("01", "bg-cyan")}
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange("name")}
          maxLength={contactFormRules.name.maxLength}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={fieldClasses(Boolean(errors.name))}
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className={errorClasses}>
            <span aria-hidden="true">✕</span>
            {errors.name}
          </p>
        )}
      </div>

      {/* Email field */}
      <div className="mb-5">
        <label htmlFor="contact-email" className={labelClasses}>
          {fieldMarker("02", "bg-lime")}
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange("email")}
          maxLength={contactFormRules.email.maxLength}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={fieldClasses(Boolean(errors.email))}
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className={errorClasses}>
            <span aria-hidden="true">✕</span>
            {errors.email}
          </p>
        )}
      </div>

      {/* Message field */}
      <div className="mb-6">
        <div className="flex items-end justify-between gap-3">
          <label htmlFor="contact-message" className={labelClasses}>
            {fieldMarker("03", "bg-purple")}
            Message
          </label>
          {/* Live character budget — the 1000-char cap was previously silent,
              so long messages were truncated with no warning. */}
          <span
            aria-hidden="true"
            className={`mb-2 font-heading text-[11px] font-bold tabular-nums ${
              messageLength > messageMax * 0.9
                ? "text-structural"
                : "text-structural/45"
            }`}
          >
            {messageLength}/{messageMax}
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell me about your project or idea…"
          value={formData.message}
          onChange={handleChange("message")}
          maxLength={messageMax}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${fieldClasses(Boolean(errors.message))} resize-y`}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className={errorClasses}>
            <span aria-hidden="true">✕</span>
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <NeobrutalistButton
          label={loading ? "Sending…" : "Send Message ✉"}
          type="submit"
          className={loading ? "opacity-70 cursor-not-allowed" : ""}
        />
        {/* Reassurance copy next to the primary action */}
        <span className="font-body text-xs text-structural/60">
          No spam. Your email is only used to reply.
        </span>
      </div>
    </form>
  );
}
