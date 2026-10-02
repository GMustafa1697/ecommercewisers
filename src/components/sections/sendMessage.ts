"use server";

import { contactErrors as errorText, contactLimits as limits } from "@/data/contact";

type Field = "name" | "email" | "message";
type Fields = Record<Field, string>;

/** What the contact form shows after a submit. `fields` keeps what was typed, since nothing is sent. */
export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<Field, string>>; fields: Fields }
  | { status: "not-sent"; fields: Fields };

// No whitespace anywhere, so line breaks can't reach email headers (Reply-To) once SMTP sends it.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Control characters, line breaks included: the name may end up in a header (From name, Subject).
const hasControlCharacter = (value: string) =>
  [...value].some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127;
  });

/**
 * The contact form's Server Action. It's a public POST endpoint, so every value is checked here
 * again, whatever the browser did. No SMTP yet: a valid message is not sent (blocks deploy).
 */
export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const read = (field: Field) => {
    const value = formData.get(field);
    return typeof value === "string" ? value.trim() : "";
  };
  const fields: Fields = { name: read("name"), email: read("email"), message: read("message") };

  // The honeypot (ContactForm's hidden "website" field): people never see it, so a value means a bot.
  // Nothing is sent, and the answer is the usual one, so the bot can't tell.
  if (formData.get("website")) return { status: "not-sent", fields };

  const errors: Partial<Record<Field, string>> = {};
  if (!fields.name) errors.name = errorText.nameMissing;
  else if (hasControlCharacter(fields.name)) errors.name = errorText.nameOneLine;
  else if (fields.name.length > limits.name) errors.name = errorText.nameTooLong;
  if (!emailPattern.test(fields.email) || fields.email.length > limits.email) errors.email = errorText.email;
  if (!fields.message) errors.message = errorText.messageMissing;
  else if (fields.message.length > limits.message) errors.message = errorText.messageTooLong;

  if (Object.keys(errors).length > 0) return { status: "invalid", errors, fields };

  // Send the message here (SMTP or an email service) once it's set up.
  return { status: "not-sent", fields };
}
