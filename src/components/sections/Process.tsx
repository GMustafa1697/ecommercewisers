import { ProcessPlayer } from "@/components/sections/ProcessPlayer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { animation, eyebrow, steps, title } from "@/data/process";

/** The Process heading and the animation player with its steps. Content: data/process.ts. */
export function Process() {
  return (
    <Section id="process" dark>
      <SectionHeading id="process-title" eyebrow={eyebrow} title={title} />
      <ProcessPlayer steps={steps} animation={animation} />
    </Section>
  );
}
