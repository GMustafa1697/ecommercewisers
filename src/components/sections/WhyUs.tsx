import type { ComponentType } from "react";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { IconTile } from "@/components/ui/IconTile";
import { BagIcon, BoltIcon, CodeIcon, type IconProps, RouteIcon } from "@/components/ui/icons";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Content: edit the texts, icons and animation here.

/** `icon` is one of the generic icons in components/ui/icons.tsx. */
type Point = { title: string; description: string; icon: ComponentType<IconProps> };

const eyebrow = "Why ecommercewisers";
const title = "What working with us looks like";

/** The code scene; frame 359 of 480 has the phone, the code lines and five badges at rest on screen.
    The file name carries a version: a replaced animation gets a new one, because browsers and CDNs
    cache it for a day (next.config.ts) and would otherwise keep serving the old copy. */
const animation = { src: "/animations/code-dark-v2.lottie", stillFrame: 359 };

const points: Point[] = [
  { title: "Performance first", description: "Pages built to load fast on real phones.", icon: BoltIcon },
  {
    title: "E-commerce focus",
    description: "Catalogs, product pages, checkout and the content around them.",
    icon: BagIcon,
  },
  {
    title: "A clear process",
    description: "You approve a plan before we build, and see progress at every step.",
    icon: RouteIcon,
  },
  { title: "Maintainable code", description: "Typed, documented code your team can build on.", icon: CodeIcon },
];

/** The Why bento: the code animation and four point cards. */
export function WhyUs() {
  return (
    <Section id="why">
      <SectionHeading id="why-title" eyebrow={eyebrow} title={title} />
      {/* A bento: the 2×2 cards and the animation panel share one gap. Side by side from xl only.
          Black cards (.theme-dark, 2026-10-22, your request: the look their hover had), like the
          Features cards; every icon sits on a solid gold tile. */}
      <div className="mt-12 grid gap-6 md:gap-8 lg:mt-16 xl:grid-cols-2">
        <div className="flex items-center p-6 sm:p-8">
          {/* 4:3 with `cover` crops the square canvas's empty top and bottom only: the scene spans
              ~20–78% of its height. */}
          <LottieAnimation
            src={animation.src}
            stillFrame={animation.stillFrame}
            fit="cover"
            className="mx-auto aspect-4/3 w-full max-w-140"
          />
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 md:gap-8">
          {points.map((item) => (
            <FeatureItem
              key={item.title}
              marker={<IconTile icon={item.icon} />}
              title={item.title}
              description={item.description}
              className="theme-dark rounded-lg border border-border p-6 md:p-8"
            />
          ))}
        </ul>
      </div>
    </Section>
  );
}
