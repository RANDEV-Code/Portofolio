import type { ContactSectionProps } from "@/types";
import ContactForm from "./ContactForm";
import SocialLink from "./SocialLink";
import Sticker from "./Sticker";
import ScrollReveal from "./ScrollReveal";
import { DEFAULT_CONTACT } from "@/data/portfolio-defaults";

/**
 * ContactSection
 *
 * The "Get In Touch" content section of the portfolio. It exposes an
 * `id="contact"` anchor so the Hero section's "Let's Connect" CTA can smooth
 * scroll to it.
 *
 * It renders an eyebrow sticker, a heading (`h2`), a short invitation, the
 * {@link ContactForm}, and a panel of {@link SocialLink} elements — one per
 * provided social/contact destination.
 *
 * Layout: content is constrained with `max-w-7xl mx-auto` and section padding.
 * On mobile the form and social links stack vertically; from the `lg` breakpoint
 * up they sit side by side in a two-column grid.
 *
 * This stays a server-renderable component: it renders the client
 * {@link ContactForm} as a child (which is valid) without passing any function
 * handler across the server/client boundary.
 *
 * _Requirements: 5.1, 5.2, 5.6_
 */
export default function ContactSection({
  heading,
  socialLinks,
  eyebrow,
  intro,
  responseTime,
  socialHeading,
  quote,
  quoteAuthor,
}: ContactSectionProps) {
  return (
    <section id="contact" className="relative overflow-hidden bg-grid px-6 py-20">
      {/* Watermark word, matching the About/Projects section treatment */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 bottom-6 hidden select-none font-heading text-[9rem] font-black leading-none text-outline opacity-[0.07] lg:block"
      >
        TALK
      </span>

      <div className="relative mx-auto w-full max-w-7xl">
        <ScrollReveal>
          <div className="flex flex-col items-start gap-3">
            <Sticker color="bg-orange" rotate="-rotate-2">
              {eyebrow ?? DEFAULT_CONTACT.eyebrow}
            </Sticker>
            <h2 className="relative inline-block font-heading text-h2 text-structural">
              <span
                aria-hidden="true"
                className="absolute -inset-x-1 bottom-1 h-3 rotate-1 bg-cyan"
              />
              <span className="relative">{heading}</span>
            </h2>
            <p className="max-w-2xl font-body text-structural">
              {intro ?? DEFAULT_CONTACT.intro}
            </p>

            {/* Response-time expectation — removes the "will this even be read?"
                hesitation that stops people short of submitting a form. */}
            <div className="mt-1 inline-flex items-center gap-2 rounded-neo border-neo-sm border-structural bg-lime px-3 py-1.5 font-heading text-xs font-bold uppercase tracking-wide text-structural shadow-neo-sm">
              <span className="h-2.5 w-2.5 animate-pulse-dot rounded-full bg-structural" />
              {responseTime ?? DEFAULT_CONTACT.responseTime}
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Contact form inside a Neobrutalist panel */}
          <ScrollReveal className="min-w-0">
            <div className="relative min-w-0 overflow-hidden rounded-neo border-neo-lg border-structural bg-surface shadow-neo">
              {/* Panel title bar, matching the project card "window" framing */}
              <div className="flex items-center gap-2 border-b-neo-lg border-structural bg-pink bg-stripes px-5 py-2.5">
                <span aria-hidden="true" className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full border-2 border-structural bg-surface" />
                  <span className="h-3 w-3 rounded-full border-2 border-structural bg-surface/60" />
                  <span className="h-3 w-3 rounded-full border-2 border-structural bg-surface/30" />
                </span>
                <span className="ml-auto font-heading text-[11px] font-black uppercase tracking-widest text-structural">
                  new-message.txt
                </span>
              </div>

              <div className="p-6">
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>

          {/* Social / contact links panel */}
          {socialLinks.length > 0 && (
            <ScrollReveal delay={120} className="min-w-0">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-heading text-lg font-black uppercase tracking-wide text-structural">
                    {socialHeading ?? DEFAULT_CONTACT.socialHeading}
                  </p>
                  <span
                    aria-hidden="true"
                    className="hidden h-[3px] flex-1 bg-structural/25 sm:block"
                  />
                </div>

                {/* Links stretch to full width so the column reads as a stack of
                    equal-weight actions rather than ragged pills. */}
                <div className="mt-5 flex flex-col gap-4">
                  {socialLinks.map((link) => (
                    <SocialLink
                      key={link.platform}
                      platform={link.platform}
                      url={link.url}
                      label={link.label}
                      className="w-full justify-start"
                    />
                  ))}
                </div>

                {/* Decorative quote block */}
                <blockquote className="relative mt-8 -rotate-1 rounded-neo border-neo-lg border-structural bg-cyan p-5 pl-12 font-heading font-bold text-structural shadow-neo transition-transform duration-neo hover:rotate-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-3 top-2 font-heading text-5xl font-black leading-none text-structural/25"
                  >
                    &ldquo;
                  </span>
                  {quote ?? DEFAULT_CONTACT.quote}
                  <footer className="mt-3 font-body text-xs font-normal uppercase tracking-widest text-structural/70">
                    — {quoteAuthor ?? DEFAULT_CONTACT.quoteAuthor}
                  </footer>
                </blockquote>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
