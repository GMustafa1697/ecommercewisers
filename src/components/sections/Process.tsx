import { Container } from "@/components/ui/Container";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSection } from "@/content/site";

export function Process() {
  const { eyebrow, title, items } = processSection;

  return (
    <section id="process" aria-labelledby="process-title" className="theme-light py-16 md:py-24">
      <Container>
        <SectionHeading id="process-title" eyebrow={eyebrow} title={title} />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
        </ol>
      </Container>
    </section>
  );
}
