import { FeatureItem } from "@/components/ui/FeatureItem";
import { serviceIcons } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionGrid } from "@/components/ui/SectionGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicesSection } from "@/content/site";

export function Services() {
  const { eyebrow, title, items } = servicesSection;

  return (
    <Section id="services" light>
      <SectionHeading id="services-title" eyebrow={eyebrow} title={title} />
      <SectionGrid>
        {items.map((item) => {
          const Icon = serviceIcons[item.icon];
          return (
            <FeatureItem
              key={item.title}
              marker={<Icon className="size-6 text-accent" />}
              title={item.title}
              description={item.description}
              className="rounded-lg border border-border bg-surface p-6"
            />
          );
        })}
      </SectionGrid>
    </Section>
  );
}
