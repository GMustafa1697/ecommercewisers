import type { ComponentType, CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { IconTile } from "@/components/ui/IconTile";
import { BagIcon, CheckIcon, CodeIcon, type IconProps, LayoutIcon, PenIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { startProject } from "@/lib/site";

// Content: edit the texts and icons here. The button is the shared "Start a project" link in lib/site.ts.

/** `icon` is one of the generic icons in components/ui/icons.tsx; `points` is the card's checklist. */
type Service = { title: string; description: string; icon: ComponentType<IconProps>; points: string[] };

const eyebrow = "What we do";
const title = "Custom solutions for every part of your online store";
const intro = "Every project is built around your products, your brand and your exact requirements.";

/** The four services (CLAUDE.md). The Footer lists their names too. */
export const services: Service[] = [
  {
    title: "Shopify Development",
    description: "Shopify stores built or customised to fit your products and brand.",
    icon: BagIcon,
    points: [
      "Theme customisation and new store builds",
      "Product, collection and cart pages",
      "App setup and integrations",
    ],
  },
  {
    title: "WordPress Development",
    description: "WordPress sites and stores your team can manage with ease.",
    icon: LayoutIcon,
    points: [
      "Custom themes and page layouts",
      "WooCommerce stores",
      "Content your team can edit without a developer",
    ],
  },
  {
    title: "Next.js Development",
    description: "Custom storefronts and web apps built for speed.",
    icon: CodeIcon,
    points: ["Headless storefronts", "Fast, statically rendered pages", "Typed, maintainable code"],
  },
  {
    title: "Figma to Web",
    description: "Your Figma designs turned into responsive, production-ready pages.",
    icon: PenIcon,
    points: [
      "Responsive layouts from mobile to desktop",
      "Reusable components that match your design",
      "Accessible, semantic markup",
    ],
  },
];

/** The sticky heading column and the stacking service cards. */
export function Services() {
  return (
    <Section id="services" dark>
      <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
          <SectionHeading id="services-title" eyebrow={eyebrow} title={title} intro={intro} />
          <ButtonLink href={startProject.href} className="mt-8 w-full sm:w-auto">
            {startProject.label}
          </ButtonLink>
        </div>
        {/* Sticky stacking: each card sticks 1rem below the previous one, so the stack shows their top edges,
            and shrinks as later cards land on it; once the last lands, the finished deck holds briefly
            before scrolling away (.services-stack in globals.css). CSS only. Off on short viewports,
            where a stuck card would hide its own checklist. The cards are white (.theme-light) on the
            dark section, so their text and icons use the light values. */}
        <ul
          style={{ "--stack-count": services.length } as CSSProperties}
          className="services-stack flex flex-col gap-(--stack-gap)"
        >
          {services.map((item, index) => (
            <FeatureItem
              key={item.title}
              marker={<IconTile icon={item.icon} />}
              title={item.title}
              description={item.description}
              style={{ "--stack-index": index } as CSSProperties}
              className="top-[calc(var(--header-height)+2rem+var(--stack-index)*1rem)] theme-light rounded-lg border border-border p-6 md:p-8 [@media(min-height:36rem)]:sticky"
            >
              {/* Phones: the list is centred as a block (as wide as its longest row), its rows left-aligned. */}
              <ul className="mx-auto mt-6 w-fit space-y-3 text-left sm:mx-0 sm:w-auto">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-muted">
                    <CheckIcon className="size-5 shrink-0 text-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </FeatureItem>
          ))}
        </ul>
      </div>
    </Section>
  );
}
