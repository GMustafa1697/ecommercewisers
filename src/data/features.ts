// The Features section's content.

/** `stillFrame` is shown for reduced motion: a frame with every element on screen. */
export type Feature = {
  title: string;
  description: string;
  animation: { src: `/animations/${string}.lottie`; stillFrame: number };
};

export const eyebrow = "Included";
export const title = "What every project includes";

// The points of your reference screenshot, with Lottie animations for icons. They're drawn for a light
// background (near-black outlines). Each loops seamlessly: the base (brackets, laptop, dial, search bar)
// stays on screen and only its details come and go. Stills: a frame in each fully built hold (`</code>`
// 42–62, laptop 48–80, gauge needle 49–66, search 50–116).
export const features: Feature[] = [
  {
    title: "Handcrafted code",
    description: "Every line is written for your store, whether we build it new or customise your theme.",
    animation: { src: "/animations/code-brackets.lottie", stillFrame: 52 },
  },
  {
    title: "Pixel-perfect responsive",
    description: "Custom layouts tested at every breakpoint so your store looks right on all devices.",
    animation: { src: "/animations/laptop-ui.lottie", stillFrame: 64 },
  },
  {
    title: "Fast by default",
    description:
      "Custom-optimised code that loads fast because it only includes what your store actually needs.",
    animation: { src: "/animations/speed-gauge.lottie", stillFrame: 60 },
  },
  {
    title: "Search-ready",
    description: "Clean, semantic markup with proper metadata — built for search engines from day one.",
    animation: { src: "/animations/search-results.lottie", stillFrame: 80 },
  },
];
