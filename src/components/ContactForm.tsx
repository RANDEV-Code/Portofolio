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

  // Shared input/textarea Neobrutalist styling (small-element border tokens).
  const fieldClasses = [
    "w-full min-h-[44px] px-4 py-3",
    "bg-surface text-structural font-body",
    "border-neo-sm border-structural rounded-neo",
    "focus-visible:outline-none focus-visible:shadow-neo",
    "transition-all duration-neo",
  ].join(" ");

  const labelClasses = "block font-heading font-bold text-structural mb-2";
  const errorClasses = "mt-2 font-body font-bold text-structural";

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-xl">
      {successMessage && (
        <div
          role="status"
          className="mb-6 border-neo-lg border-structural rounded-neo shadow-neo bg-lime px-4 py-3 font-heading font-bold text-structural"
        >
          {successMessage}
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          className="mb-6 border-neo-lg border-structural rounded-neo shadow-neo bg-orange px-4 py-3 font-heading font-bold text-structural"
        >
          ✕ {serverError}
        </div>
      )}

      {/* Name field */}
      <div className="mb-5">
        <label htmlFor="contact-name" className={labelClasses}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange("name")}
          maxLength={contactFormRules.name.maxLength}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={fieldClasses}
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className={errorClasses}>
            {errors.name}
          </p>
        )}
      </div>

      {/* Email field */}
      <div className="mb-5">
        <label htmlFor="contact-email" className={labelClasses}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
          maxLength={contactFormRules.email.maxLength}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={fieldClasses}
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className={errorClasses}>
            {errors.email}
          </p>
        )}
      </div>

      {/* Message field */}
      <div className="mb-6">
        <label htmlFor="contact-message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange("message")}
          maxLength={contactFormRules.message.maxLength}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${fieldClasses} resize-y`}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className={errorClasses}>
            {errors.message}
          </p>
        )}
      </div>

      <NeobrutalistButton
        label={loading ? "Sending..." : "Send Message"}
        type="submit"
        className={loading ? "opacity-70 cursor-not-allowed" : ""}
      />
    </form>
  );
}
