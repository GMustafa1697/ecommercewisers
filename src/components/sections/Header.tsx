"use client";

import Link from "next/link";
import { type FocusEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { Wordmark } from "@/components/ui/Wordmark";
import { startProject } from "@/data/contact";
import { menuLabel, nav, skipLink } from "@/data/header";
import { atLeast } from "@/lib/breakpoints";

type NavLink = { label: string; href: string };

type MobileNavProps = {
  items: NavLink[];
  cta: NavLink;
  /** The toggle button's accessible name (data/header.ts). */
  label: string;
};

/**
 * Disclosure menu below md. Closes on a link click, Escape (focus returns to the toggle),
 * a tap outside it, focus moving out of it, or the window widening past md.
 */
function MobileNav({ items, cta, label }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    // Widening past md hides the menu (md:hidden) but would leave it "open", which keeps the header
    // from ever hiding on scroll (globals.css → .site-header). So it closes.
    const desktop = window.matchMedia(atLeast("md"));
    function onDesktop() {
      if (desktop.matches) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const close = () => setOpen(false);

  // Tab past the last link: focus has moved to something outside the menu.
  // (relatedTarget is null for a tap on empty space, which onPointerDown handles.)
  function onBlur(event: FocusEvent<HTMLDivElement>) {
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }

  return (
    <div ref={rootRef} onBlur={onBlur} className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="-mr-2.5 inline-flex size-11 items-center justify-center rounded-md text-foreground transition-colors ease-out hover:bg-surface"
      >
        {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-var(--header-height)-1.25rem)] overflow-y-auto overscroll-contain rounded-lg border border-border bg-background"
      >
        <Container className="pt-2 pb-6">
          <nav aria-label="Main">
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex h-12 items-center text-base font-medium text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink
            href={cta.href}
            onClick={close}
            variant="secondary"
            size="lg"
            className="mt-4 w-full"
          >
            {cta.label}
          </ButtonLink>
        </Container>
      </div>
    </div>
  );
}

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
function ScrollHeader({ children }: ScrollHeaderProps) {
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

/** The skip link and the floating dark glass bar. Content: data/header.ts. */
export function Header() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-60 focus:inline-flex focus:h-11 focus:items-center focus:rounded-md focus:bg-primary focus:px-4 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        {skipLink}
      </a>

      {/* A dark glass bar in the 1440px container, floating just below the top. It hides while
          scrolling down and returns on scrolling up (ScrollHeader). */}
      <ScrollHeader>
        <Container className="h-full">
          <div className="theme-dark pointer-events-auto relative flex h-full items-center justify-between gap-6 rounded-lg border border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
            {/* "/#top": a plain "/" keeps the scroll position when already on the homepage. */}
            <Link href="/#top" className="flex h-11 items-center">
              <Wordmark />
            </Link>

            {/* White at 70%, not text-muted: over white content the glass renders a mid grey, where
                the dark muted grey would be 3.2:1. This stays above 5:1 on any backdrop. */}
            <nav aria-label="Main" className="hidden md:block">
              <ul className="flex items-center gap-6 lg:gap-8">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex h-11 min-w-11 items-center justify-center text-sm text-foreground/70 transition-colors ease-out hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden md:block">
              <ButtonLink href={startProject.href} variant="secondary" size="md">
                {startProject.label}
              </ButtonLink>
            </div>

            <MobileNav items={nav} cta={startProject} label={menuLabel} />
          </div>
        </Container>
      </ScrollHeader>
    </>
  );
}
