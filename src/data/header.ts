import { projects } from "@/data/portfolio";

// The Header's content. The button is the shared "Start a project" link in data/contact.ts.

export type NavItem = { label: string; href: `/#${string}` };

// In-page anchors only: no links to future pages (CLAUDE.md).
const allNav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Why us", href: "/#why" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

/** The nav links, shared with the Footer. "Work" is hidden while there are no confirmed projects. */
export const nav = allNav.filter((item) => item.href !== "/#work" || projects.length > 0);

/** The keyboard skip link, the first thing Tab reaches. */
export const skipLink = "Skip to content";

/** The mobile menu button's accessible name. */
export const menuLabel = "Menu";
