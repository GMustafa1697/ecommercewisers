import { FeatureItem } from "@/components/ui/FeatureItem";
import { Section } from "@/components/ui/Section";
import { SectionGrid } from "@/components/ui/SectionGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSection } from "@/content/site";

export function Process() {
  const { eyebrow, title, items } = processSection;

  return (
    <Section id="process" light>
      <SectionHeading id="process-title" eyebrow={eyebrow} title={title} />
      <SectionGrid ordered>
        {items.map((item, index) => (
          <FeatureItem
            key={item.title}
            // The <ol> already announces the order, so the visible number is not read out.
            marker={
              <span aria-hidden="true" className="block font-mono text-sm leading-6 text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
            }
            title={item.title}
            description={item.description}
            className="border-t border-border pt-6"
          />
        ))}
      </SectionGrid>
    </Section>
  );
}
