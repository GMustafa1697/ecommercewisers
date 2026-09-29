import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { heroSection } from "@/content/site";

export function Hero() {
  const { eyebrow, title, intro, primaryCta, secondaryCta } = heroSection;

  return (
    <section aria-labelledby="hero-title" className="py-20 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-muted lg:text-lg">{intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
