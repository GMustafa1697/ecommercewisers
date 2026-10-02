"use client";

import { useActionState } from "react";
import { type ContactState, sendMessage } from "@/components/sections/sendMessage";
import { buttonClass } from "@/components/ui/ButtonLink";
import { checkFields, fields, notSent, requiredNote, submit } from "@/data/contact";
import { cn } from "@/lib/cn";

type ContactFormProps = {
  /** Where to write instead while the form can't send. */
  email: string;
  emailHref: string;
};

// The fields' maxLength (data/contact.ts) uses the same limits as sendMessage.ts, which checks
// everything again on the server.
const fieldClass = "mt-2 block w-full rounded-md border border-muted bg-background px-4 text-base text-foreground";

const initialState: ContactState = { status: "idle" };

/**
 * The contact form. The browser checks the fields first (required, type="email"); the Server Action
 * checks them again. There's no SMTP yet, so a valid message isn't sent and the form says so. The
 * typed values come back as defaultValue, so React's reset after the action doesn't clear them.
 */
export function ContactForm({ email, emailHref }: ContactFormProps) {
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
          defaultValue: state.status === "idle" ? undefined : state.fields[field.name],
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
        {state.status === "not-sent" && (
          <p className="rounded-md border border-border bg-background p-4 text-sm leading-relaxed">
            {notSent}{" "}
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
