import { FeatureItem } from "@/components/ui/FeatureItem";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Content: edit the texts and animations here.

/** `stillFrame` is shown for reduced motion: a frame with every element on screen. */
type Feature = {
  title: string;
  description: string;
  animation: { src: `/animations/${string}.lottie`; stillFrame: number };
};

const eyebrow = "Included";
const title = "What every project includes";

// The points of your reference screenshot, with Lottie animations for icons. They're drawn for a light
// background (near-black outlines). Each loops seamlessly: the base (brackets, laptop, dial, search bar)
// stays on screen and only its details come and go. Stills: a frame in each fully built hold (`</code>`
// 42–62, laptop 48–80, gauge needle 49–66, search 50–116).
const features: Feature[] = [
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

/** The Features cards with their Lottie icons. */
export function Features() {
  return (
    <Section id="features">
      <SectionHeading id="features-title" eyebrow={eyebrow} title={title} />
      {/* Grey cards, 2×2 from lg. Each animation sits on a white tile: on top on phones, beside the
          text from sm, where the tile spans both text rows and the title and line centre against it. */}
      <ul className="mt-12 grid gap-6 md:gap-8 lg:mt-16 lg:grid-cols-2">
        {features.map((item) => (
          <FeatureItem
            key={item.title}
            marker={
              <LottieAnimation
                src={item.animation.src}
                stillFrame={item.animation.stillFrame}
                className="mx-auto aspect-square w-28 rounded-md bg-background sm:row-span-2 sm:mx-0 sm:w-32 sm:self-center xl:w-40"
              />
            }
            title={item.title}
            description={item.description}
            className="rounded-lg border border-border bg-surface p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg motion-reduce:transition-colors motion-reduce:hover:translate-y-0 sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-6 md:p-8 sm:[&>h3]:mt-0 sm:[&>h3]:self-end sm:[&>p]:self-start"
          />
        ))}
      </ul>
    </Section>
  );
}
