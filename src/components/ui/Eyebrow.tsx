import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  // Every section eyebrow (SectionHeading) and the Hero's (2026-10-02, your screenshot): accent text on
  // a gold-tinted chip, a pill since 2026-10-22 (your request, like the buttons). Gold on the tint over
  // the dark background is 5.8:1; on the white page the accent is black.
  chip: "w-fit rounded-full bg-primary/15 px-3 py-1 font-medium text-accent ring-1 ring-inset ring-primary/25",
  // Small titles over a value or a list: the Contact email, the footer's column titles.
  label: "font-medium text-muted",
} as const;

type EyebrowProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  /** The element: a paragraph, or an h2 where the label titles a group (the footer columns). */
  as?: "p" | "h2";
  className?: string;
};

/** A small uppercase label: a gold-tinted chip above a heading, or a muted title over a value or list. */
export function Eyebrow({ children, variant = "chip", as: Tag = "p", className }: EyebrowProps) {
  return <Tag className={cn("text-xs uppercase tracking-widest", variants[variant], className)}>{children}</Tag>;
}
