import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { startProject } from "@/data/contact";
import { eyebrow, intro, secondaryCta, title } from "@/data/hero";

/**
 * The dark hero (2026-10-01, your reference). It starts under the floating header (-mt by the header's
 * height, added back to the top padding), so the page is dark from the very top. Centred over the dot
 * grid (2026-10-02, your choice), since it's text only: left-aligned, its right half stood empty.
 * Content: data/hero.ts.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="theme-dark relative -mt-(--header-height) overflow-hidden pt-[calc(var(--header-height)+6rem)] pb-24 md:pt-[calc(var(--header-height)+10rem)] md:pb-40"
    >
      {/* A faint dot grid: white at 10%, decorative, drawn with an SVG pattern. */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full text-foreground/10">
        <defs>
          <pattern id="hero-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>
      <Container className="relative">
        <div className="mx-auto max-w-5xl text-center">
          {/* A hairline gold rule over the eyebrow: a quiet, confident mark. */}
          <div aria-hidden="true" className="mx-auto mb-6 h-px w-12 bg-primary" />
          <Eyebrow className="mx-auto">{eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {title.lead}
            <span className="text-accent">{title.highlight}</span>
            {title.tail}
          </h1>
          {/* 800px: on desktop the two lines break as in your reference, before the dash. */}
          <p className="mx-auto mt-6 max-w-200 text-base leading-relaxed text-muted lg:text-lg">{intro}</p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <ButtonLink href={startProject.href}>{startProject.label}</ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
