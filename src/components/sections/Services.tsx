import { Container } from "@/components/ui/Container";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { serviceIcons } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicesSection } from "@/content/site";

export function Services() {
  const { eyebrow, title, items } = servicesSection;

  return (
    <section id="services" aria-labelledby="services-title" className="theme-light py-16 md:py-24">
      <Container>
        <SectionHeading id="services-title" eyebrow={eyebrow} title={title} />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
        </ul>
      </Container>
    </section>
  );
}
