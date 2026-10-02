import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileNav } from "@/components/sections/MobileNav";
import { ScrollHeader } from "@/components/sections/ScrollHeader";
import { startProject } from "@/data/contact";
import { menuLabel, nav, skipLink } from "@/data/header";

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
