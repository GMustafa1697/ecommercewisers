import Image from "next/image";
import { LogoStrip } from "@/components/ui/LogoStrip";
import { platforms, title } from "@/data/platforms";

/**
 * A dark, full-bleed logo strip after the Hero. The heading is for screen readers only, as you asked.
 * The top border separates it from the dark Hero, as in your screenshot. Content: data/platforms.ts.
 */
export function Platforms() {
  return (
    <section aria-labelledby="platforms-title" className="theme-dark border-t border-border py-12 md:py-16">
      <h2 id="platforms-title" className="sr-only">
        {title}
      </h2>
      <LogoStrip label={title}>
        {platforms.map(({ name, logo }) => (
          // SVGs are served as they are (Next skips optimising .svg), so there's no srcset to size.
          <Image
            key={name}
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt={name}
            className="h-10 w-auto md:h-12"
          />
        ))}
      </LogoStrip>
    </section>
  );
}
