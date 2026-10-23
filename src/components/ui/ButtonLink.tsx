import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

// Your buttons.html (2026-10-22): the gold button (primary) and the dark one (secondary), each a pill
// with a 2px rim. Their ring colours and rims are variables in globals.css (.btn-primary,
// .btn-secondary); ButtonContent draws the ring and the arrow.
const variants = {
  primary: "group btn-primary bg-primary text-primary-foreground border-(--btn-rest)",
  secondary: "group btn-secondary bg-background text-foreground border-(--btn-rest)",
} as const;

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-base",
  // The Hero's pair, side by side on phones: md's height and text with tighter padding below sm, lg from sm.
  responsive: "h-11 px-3 text-sm sm:h-13 sm:px-6 sm:text-base",
} as const;

type ButtonStyle = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

/** The button classes, shared by ButtonLink and real <button>s (the contact form's submit). */
export function buttonClass({ variant = "primary", size = "lg" }: ButtonStyle = {}) {
  return cn(
    "relative isolate inline-flex items-center justify-center gap-2 rounded-full border-2 font-semibold",
    variants[variant],
    sizes[size],
  );
}

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & ButtonStyle & { href: string };

/** A link styled as a button. Internal hrefs ("/…", not "//host") use next/link; mailto: and external ones use <a>. */
export function ButtonLink({ href, variant, size, className, ...props }: ButtonLinkProps) {
  const classes = cn(buttonClass({ variant, size }), className);

  if (href.startsWith("/") && !href.startsWith("//")) {
    return <Link href={href} className={classes} {...props} />;
  }
  return <a href={href} className={classes} {...props} />;
}
