import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { workSection } from "@/content/site";

export function PortfolioPreview() {
  const { eyebrow, title, projects } = workSection;

  // No confirmed projects: no section, and site.ts hides the "Work" nav link.
  if (projects.length === 0) return null;

  return (
    <section id="work" aria-labelledby="work-title" className="py-16 md:py-24">
      <Container>
        <SectionHeading id="work-title" eyebrow={eyebrow} title={title} />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
        </ul>
      </Container>
    </section>
  );
}
