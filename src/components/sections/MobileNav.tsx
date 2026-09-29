"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import type { Cta, NavItem } from "@/content/site";

type MobileNavProps = {
  items: NavItem[];
  cta: Cta;
};

/**
 * Disclosure menu below md. Closes on a link click, Escape (focus returns to the toggle),
 * a tap outside it, or focus moving out of it.
 */
export function MobileNav({ items, cta }: MobileNavProps) {
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
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
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
        aria-label="Menu"
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
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-height))] overflow-y-auto overscroll-contain border-b border-border bg-background"
      >
        <Container className="pb-6">
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
