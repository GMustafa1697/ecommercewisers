"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

type TopLinkProps = {
  className?: string;
  /** The logo. Its role="img" label names the link. */
  children: ReactNode;
};

/**
 * The logos' link to the top of the homepage (Header and Footer). "/#top", not "/": a plain "/" keeps
 * the scroll position when already on the homepage. Next's router only scrolls when the hash changes,
 * so once the URL is /#top a second click did nothing; then this scrolls to the top itself.
 */
export function TopLink({ className, children }: TopLinkProps) {
  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    // Leave modified clicks (new tab, new window) to the browser.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (location.pathname === "/" && location.hash === "#top") {
      event.preventDefault();
      // No behavior given, so it follows html's scroll-behavior: smooth, and instant under reduced motion.
      window.scrollTo({ top: 0 });
    }
  }

  return (
    <Link href="/#top" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
