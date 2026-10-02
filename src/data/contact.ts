// The Contact section's content, and the contact details the Header, Hero, Services and Footer share.

// PLACEHOLDER: replace with the real address before deploy (docs/PROGRESS.md → Known issues).
export const contact = { email: "hello@example.com" };
export const contactHref = `mailto:${contact.email}?subject=Project%20enquiry`;

/** The site's "Start a project" link. It scrolls to the Contact section; the Header, Hero and Services use it. */
export const startProject = { label: "Start a project", href: "/#contact" };

// The heading and email (2026-10-02, your screenshot; it replaced the CTA). The WhatsApp number and
// address from the screenshot wait for real ones.
export const eyebrow = "Contact";
export const title = "Get in touch";
export const intro = "Have a project in mind? Tell us about it and we'll reply with next steps.";
export const emailLabel = "Email";

/** The form's length limits: the browser's maxLength and the server's checks both use them. 254 is the longest valid email address. */
export const contactLimits = { name: 100, email: 254, message: 5000 } as const;

// The form.
export const requiredNote = "All fields are required.";
export const submit = { label: "Send message", pending: "Sending…" };
export const checkFields = "Check the fields marked above.";
export const notSent = "Sending isn't set up yet, so your message wasn't sent. Please email us at";
export const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name", maxLength: contactLimits.name },
  { name: "email", label: "Email", type: "email", autoComplete: "email", maxLength: contactLimits.email },
  { name: "message", label: "Message", maxLength: contactLimits.message },
] as const;

/** The server's answers to invalid fields, shown under each field. */
export const contactErrors = {
  nameMissing: "Enter your name.",
  nameOneLine: "Enter your name on one line.",
  nameTooLong: `Keep your name under ${contactLimits.name} characters.`,
  email: "Enter a valid email address.",
  messageMissing: "Enter a message.",
  messageTooLong: `Keep your message under ${contactLimits.message} characters.`,
};
