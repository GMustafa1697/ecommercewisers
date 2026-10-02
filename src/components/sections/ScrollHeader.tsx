"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

// Scroll steps smaller than this are ignored, so trackpad jitter doesn't flicker the header.
const MIN_STEP = 8;

type ScrollHeaderProps = {
  children: ReactNode;
};

/**
 * The sticky header: a transparent wrapper (clicks pass through its margins) around the floating
 * glass bar. Scrolling down hides it (it slides up and fades out); scrolling up brings it back. This
 * only sets data-hidden: .site-header in globals.css does the motion, and keeps the header shown
 * while focus is inside it or the mobile menu is open.
 */
export function ScrollHeader({ children }: ScrollHeaderProps) {
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    function update() {
      frame = 0;
      const y = window.scrollY;
      // Near the top of the page the header always shows: within its own height (--header-height).
      if (y <= (headerRef.current?.offsetHeight ?? 0)) {
        setHidden(false);
        lastY = y;
      } else if (Math.abs(y - lastY) >= MIN_STEP) {
        setHidden(y > lastY);
        lastY = y;
      }
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      data-hidden={hidden || undefined}
      className="site-header pointer-events-none sticky top-0 z-50 h-(--header-height) pt-3"
    >
      {children}
    </header>
  );
}
