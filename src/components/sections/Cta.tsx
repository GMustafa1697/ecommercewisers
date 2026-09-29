import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ctaSection } from "@/content/site";

export function Cta() {
  const { title, text, button } = ctaSection;

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-8 rounded-lg border border-border bg-surface p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <SectionHeading id="contact-title" title={title} intro={text} />
          {/* mailto: with the placeholder email from site.ts (blocks deploy). */}
          <ButtonLink href={button.href} className="shrink-0">
            {button.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
