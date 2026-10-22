"use client";

import "@splidejs/splide/css/core";
import Splide from "@splidejs/splide";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { SplideTrack } from "@/components/ui/SplideTrack";
import { maxPx } from "@/lib/breakpoints";
import { REDUCED_MOTION } from "@/lib/useMediaQuery";

// Content: edit the platforms and logos here.

/** `width`/`height` are the SVG's own viewBox size; the strip sets the height and keeps the ratio. */
type Platform = {
  name: string;
  logo: { src: `/images/platforms/${string}.svg`; width: number; height: number };
};

/** The strip's name, for screen readers only (no visible heading, your choice). */
const title = "Platforms we build on";

// The platforms behind the four services (WooCommerce under WordPress Development, React under
// Next.js Development), in your screenshot's order; React added after Next.js on 2026-10-22, your
// request. They are tools, not clients or partners. The logos keep their brand colours (your
// request): they live in the SVG files, the one place outside globals.css with other hues.
const platforms: Platform[] = [
  { name: "WooCommerce", logo: { src: "/images/platforms/woocommerce.svg", width: 256, height: 153 } },
  { name: "WordPress", logo: { src: "/images/platforms/wordpress.svg", width: 256, height: 255 } },
  { name: "Next.js", logo: { src: "/images/platforms/nextjs.svg", width: 256, height: 256 } },
  { name: "React", logo: { src: "/images/platforms/react.svg", width: 256, height: 228 } },
  { name: "Figma", logo: { src: "/images/platforms/figma.svg", width: 256, height: 384 } },
  { name: "Shopify", logo: { src: "/images/platforms/shopify.svg", width: 256, height: 292 } },
];

/** Scroll speed in CSS pixels per second: one 15rem (240px) slide every 5 s. */
const speed = 48;

/** The longest step one frame may take, so a dropped frame or a background tab never jumps the strip. */
const MAX_STEP_MS = 50;

type LogoStripProps = {
  /** The group's accessible name, e.g. "Platforms we build on". */
  label: string;
  children: ReactNode;
};

/**
 * A full-bleed, endlessly looping Splide strip that scrolls continuously. Core Splide only, no
 * extension: a requestAnimationFrame loop moves the track at `speed` px/s through Splide's
 * Move.translate, which wraps the loop. It pauses while hovered or off-screen, and stays still under
 * reduced motion (following the setting live). Slides are fixed-width and centre their child: 10rem,
 * 12rem from sm, 15rem from lg. Loop clones are plain DOM, so slides are CSS only.
 */
function LogoStrip({ label, children }: LogoStripProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const splide = new Splide(root, {
      type: "loop",
      role: "group",
      label,
      fixedWidth: "15rem",
      // Below lg and below sm, matching the pre-mount widths' sm: and lg: classes.
      breakpoints: {
        [maxPx("lg")]: { fixedWidth: "12rem" },
        [maxPx("sm")]: { fixedWidth: "10rem" },
      },
      arrows: false,
      pagination: false,
      drag: false,
      keyboard: false,
    });
    splide.mount();

    const { Move, Controller, Slides } = splide.Components;
    // Read directly, not through useMediaQuery: the rAF loop below checks it on every change, and a
    // React value here would re-run this effect and remount Splide.
    const motion = window.matchMedia(REDUCED_MOTION);
    let hovered = false;
    let inView = false;
    let frame = 0;
    let last = 0;

    function step(now: number) {
      const elapsed = last ? Math.min(now - last, MAX_STEP_MS) : 0;
      last = now;
      Move.translate(Move.getPosition() - (speed * elapsed) / 1000);
      // Keep Splide's index in step, so it updates the visible slides' aria-hidden as they pass.
      const index = (Move.toIndex(Move.getPosition()) + splide.length) % splide.length;
      if (index !== Controller.getIndex()) {
        Controller.setIndex(index);
        Slides.update();
      }
      frame = requestAnimationFrame(step);
    }

    function update() {
      const run = inView && !hovered && !motion.matches;
      if (run && !frame) {
        last = 0;
        frame = requestAnimationFrame(step);
      } else if (!run && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(root);
    const onEnter = () => {
      hovered = true;
      update();
    };
    const onLeave = () => {
      hovered = false;
      update();
    };
    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);
    motion.addEventListener("change", update);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
      motion.removeEventListener("change", update);
      splide.destroy();
    };
  }, [label]);

  return (
    // is-rendered: visible before Splide mounts and without JavaScript (its core CSS hides it otherwise).
    <div ref={rootRef} className="splide is-rendered" aria-label={label}>
      {/* Pre-mount widths match Splide's fixedWidth, so nothing jumps when it mounts. */}
      <SplideTrack slideClassName="flex w-40 items-center justify-center sm:w-48 lg:w-60">{children}</SplideTrack>
    </div>
  );
}

/**
 * A dark, full-bleed logo strip after the Hero. The heading is for screen readers only, as you asked.
 * The top border separates it from the dark Hero, as in your screenshot.
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
