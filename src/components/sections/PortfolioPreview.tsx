import Image from "next/image";
import type { CSSProperties } from "react";
import { Carousel } from "@/components/ui/Carousel";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Content: edit the projects and texts here.

/** `image` is a full-length homepage screenshot in public/images/work/, with its real pixel size. */
type Project = {
  name: string;
  label: string;
  image: { src: string; width: number; height: number; alt: string };
};

const eyebrow = "Work";
const title = "Selected projects";

/** The carousel's name and per-slide label for screen readers (%s: the number and the total). */
const carouselLabel = "Projects";
const slideLabel = "Project %s of %s";

// Each project confirmed by you, one by one, as your work (cycle 7). Keep at least one: the nav's
// "Work" link (lib/site.ts) points to this section. A changed image needs a new file name, or caches
// serve the old one.
const projects: Project[] = [
  {
    name: "Ella — Auto parts store",
    label: "Shopify theme customisation",
    image: {
      src: "/images/work/ella-auto-parts-full.webp",
      width: 800,
      height: 4200,
      alt: "Ella auto parts store homepage",
    },
  },
  {
    name: "Ella — Jewelry store",
    label: "Shopify theme customisation",
    image: {
      src: "/images/work/ella-jewelry-full.webp",
      width: 370,
      height: 2400,
      alt: "Ella jewelry store homepage",
    },
  },
  {
    name: "Ecomus — Activewear store",
    label: "Shopify theme customisation",
    image: {
      src: "/images/work/ecomus-activewear-full.webp",
      width: 800,
      height: 3336,
      alt: "Ecomus activewear store homepage",
    },
  },
  {
    name: "Home Gym",
    label: "Custom development",
    image: { src: "/images/work/home-gym-full.webp", width: 370, height: 1352, alt: "Home Gym store homepage" },
  },
  {
    name: "Layout 22",
    label: "UI / Layout system",
    image: {
      src: "/images/work/layout-22-full.webp",
      width: 540,
      height: 1512,
      alt: "Layout 22 bike store homepage",
    },
  },
  {
    name: "kalles-4-2",
    label: "myshopify",
    image: {
      src: "/images/work/demo-kalles-4-2-myshopify.png",
      width: 540,
      height: 1512,
      alt: "Layout 22 bike store homepage",
    },
  },
  {
    name: "Gadgets store",
    label: "shopify",
    image: {
      src: "/images/work/demo-kalles-5-4-myshopify.png",
      width: 540,
      height: 1512,
      alt: "Essential Sport Accessories",
    },
  },
];

// The cards show the top of each full-length screenshot and scroll to the bottom on hover.

// The frame's height ÷ width: keep in step with the image's `aspect-3/4` class below.
const FRAME_RATIO = 4 / 3;

// The frame shows the top of the screenshot (the store's first screen). On hover it glides to the
// bottom at an even speed, so taller pages take longer: 1 s per frame-width of travel, at least 1.5 s.
function scrollSeconds(width: number, height: number) {
  return Math.max(1.5, height / width - FRAME_RATIO).toFixed(1);
}

export function PortfolioPreview() {
  // No confirmed projects: no section, and the Header hides the "Work" nav link.
  if (projects.length === 0) return null;

  return (
    // Dark (2026-10-02, your choice), between the dark Process and Reviews, so a divider line
    // (the dark border token) above and below separates the three, as between the Hero and the logo strip.
    <Section id="work"  className="border-y border-border">
      <SectionHeading id="work-title" eyebrow={eyebrow} title={title} />
      {/* 4 per view from lg, like the reviews (your request); prev/next arrows over the edges (your
          reference image), as well as the dots. */}
      <Carousel label={carouselLabel} slideLabel={slideLabel} arrows className="mt-12 lg:mt-16">
        {projects.map((project) => (
          // One bordered card per project (your reference image): the screenshot edge to edge on top, then
          // the label and name. h-full keeps every card the same height. CSS-only hover scroll, so
          // Splide's loop clones get it too; motion-safe: none for reduced motion.
          <div key={project.name} className="group h-full overflow-hidden rounded-lg border border-border bg-black text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg motion-reduce:transition-colors motion-reduce:hover:translate-y-0">
            <Image
              src={project.image.src}
              width={project.image.width}
              height={project.image.height}
              alt={project.image.alt}
              sizes="(min-width: 1440px) 324px, (min-width: 1024px) 23vw, (min-width: 640px) 45vw, 76vw"
              style={
                {
                  "--scroll-duration": `${scrollSeconds(project.image.width, project.image.height)}s`,
                } as CSSProperties
              }
              className="aspect-3/4 w-full bg object-cover object-top transition-[object-position] duration-700 ease-in-out motion-safe:group-hover:object-bottom motion-safe:group-hover:duration-(--scroll-duration)"
            />
            <div className="p-5">
              <p className="text-sm text-white">{project.label}</p>
              <h3 className="mt-2 text-xl font-semibold text-balance">{project.name}</h3>
            </div>
          </div>
        ))}
      </Carousel>
    </Section>
  );
}
