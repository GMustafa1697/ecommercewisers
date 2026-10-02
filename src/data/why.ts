import type { ComponentType } from "react";
import { BagIcon, BoltIcon, CodeIcon, type IconProps, RouteIcon } from "@/components/ui/icons";

// The Why ecommercewisers section's content.

/** `icon` is one of the generic icons in components/ui/icons.tsx. */
export type Point = { title: string; description: string; icon: ComponentType<IconProps> };

export const eyebrow = "Why ecommercewisers";
export const title = "What working with us looks like";

/** The code scene; frame 360 of 480 has the phone, the code lines and the bubbles on screen. */
export const animation = { src: "/animations/code-dark.lottie", stillFrame: 360 };

export const points: Point[] = [
  { title: "Performance first", description: "Pages built to load fast on real phones.", icon: BoltIcon },
  {
    title: "E-commerce focus",
    description: "Catalogs, product pages, checkout and the content around them.",
    icon: BagIcon,
  },
  {
    title: "A clear process",
    description: "You approve a plan before we build, and see progress at every step.",
    icon: RouteIcon,
  },
  { title: "Maintainable code", description: "Typed, documented code your team can build on.", icon: CodeIcon },
];
