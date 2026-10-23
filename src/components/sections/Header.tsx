"use client";

import Link from "next/link";
import { type FocusEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { ButtonContent, swapEase, swapMotion } from "@/components/ui/ButtonContent";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { TopLink } from "@/components/ui/TopLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { atLeast } from "@/lib/breakpoints";
import { cn } from "@/lib/cn";
import { nav, startProject } from "@/lib/site";

// Content: edit the texts here. The nav links and the button are shared with other sections, in lib/site.ts.

/** The keyboard skip link, the first thing Tab reaches. */
const skipLink = "Skip to content";

/** The mobile menu button's accessible name. */
const menuLabel = "Menu";

type NavLink = { label: string; href: string };

type MobileNavProps = {
  items: NavLink[];
  cta: NavLink;
  /** The toggle button's accessible name (menuLabel). */
  label: string;
};

/**
 * Disclosure menu below md. Closes on a link click, Escape (focus returns to the toggle),
 * a tap outside it, focus moving out of it, or the window widening past md.
 *
 * The panel slides in from the left as it fades in, and back out on closing, on the CTA arrow's curve,
 * like the toggle's ☰/✕. While open it wears the CTA spin ring around its whole border, always spinning
 * (globals.css → .btn-ring-on), since phones have no hover.
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
        className="-mr-2.5 inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors ease-out hover:bg-surface"
      >
        {/* ☰ and ✕ swap like the CTA arrow: the one leaving slides up out of the clipped box as the
            other rises into place. No motion-safe: it's a change of state, so under reduced motion it
            still happens, instantly (the global 0s transition). */}
        <span className="relative size-6 overflow-hidden" aria-hidden="true">
          <MenuIcon className={cn("absolute inset-0 size-full", swapMotion, open && "-translate-y-[150%]")} />
          <CloseIcon className={cn("absolute inset-0 size-full", swapMotion, !open && "translate-y-[150%]")} />
        </span>
      </button>

      {/* The frame wears the ring (btn-secondary's gold) over its 2px border; the list scrolls inside
          it, since overflow would clip the ring at the padding edge. The list's height cap allows for
          the borders' 4px, so the panel still ends 12px above the viewport's bottom.
          Closed, it waits off the left edge, transparent and invisible (out of the tab order and the
          accessibility tree, as `hidden` was, which can't animate). Visibility turns on at once when
          it opens and off only once it has slid out. */}
      <div
        id="mobile-menu"
        data-open={open || undefined}
        className={cn(
          "btn-secondary absolute inset-x-0 top-full isolate mt-2 rounded-lg border-2 border-border bg-background transition-[translate,opacity,visibility]",
          swapEase,
          open ? "btn-ring-on" : "invisible -translate-x-full opacity-0",
        )}
      >
        <span className="btn-ring" aria-hidden="true" />
        <div className="relative z-1 max-h-[calc(100dvh-var(--header-height)-1.5rem)] overflow-y-auto overscroll-contain">
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
              <ButtonContent>{cta.label}</ButtonContent>
            </ButtonLink>
          </Container>
        </div>
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

/** The skip link and the floating dark glass bar. */
export function Header() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-60 focus:inline-flex focus:h-11 focus:items-center focus:rounded-md focus:bg-primary focus:px-4 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        {skipLink}
      </a>

      {/* A dark glass pill (2026-10-22, your request, like the CTA buttons) in the 1440px container,
          floating just below the top. It hides while scrolling down and returns on scrolling up
          (ScrollHeader). */}
      <ScrollHeader>
        <Container className="h-full">
          <div className="theme-dark pointer-events-auto relative flex h-full items-center justify-between gap-6 rounded-full border border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
            <TopLink className="flex h-11 items-center">
              <Wordmark />
            </TopLink>

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
                <ButtonContent>{startProject.label}</ButtonContent>
              </ButtonLink>
            </div>

            <MobileNav items={nav} cta={startProject} label={menuLabel} />
          </div>
        </Container>
      </ScrollHeader>
    </>
  );
}
