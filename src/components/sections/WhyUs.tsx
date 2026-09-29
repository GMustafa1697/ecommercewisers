import { Container } from "@/components/ui/Container";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { CheckIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whySection } from "@/content/site";

export function WhyUs() {
  const { eyebrow, title, items } = whySection;

  return (
    <section id="why" aria-labelledby="why-title" className="py-16 md:py-24">
      <Container>
        <SectionHeading id="why-title" eyebrow={eyebrow} title={title} />
        {/* No cards: points sit on a top border, which sets them apart from Services. */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {items.map((item) => (
            <FeatureItem
              key={item.title}
              marker={<CheckIcon className="size-6 text-accent" />}
              title={item.title}
              description={item.description}
              className="border-t border-border pt-6"
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
