"use server";

import { contactErrors as errorText, contactLimits as limits } from "@/data/contact";
import { sendMail } from "@/lib/mailer";

type Field = "name" | "email" | "message";
type Fields = Record<Field, string>;

/**
 * What the contact form shows after a submit. `fields` keeps what was typed when nothing was sent; a
 * sent message returns none, so React's reset after the action clears the form.
 */
export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<Field, string>>; fields: Fields }
  | { status: "sent" }
  | { status: "failed"; fields: Fields };

// No whitespace anywhere, so line breaks can't reach email headers (Reply-To).
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Control characters, line breaks included: the name may end up in a header (From name, Subject).
const hasControlCharacter = (value: string) =>
  [...value].some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127;
  });

// The visitor's words go into the HTML body, so they're escaped.
const htmlEntities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => htmlEntities[character]);

/**
 * The contact form's Server Action. It's a public POST endpoint, so every value is checked here
 * again, whatever the browser did. A valid message is sent by SMTP (lib/mailer.ts) to MAIL_TO, with
 * Reply-To set to the visitor.
 */
export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const read = (field: Field) => {
    const value = formData.get(field);
    return typeof value === "string" ? value.trim() : "";
  };
  const fields: Fields = { name: read("name"), email: read("email"), message: read("message") };

  // The honeypot (ContactForm's hidden "website" field): people never see it, so a value means a bot.
  // Nothing is sent, and the answer is the usual one, so the bot can't tell.
  if (formData.get("website")) return { status: "sent" };

  const errors: Partial<Record<Field, string>> = {};
  if (!fields.name) errors.name = errorText.nameMissing;
  else if (hasControlCharacter(fields.name)) errors.name = errorText.nameOneLine;
  else if (fields.name.length > limits.name) errors.name = errorText.nameTooLong;
  if (!emailPattern.test(fields.email) || fields.email.length > limits.email) errors.email = errorText.email;
  if (!fields.message) errors.message = errorText.messageMissing;
  else if (fields.message.length > limits.message) errors.message = errorText.messageTooLong;

  if (Object.keys(errors).length > 0) return { status: "invalid", errors, fields };

  const { name, email, message } = fields;
  try {
    await sendMail({
      subject: `New enquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
  } catch (error) {
    // The real reason stays in the server log (never the visitor's message); the visitor sees a
    // generic failure with the email address to write to instead. One string, so every log sink
    // (the terminal, Next's dev log file, a host's logs) keeps all of it.
    const { code, command, responseCode } = error as { code?: string; command?: string; responseCode?: number };
    const reason = error instanceof Error ? error.message : String(error);
    console.error(
      `[contact] SMTP send failed: code=${code ?? "-"} command=${command ?? "-"} responseCode=${responseCode ?? "-"} message=${reason}`,
    );
    return { status: "failed", fields };
  }
  return { status: "sent" };
}
