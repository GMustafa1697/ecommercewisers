import type { ComponentType } from "react";
import { BagIcon, CodeIcon, type IconProps, LayoutIcon, PenIcon } from "@/components/ui/icons";

// The Services section's content. The button is the shared "Start a project" link in data/contact.ts.

/** `icon` is one of the generic icons in components/ui/icons.tsx; `points` is the card's checklist. */
export type Service = { title: string; description: string; icon: ComponentType<IconProps>; points: string[] };

export const eyebrow = "What we do";
export const title = "Custom solutions for every part of your online store";
export const intro = "Every project is built around your products, your brand and your exact requirements.";

/** The four services (CLAUDE.md). The Footer lists their names too. */
export const services: Service[] = [
  {
    title: "Shopify Development",
    description: "Shopify stores built or customised to fit your products and brand.",
    icon: BagIcon,
    points: [
      "Theme customisation and new store builds",
      "Product, collection and cart pages",
      "App setup and integrations",
    ],
  },
  {
    title: "WordPress Development",
    description: "WordPress sites and stores your team can manage with ease.",
    icon: LayoutIcon,
    points: [
      "Custom themes and page layouts",
      "WooCommerce stores",
      "Content your team can edit without a developer",
    ],
  },
  {
    title: "Next.js Development",
    description: "Custom storefronts and web apps built for speed.",
    icon: CodeIcon,
    points: ["Headless storefronts", "Fast, statically rendered pages", "Typed, maintainable code"],
  },
  {
    title: "Figma to Web",
    description: "Your Figma designs turned into responsive, production-ready pages.",
    icon: PenIcon,
    points: [
      "Responsive layouts from mobile to desktop",
      "Reusable components that match your design",
      "Accessible, semantic markup",
    ],
  },
];
