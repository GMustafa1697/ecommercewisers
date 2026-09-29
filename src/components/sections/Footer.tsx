import Link from "next/link";
import { FooterColumn } from "@/components/sections/FooterColumn";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import {
  contact,
  contactHref,
  footerSection,
  nav,
  servicesSection,
  site,
  socials,
} from "@/content/site";

// Set when the page is built (it is static), so a rebuild updates it.
const year = new Date().getFullYear();

// DESIGN.md text link, with a 44×44px minimum target.
const linkClass =
  "inline-flex min-h-11 min-w-11 items-center text-sm text-foreground underline-offset-4 hover:underline";

export function Footer() {
  const { navTitle, servicesTitle, contactTitle, rights } = footerSection;

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{site.description}</p>
          </div>

          <nav aria-label="Footer">
            <FooterColumn title={navTitle}>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>
          </nav>

          <FooterColumn title={servicesTitle}>
            {servicesSection.items.map((item) => (
              <li key={item.title}>
                <Link href="/#services" className={linkClass}>
                  {item.title}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title={contactTitle}>
            {/* PLACEHOLDER email until the real one arrives (blocks deploy). */}
            <li>
              <a href={contactHref} className={linkClass}>
                {contact.email}
              </a>
            </li>
            {socials.map((social) => (
              <li key={social.href}>
                <a href={social.href} className={linkClass}>
                  {social.label}
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <p className="mt-12 border-t border-border pt-6 text-sm text-muted">
          © {year} {site.name}. {rights}
        </p>
      </Container>
    </footer>
  );
}
