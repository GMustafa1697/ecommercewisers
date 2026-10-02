// The Platforms strip's content.

/** `width`/`height` are the SVG's own viewBox size; the strip sets the height and keeps the ratio. */
export type Platform = {
  name: string;
  logo: { src: `/images/platforms/${string}.svg`; width: number; height: number };
};

/** The strip's name, for screen readers only (no visible heading, your choice). */
export const title = "Platforms we build on";

// The platforms behind the four services (WooCommerce under WordPress Development), in your
// screenshot's order. They are tools, not clients or partners. The logos keep their brand colours
// (your request): they live in the SVG files, the one place outside globals.css with other hues.
export const platforms: Platform[] = [
  { name: "WooCommerce", logo: { src: "/images/platforms/woocommerce.svg", width: 256, height: 153 } },
  { name: "WordPress", logo: { src: "/images/platforms/wordpress.svg", width: 256, height: 255 } },
  { name: "Next.js", logo: { src: "/images/platforms/nextjs.svg", width: 256, height: 256 } },
  { name: "Figma", logo: { src: "/images/platforms/figma.svg", width: 256, height: 384 } },
  { name: "Shopify", logo: { src: "/images/platforms/shopify.svg", width: 256, height: 292 } },
];
