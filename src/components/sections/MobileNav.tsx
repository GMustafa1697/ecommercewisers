"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import type { Cta, NavItem } from "@/content/site";

type MobileNavProps = {
  items: NavItem[];
  cta: Cta;
};

/** Disclosure menu below md. Closes on link click or Escape (focus returns to the toggle). */
export function MobileNav({ items, cta }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
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
        className="absolute inset-x-0 top-full border-b border-border bg-background"
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
