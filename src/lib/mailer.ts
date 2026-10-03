import "server-only";
import { createTransport } from "nodemailer";

// The SMTP account the contact form sends through: set in .env.local (the keys are in .env.example),
// never in code. MAIL_TO may list several addresses, comma-separated.
const KEYS = ["SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASS", "MAIL_FROM", "MAIL_TO"] as const;
type Key = (typeof KEYS)[number];

type Mail = {
  subject: string;
  text: string;
  html: string;
  /** The visitor's address, so a reply goes straight to them. */
  replyTo: string;
};

/** The settings, or an error naming the missing keys (never their values). */
function settings(): Record<Key, string> {
  const missing = KEYS.filter((key) => !process.env[key]);
  if (missing.length > 0) throw new Error(`Missing SMTP settings: ${missing.join(", ")}`);
  return Object.fromEntries(KEYS.map((key) => [key, process.env[key]])) as Record<Key, string>;
}

/**
 * Sends one message from MAIL_FROM to MAIL_TO. The transporter is made per send, not cached, so a
 * changed .env.local applies without a restart; a contact form sends rarely.
 */
export async function sendMail({ subject, text, html, replyTo }: Mail) {
  const env = settings();
  const transporter = createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    secure: env.SMTP_SECURE === "true",
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });
  await transporter.sendMail({ from: env.MAIL_FROM, to: env.MAIL_TO, replyTo, subject, text, html });
}
