import { ContactForm } from "@/components/sections/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact, contactHref, emailLabel, eyebrow, intro, title } from "@/data/contact";

/**
 * The contact section (2026-10-02, your screenshot; it replaced the CTA): on one light-grey panel,
 * the heading and email on the left, the form on the right (stacked below lg). Content: data/contact.ts.
 */
export function Contact() {
  return (
    <Section id="contact">
      <div className="grid gap-10 rounded-lg border border-border bg-surface p-6 md:p-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading id="contact-title" eyebrow={eyebrow} title={title} intro={intro} />
          {/* mailto: with the placeholder email above (blocks deploy). The label matches the footer's column titles. */}
          <div className="mt-8">
            <Eyebrow variant="label">{emailLabel}</Eyebrow>
            <a
              href={contactHref}
              className="mt-1 inline-flex min-h-11 items-center text-lg font-medium underline-offset-4 hover:underline"
            >
              {contact.email}
            </a>
          </div>
        </div>
        <ContactForm email={contact.email} emailHref={contactHref} />
      </div>
    </Section>
  );
}
