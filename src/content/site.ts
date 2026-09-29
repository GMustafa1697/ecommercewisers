/**
 * All homepage copy and data. Sections import from here. Copy was approved in
 * Phase 5 (docs/PLAN.md → Homepage plan). Invent no clients, metrics or reviews.
 */

export type NavItem = { label: string; href: `/#${string}` };
export type Cta = { label: string; href: string };
export type ServiceIconName = "bag" | "layout" | "code" | "pen";
export type Service = { title: string; description: string; icon: ServiceIconName };
export type Point = { title: string; description: string };
export type Social = { label: string; href: string };
export type Project = {
  name: string;
  label: string;
  image: { src: string; width: number; height: number; alt: string };
};

export const site = {
  name: "ecommercewisers",
  description: "E-commerce development: Shopify, WordPress, Next.js and Figma to Web.",
};

// PLACEHOLDER: replace with the real address before deploy (docs/PROGRESS.md → Known issues).
export const contact = { email: "hello@example.com" };
export const contactHref = `mailto:${contact.email}?subject=Project%20enquiry`;

// Hidden until real profiles are provided.
export const socials: Social[] = [];

export const startProject: Cta = { label: "Start a project", href: "/#contact" };

export const heroSection = {
  eyebrow: "E-commerce development agency",
  title: "We build fast, reliable online stores.",
  intro:
    "Shopify, WordPress and Next.js development, plus Figma to Web, for e-commerce businesses, Shopify store owners and startups.",
  primaryCta: startProject,
  secondaryCta: { label: "Explore services", href: "/#services" } satisfies Cta,
};

export const servicesSection = {
  eyebrow: "Services",
  title: "What we build",
  items: [
    {
      title: "Shopify Development",
      description: "Shopify stores built or customised to fit your products and brand.",
      icon: "bag",
    },
    {
      title: "WordPress Development",
      description: "WordPress sites and stores your team can manage with ease.",
      icon: "layout",
    },
    {
      title: "Next.js Development",
      description: "Custom storefronts and web apps built for speed.",
      icon: "code",
    },
    {
      title: "Figma to Web",
      description: "Your Figma designs turned into responsive, production-ready pages.",
      icon: "pen",
    },
  ] satisfies Service[],
};

export const whySection = {
  eyebrow: "Why ecommercewisers",
  title: "What working with us looks like",
  items: [
    { title: "Performance first", description: "Pages built to load fast on real phones." },
    {
      title: "E-commerce focus",
      description: "Catalogs, product pages, checkout and the content around them.",
    },
    {
      title: "A clear process",
      description: "You approve a plan before we build, and see progress at every step.",
    },
    { title: "Maintainable code", description: "Typed, documented code your team can build on." },
  ] satisfies Point[],
};

export const processSection = {
  eyebrow: "Process",
  title: "From brief to launch in four steps",
  items: [
    {
      title: "Discover",
      description: "We learn your products, customers and goals, and agree what to build.",
    },
    {
      title: "Design",
      description: "We plan structure and design, or work from your Figma files.",
    },
    {
      title: "Develop",
      description: "We build, test on real devices and share progress as we go.",
    },
    {
      title: "Launch",
      description: "We launch, check everything live and hand over what you need to run it.",
    },
  ] satisfies Point[],
};

export const workSection = {
  eyebrow: "Work",
  title: "Selected projects",
  // Each project confirmed by the user, one by one, as their work (cycle 7). Images are 4:5 top-of-page crops.
  projects: [
    {
      name: "Ella — Auto parts store",
      label: "Shopify theme customisation",
      image: {
        src: "/images/work/ella-auto-parts.webp",
        width: 800,
        height: 1000,
        alt: "Ella auto parts store homepage",
      },
    },
    {
      name: "Ella — Jewelry store",
      label: "Shopify theme customisation",
      image: {
        src: "/images/work/ella-jewelry.webp",
        width: 370,
        height: 463,
        alt: "Ella jewelry store homepage",
      },
    },
    {
      name: "Ecomus — Activewear store",
      label: "Shopify theme customisation",
      image: {
        src: "/images/work/ecomus-activewear.webp",
        width: 800,
        height: 1000,
        alt: "Ecomus activewear store homepage",
      },
    },
    {
      name: "Home Gym",
      label: "Custom development",
      image: { src: "/images/work/home-gym.webp", width: 370, height: 463, alt: "Home Gym store homepage" },
    },
    {
      name: "Layout 22",
      label: "UI / Layout system",
      image: {
        src: "/images/work/layout-22.webp",
        width: 540,
        height: 675,
        alt: "Layout 22 bike store homepage",
      },
    },
  ] satisfies Project[],
};

export const ctaSection = {
  title: "Have a store to build or improve?",
  text: "Tell us what you're working on and we'll reply with next steps.",
  button: { label: startProject.label, href: contactHref } satisfies Cta,
};

export const footerSection = {
  navTitle: "Navigation",
  servicesTitle: "Services",
  contactTitle: "Contact",
  rights: "All rights reserved.",
};

const allNav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Why us", href: "/#why" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

// "Work" is hidden while there are no confirmed projects.
export const nav = allNav.filter((item) => item.href !== "/#work" || workSection.projects.length > 0);
