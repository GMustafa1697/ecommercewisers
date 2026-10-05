"use client";

import { useActionState } from "react";
import { type ContactState, sendMessage } from "@/components/sections/sendMessage";
import { buttonClass } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { contact, contactHref, contactLimits } from "@/lib/site";

// Content: edit the texts here. The email and the form limits are shared, in lib/site.ts; the error
// texts are in sendMessage.ts.

// The heading and email (2026-10-02, your screenshot; it replaced the CTA). The WhatsApp number and
// address from the screenshot wait for real ones.
const eyebrow = "Contact";
const title = "Get in touch";
const intro = "Have a project in mind? Tell us about it and we'll reply with next steps.";
const emailLabel = "Email";

// The form.
const requiredNote = "All fields are required.";
const submit = { label: "Send message", pending: "Sending…" };
const checkFields = "Check the fields marked above.";
const sentNote = "Thanks, your message was sent. We'll reply by email.";
/** Shown when sending fails; the email link follows it. */
const failedNote = "Something went wrong and your message wasn't sent. Please try again, or email us at";
const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", maxLength: contactLimits.name },
  { name: "email", label: "Email", type: "email", autoComplete: "email", maxLength: contactLimits.email },
  { name: "message", label: "Message", maxLength: contactLimits.message },
] as const;

type ContactFormProps = {
  /** Where to write instead when sending fails. */
  email: string;
  emailHref: string;
};

// The fields' maxLength (contactLimits) is the same as sendMessage.ts's limits, which check
// everything again on the server.
const fieldClass = "mt-2 block w-full rounded-md border border-muted bg-background px-4 text-base text-foreground";

const initialState: ContactState = { status: "idle" };

/**
 * The contact form. The browser checks the fields first (required, type="email"); the Server Action
 * checks them again and sends the message by SMTP. When it's sent, React's reset after the action
 * clears the form. When it's invalid or sending fails, the typed values come back as defaultValue, so
 * the reset doesn't lose them.
 */
function ContactForm({ email, emailHref }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const errors = state.status === "invalid" ? state.errors : {};

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <p className="text-sm text-muted">{requiredNote}</p>
      {fields.map((field) => {
        const id = `contact-${field.name}`;
        const error = errors[field.name];
        const shared = {
          id,
          name: field.name,
          required: true,
          maxLength: field.maxLength,
          defaultValue: "fields" in state ? state.fields[field.name] : undefined,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? `${id}-error` : undefined,
        };
        return (
          <div key={field.name}>
            <label htmlFor={id} className="text-sm font-medium">
              {field.label}
            </label>
            {field.name === "message" ? (
              <textarea {...shared} rows={6} className={cn(fieldClass, "resize-y py-3")} />
            ) : (
              <input {...shared} type={field.type} autoComplete={field.autoComplete} className={cn(fieldClass, "h-12")} />
            )}
            {error && (
              <p id={`${id}-error`} className="mt-2 text-sm font-medium">
                {error}
              </p>
            )}
          </div>
        );
      })}
      {/* A honeypot against bots: hidden from sight and screen readers, and out of the Tab order, so
          only a bot fills it in. sendMessage then sends nothing (and answers as usual). */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {/* Always rendered, so screen readers announce what appears in it. */}
      <div role="status">
        {state.status === "invalid" && <p className="text-sm font-medium">{checkFields}</p>}
        {state.status === "sent" && (
          <p className="rounded-md border border-border bg-background p-4 text-sm leading-relaxed">{sentNote}</p>
        )}
        {state.status === "failed" && (
          <p className="rounded-md border border-border bg-background p-4 text-sm leading-relaxed">
            {failedNote}{" "}
            <a href={emailHref} className="font-medium underline underline-offset-4">
              {email}
            </a>
            .
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className={cn(buttonClass(), "cursor-pointer disabled:cursor-wait disabled:opacity-70 sm:self-start")}
      >
        {pending ? submit.pending : submit.label}
      </button>
    </form>
  );
}

/**
 * The contact section (2026-10-02, your screenshot; it replaced the CTA): on one light-grey panel,
 * the heading and email on the left, the form on the right (stacked below lg).
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
