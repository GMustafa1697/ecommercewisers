// The Portfolio section's content.

/** `image` is a full-length homepage screenshot in public/images/work/, with its real pixel size. */
export type Project = {
  name: string;
  label: string;
  image: { src: string; width: number; height: number; alt: string };
};

export const eyebrow = "Work";
export const title = "Selected projects";

/** The carousel's name and per-slide label for screen readers (%s: the number and the total). */
export const carouselLabel = "Projects";
export const slideLabel = "Project %s of %s";

// Each project confirmed by you, one by one, as your work (cycle 7). The Header hides the "Work" nav
// link while this is empty. A changed image needs a new file name, or caches serve the old one.
export const projects: Project[] = [
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
];
