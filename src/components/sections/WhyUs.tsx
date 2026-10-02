import { FeatureItem } from "@/components/ui/FeatureItem";
import { IconTile } from "@/components/ui/IconTile";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { animation, eyebrow, points, title } from "@/data/why";

/** The Why bento: the code animation and four point cards. Content: data/why.ts. */
export function WhyUs() {
  return (
    <Section id="why">
      <SectionHeading id="why-title" eyebrow={eyebrow} title={title} />
      {/* A bento: the 2×2 cards and the animation panel share one gap. Side by side from xl only.
          Light-grey surface cards with a border, like Features and Contact; every icon sits on a
          gold-tinted tile. On hover a card inverts to black, with a solid gold icon tile. */}
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
              marker={
                <IconTile
                  icon={item.icon}
                  className="transition-colors duration-300 ease-out group-hover:bg-primary group-hover:text-primary-foreground"
                />
              }
              title={item.title}
              description={item.description}
              // Hover (pointer devices only): the card turns black, its text white and grey, the icon tile gold.
              className="group rounded-lg border border-border bg-surface p-6 transition-colors duration-300 ease-out hover:border-foreground hover:bg-foreground hover:text-background md:p-8 [&>p]:transition-colors [&>p]:duration-300 hover:[&>p]:text-background/70"
            />
          ))}
        </ul>
      </div>
    </Section>
  );
}
