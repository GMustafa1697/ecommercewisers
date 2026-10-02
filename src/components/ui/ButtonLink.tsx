import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
  secondary: "border border-border bg-transparent text-foreground hover:border-muted hover:bg-surface",
} as const;

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

type ButtonStyle = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

/** The button classes, shared by ButtonLink and real <button>s (the contact form's submit). */
export function buttonClass({ variant = "primary", size = "lg" }: ButtonStyle = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0 active:shadow-none motion-reduce:transition-colors motion-reduce:hover:translate-y-0",
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
