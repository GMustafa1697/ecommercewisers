import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { IconTile } from "@/components/ui/IconTile";
import { CheckIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { startProject } from "@/data/contact";
import { eyebrow, intro, services, title } from "@/data/services";

/** The sticky heading column and the stacking service cards. Content: data/services.ts. */
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
