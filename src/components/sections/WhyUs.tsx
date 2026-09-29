import { FeatureItem } from "@/components/ui/FeatureItem";
import { CheckIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionGrid } from "@/components/ui/SectionGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whySection } from "@/content/site";

export function WhyUs() {
  const { eyebrow, title, items } = whySection;

  return (
    <Section id="why">
      <SectionHeading id="why-title" eyebrow={eyebrow} title={title} />
      {/* No cards: points sit on a top border, which sets them apart from Services. */}
      <SectionGrid>
        {items.map((item) => (
          <FeatureItem
            key={item.title}
            marker={<CheckIcon className="size-6 text-accent" />}
            title={item.title}
            description={item.description}
            className="border-t border-border pt-6"
          />
        ))}
      </SectionGrid>
    </Section>
  );
}
