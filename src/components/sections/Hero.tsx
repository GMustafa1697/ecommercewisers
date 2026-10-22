import { ButtonContent } from "@/components/ui/ButtonContent";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { startProject } from "@/lib/site";

// Content: edit the texts and links here. Your reference copy, word for word (2026-10-01, your
// choice). The primary button is the shared "Start a project" link in lib/site.ts.

const eyebrow = "Design, build, optimize";

/** The H1, in three parts: the highlight is drawn in the accent colour (gold on the dark Hero). */
const title = { lead: "Tailor-made stores built ", highlight: "your way", tail: ", from scratch." };

const intro =
  "We design and hand-build custom Shopify themes, Shopify apps, WordPress sites and UI/UX — no cookie-cutter templates, no page builders. Every line of code is written for your business.";

const secondaryCta = { label: "See how we work", href: "/#process" };

/** The code scene: Why ecommercewisers' code-dark-v2.lottie, copied with its orbit ring and seven small
    dots recoloured from near-black to the palette's muted grey (2026-10-22, your request), since they vanished on this
    dark background; Why keeps the original on white. Frame 359 of 480 has the phone, the code lines and
    five badges at rest on screen, which is what a reduced-motion visitor sees. A replaced animation gets
    a new file name, because browsers and CDNs cache it for a day (next.config.ts). */
const animation = { src: "/animations/code-hero.lottie", stillFrame: 359 };

/**
 * The dark hero (2026-10-01, your reference). It starts under the floating header (-mt by the header's
 * height, added back to the top padding), so the page is dark from the very top.
 *
 * Two columns (2026-10-21, your requests "make to partitions, right side all text heading all old
 * stuff just add lottie animation", then "leftside bigger then right small make left side tittle
 * small and right side big", then "make it right animation liitie small"): the text on the left, the
 * code scene on the right. The columns are equal, so the scene fills its half and sits inside the
 * page instead of running into the right edge, and the H1 is 48px.
 *
 * The columns split at xl (1280px), not lg: at 1024 the text column would be 358px, too narrow for
 * the H1 and the two buttons beside it. Below xl the columns stack, the text first and the scene
 * under it, so the scene is never above the headline on a phone.
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
        <div className="grid gap-12 xl:grid-cols-2 xl:items-center xl:gap-16">
          {/* Centred while the columns stack (below xl), like the scene under it; left-aligned from
              xl, where the scene sits beside the text. */}
          <div className="text-center xl:text-left">
            {/* A hairline gold rule over the eyebrow: a quiet, confident mark. */}
            <div aria-hidden="true" className="mx-auto mb-6 h-px w-12 bg-primary xl:mx-0" />
            <Eyebrow className="mx-auto xl:mx-0">{eyebrow}</Eyebrow>
            <h1
              id="hero-title"
              className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
            >
              {title.lead}
              <span className="text-accent">{title.highlight}</span>
              {title.tail}
            </h1>
            {/* 800px: the cap keeps the measure comfortable when the columns stack below xl. */}
            <p className="mx-auto mt-6 max-w-200 text-base leading-relaxed text-muted lg:text-lg xl:mx-0">
              {intro}
            </p>
            {/* Full width and stacked on phones, side by side from sm: centred while the columns
                stack, at the start of the text column from xl. */}
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center xl:justify-start">
              <ButtonLink href={startProject.href}>
                <ButtonContent>{startProject.label}</ButtonContent>
              </ButtonLink>
              <ButtonLink href={secondaryCta.href} variant="secondary">
                <ButtonContent>{secondaryCta.label}</ButtonContent>
              </ButtonLink>
            </div>
          </div>
          {/* The code scene, transparent on the dark Hero: the gold arc, the white phone and the code
              lines carry it, and the dark monitor bezels read as shadow (1.07:1 against the black).
              4:3 with `cover` crops the square canvas's empty top and bottom only: the scene spans
              ~20–78% of its height. From xl it fills its half of the grid (656px at 1440); below
              that it keeps the 560px cap, as in the Why section. */}
          <div className="flex items-center">
            <LottieAnimation
              src={animation.src}
              stillFrame={animation.stillFrame}
              fit="cover"
              className="mx-auto aspect-4/3 w-full max-w-140 xl:max-w-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
