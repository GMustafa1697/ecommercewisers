import { FeatureItem } from "@/components/ui/FeatureItem";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eyebrow, features, title } from "@/data/features";

/** The Features cards with their Lottie icons. Content: data/features.ts. */
export function Features() {
  return (
    <Section id="features">
      <SectionHeading id="features-title" eyebrow={eyebrow} title={title} />
      {/* Grey cards, 2×2 from lg. Each animation sits on a white tile: on top on phones, beside the
          text from sm, where the tile spans both text rows and the title and line centre against it. */}
      <ul className="mt-12 grid gap-6 md:gap-8 lg:mt-16 lg:grid-cols-2">
        {features.map((item) => (
          <FeatureItem
            key={item.title}
            marker={
              <LottieAnimation
                src={item.animation.src}
                stillFrame={item.animation.stillFrame}
                className="mx-auto aspect-square w-28 rounded-md bg-background sm:row-span-2 sm:mx-0 sm:w-32 sm:self-center xl:w-40"
              />
            }
            title={item.title}
            description={item.description}
            className="rounded-lg border border-border bg-surface p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg motion-reduce:transition-colors motion-reduce:hover:translate-y-0 sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-6 md:p-8 sm:[&>h3]:mt-0 sm:[&>h3]:self-end sm:[&>p]:self-start"
          />
        ))}
      </ul>
    </Section>
  );
}
