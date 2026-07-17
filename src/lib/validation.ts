import type { ContactFormData, FormErrors } from "@/types";

/**
 * Form validation utilities for the contact form.
 *
 * Validation rules and the pure validation functions are defined here so that
 * the contact form (and its tests) share a single source of truth for the
 * required / maxLength / pattern constraints described in the design document.
 */

/** A single field's validation rule set and its associated error messages. */
export interface ValidationRule {
  required?: boolean;
  maxLength?: number;
  pattern?: RegExp;
  errorMessages: {
    required?: string;
    maxLength?: string;
    pattern?: string;
  };
}

/** The validation rule configuration for every contact form field. */
export interface FieldConfig {
  name: ValidationRule;
  email: ValidationRule;
  message: ValidationRule;
}

/**
 * Validation rules for the contact form:
 * - name: required, max 100 chars
 * - email: required, max 254 chars, must match the email pattern
 * - message: required, max 1000 chars
 */
export const contactFormRules: FieldConfig = {
  name: {
    required: true,
    maxLength: 100,
    errorMessages: {
      required: "Name is required",
      maxLength: "Name must be 100 characters or less",
    },
  },
  email: {
    required: true,
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessages: {
      required: "Email is required",
      maxLength: "Email must be 254 characters or less",
      pattern: "Please enter a valid email address",
    },
  },
  message: {
    required: true,
    maxLength: 1000,
    errorMessages: {
      required: "Message is required",
      maxLength: "Message must be 1000 characters or less",
    },
  },
};

/**
 * Validate a single field value against a rule.
 *
 * Checks are applied in order: required (trimmed-empty), then maxLength, then
 * pattern. Returns the first matching error message, or `undefined` when the
 * value satisfies all constraints.
 */
export function validateField(
  value: string,
  rule: ValidationRule
): string | undefined {
  if (rule.required && value.trim() === "") {
    return rule.errorMessages.required;
  }
  if (rule.maxLength && value.length > rule.maxLength) {
    return rule.errorMessages.maxLength;
  }
  if (rule.pattern && !rule.pattern.test(value)) {
    return rule.errorMessages.pattern;
  }
  return undefined;
}

/**
 * Validate the full contact form, returning a map of per-field error messages.
 * An empty object indicates the form is valid.
 */
export function validateContactForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};
  const nameError = validateField(data.name, contactFormRules.name);
  const emailError = validateField(data.email, contactFormRules.email);
  const messageError = validateField(data.message, contactFormRules.message);

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (messageError) errors.message = messageError;

  return errors;
}
