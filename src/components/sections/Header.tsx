import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { MobileNav } from "@/components/sections/MobileNav";
import { nav, startProject } from "@/content/site";

export function Header() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-60 focus:inline-flex focus:h-11 focus:items-center focus:rounded-md focus:bg-primary focus:px-4 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <Container className="flex h-(--header-height) items-center justify-between gap-6">
          {/* "/#top": a plain "/" keeps the scroll position when already on the homepage. */}
          <Link href="/#top" className="flex h-11 items-center">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex h-11 min-w-11 items-center justify-center text-sm text-muted transition-colors ease-out hover:text-foreground"
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

          <MobileNav items={nav} cta={startProject} />
        </Container>
      </header>
    </>
  );
}
