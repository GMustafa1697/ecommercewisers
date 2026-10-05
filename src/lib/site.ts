// The content several sections share, kept once. Everything else lives at the top of its own section
// file. These can't: the Header and Contact are client files, and server code (the Hero, Services,
// Footer and the form's Server Action) can't read values exported from a client file.

// PLACEHOLDER: replace with the real address before deploy (docs/PROGRESS.md → Known issues).
/** The email: the Contact section and the Footer show it. */
export const contact = { email: "hello@ecomwisers.ca" };
export const contactHref = `mailto:${contact.email}?subject=Project%20enquiry`;

/** The site's "Start a project" link. It scrolls to the Contact section; the Header, Hero and Services use it. */
export const startProject = { label: "Start a project", href: "/#contact" };

/** The form's length limits: the browser's maxLength and the server's checks both use them. 254 is the longest valid email address. */
export const contactLimits = { name: 100, email: 254, message: 5000 } as const;

export type NavItem = { label: string; href: `/#${string}` };

/**
 * The nav links, in the Header and the Footer. In-page anchors only: no links to future pages (CLAUDE.md).
 * "Work" needs at least one project in PortfolioPreview.tsx, or its section isn't on the page.
 */
export const nav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Why us", href: "/#why" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];
