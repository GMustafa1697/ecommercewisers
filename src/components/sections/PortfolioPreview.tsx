import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionGrid } from "@/components/ui/SectionGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { workSection } from "@/content/site";

export function PortfolioPreview() {
  const { eyebrow, title, projects } = workSection;

  // No confirmed projects: no section, and site.ts hides the "Work" nav link.
  if (projects.length === 0) return null;

  return (
    <Section id="work">
      <SectionHeading id="work-title" eyebrow={eyebrow} title={title} />
      <SectionGrid>
        {projects.map((project) => (
          <li key={project.name}>
            <div className="overflow-hidden rounded-lg border border-border bg-surface">
              <Image
                src={project.image.src}
                width={project.image.width}
                height={project.image.height}
                alt={project.image.alt}
                sizes="(min-width: 1024px) 248px, (min-width: 640px) 50vw, 100vw"
                className="aspect-4/5 w-full object-cover object-top"
              />
            </div>
            <Eyebrow className="mt-4">{project.label}</Eyebrow>
            <h3 className="mt-2 text-xl font-semibold">{project.name}</h3>
          </li>
        ))}
      </SectionGrid>
    </Section>
  );
}
