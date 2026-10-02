"use client";

import "@splidejs/splide/css/core";
import Splide from "@splidejs/splide";
import { useEffect, useRef, type ReactNode } from "react";
import { SplideTrack } from "@/components/ui/SplideTrack";
import { maxPx } from "@/lib/breakpoints";
import { REDUCED_MOTION } from "@/lib/useMediaQuery";

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
export function LogoStrip({ label, children }: LogoStripProps) {
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
