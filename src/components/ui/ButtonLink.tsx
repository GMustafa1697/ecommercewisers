import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "border border-border text-foreground hover:border-muted hover:bg-surface",
} as const;

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

/** A link styled as a button. Internal hrefs ("/…") use next/link; mailto: and external ones use <a>. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "lg",
  className,
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors ease-out",
    variants[variant],
    sizes[size],
    className,
  );

  if (href.startsWith("/")) {
    return <Link href={href} className={classes} {...props} />;
  }
  return <a href={href} className={classes} {...props} />;
}
