import type { ContactSectionProps } from "@/types";
import ContactForm from "./ContactForm";
import SocialLink from "./SocialLink";
import Sticker from "./Sticker";

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
}: ContactSectionProps) {
  return (
    <section id="contact" className="relative overflow-hidden bg-grid px-6 py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-start gap-3">
          <Sticker color="bg-orange" rotate="-rotate-2">
            ✉ Say hello
          </Sticker>
          <h2 className="font-heading text-h2 text-structural">{heading}</h2>
          <p className="max-w-2xl font-body text-structural">
            Have an idea, a project, or just want to connect? Drop a message and
            I&apos;ll get back to you.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Contact form inside a Neobrutalist panel */}
          <div className="min-w-0 border-neo-lg border-structural rounded-neo bg-surface p-6 shadow-neo">
            <ContactForm />
          </div>

          {/* Social / contact links panel */}
          {socialLinks.length > 0 && (
            <div className="min-w-0">
              <p className="font-heading text-lg font-bold uppercase tracking-wide text-structural">
                Find me online
              </p>
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:flex-col">
                {socialLinks.map((link) => (
                  <SocialLink
                    key={link.platform}
                    platform={link.platform}
                    url={link.url}
                    label={link.label}
                  />
                ))}
              </div>

              {/* Decorative quote block */}
              <div className="mt-8 -rotate-1 border-neo-lg border-structural rounded-neo bg-cyan p-5 font-heading font-bold text-structural shadow-neo">
                &ldquo;Build functional things, ship them, iterate.&rdquo;
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
