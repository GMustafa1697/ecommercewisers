"use client";

import type { DotLottie } from "@lottiefiles/dotlottie-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { animation, eyebrow, type ProcessAnimation, type ProcessStep, steps, title } from "@/data/process";
import { cn } from "@/lib/cn";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/useMediaQuery";

type ProcessPlayerProps = {
  steps: ProcessStep[];
  animation: ProcessAnimation;
};

// In the square box the canvas is cropped to its 600×600 left part around the ring (x 80–680 of 1270,
// so align x = 80 / (1270 − 600)), leaving out the step panel. The whole canvas fits the xl box.
const ring: [number, number] = [80 / 670, 0.5];
// Reserves each layout's box: a square of at most 400px; from xl, while it plays, the whole canvas.
// Phones put it after the step tabs and text, lg beside the list on the right.
const animationBox =
  "mx-auto aspect-square w-full max-w-100 max-sm:order-last lg:order-last xl:motion-safe:order-0 xl:motion-safe:max-w-none xl:motion-safe:aspect-127/60";

/**
 * The Process steps beside the animation, in step with it: the step whose scene is playing is
 * highlighted, and a gold bar on its left fills as the scene plays (gold once done, like the
 * animation's ring). Choosing a step jumps the animation to it. Under reduced motion nothing plays:
 * choosing a step shows its scene as a still, and the default still has every step done.
 * Below xl the animation is cropped to its ring (the step's icon in the centre) and this list carries
 * the words. On phones the list is a row of four tabs (number and title, the bar along the bottom)
 * with the shown step's text under it, above the ring; from sm it's a column of cards. From xl the
 * animation shows whole, with its own panel of step text, so this list is hidden and a static copy
 * (no buttons, so no hidden focus stops) is kept for screen readers. Under reduced motion every width
 * keeps the ring and the list, since a still shows only one step's text.
 */
function ProcessPlayer({ steps, animation }: ProcessPlayerProps) {
  const [player, setPlayer] = useState<DotLottie | null>(null);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = useMediaQuery(REDUCED_MOTION);
  const last = steps.length - 1;
  const shown = reduced ? (selected ?? last) : active;

  // Bars before the current step are full, after it empty; the current one is `fraction` full.
  const paint = useCallback((current: number, fraction: number) => {
    fills.current.forEach((fill, i) => {
      fill?.style.setProperty("--fill", String(i < current ? 1 : i > current ? 0 : fraction));
    });
  }, []);

  // Playing: follow the animation's frames. Only the step index goes through React state.
  useEffect(() => {
    if (!player || reduced) return;
    const onFrame = ({ currentFrame }: { currentFrame: number }) => {
      let index = 0;
      while (index < last && currentFrame >= steps[index + 1].start) index++;
      const end = index < last ? steps[index + 1].start : animation.frames;
      paint(index, Math.min(1, Math.max(0, (currentFrame - steps[index].start) / (end - steps[index].start))));
      setActive(index);
    };
    player.addEventListener("frame", onFrame);
    return () => player.removeEventListener("frame", onFrame);
  }, [player, reduced, steps, last, animation.frames, paint]);

  // Reduced motion: the shown step and every step before it are done.
  useEffect(() => {
    if (reduced) paint(shown, 1);
  }, [reduced, shown, paint]);

  function choose(index: number) {
    if (reduced) {
      setSelected(index);
    } else if (player?.isLoaded) {
      player.setFrame(steps[index].start);
      if (!player.isPlaying) player.play();
    }
  }

  return (
    <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-16 xl:motion-safe:grid-cols-1 xl:motion-safe:gap-0">
      {/* The 1270×600 canvas: the ring on the left, the step panel on the right. The square box shows
          only the ring; from xl, while it plays, the box matches the whole canvas. */}
      <LottieAnimation
        src={animation.src}
        stillFrame={steps[reduced ? shown : last].still}
        fit="cover"
        align={ring}
        speed={animation.speed}
        onPlayer={setPlayer}
        className={animationBox}
      />
      <div className="xl:motion-safe:hidden">
        {/* Phones: four tabs in a row. From sm: a column of cards. */}
        <ol className="grid grid-cols-4 gap-1 sm:flex sm:flex-col sm:gap-2">
          {steps.map((step, index) => {
            const current = index === shown;
            return (
              <li
                key={step.title}
                aria-current={current ? "step" : undefined}
                className={cn(
                  "relative rounded-lg px-1 pt-3 pb-4 text-center transition-colors ease-out sm:py-5 sm:pr-5 sm:pl-10 sm:text-left",
                  current ? "bg-surface" : "hover:bg-surface/50",
                )}
              >
                {/* The bar runs along a tab's bottom on phones and down a card's left edge from sm. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-2 bottom-1.5 h-0.5 overflow-hidden rounded-full bg-border sm:inset-x-auto sm:inset-y-5 sm:left-5 sm:h-auto sm:w-0.5"
                >
                  <span
                    ref={(fill) => {
                      fills.current[index] = fill;
                    }}
                    className="block size-full origin-left scale-x-(--fill) bg-primary [--fill:0] sm:origin-top sm:scale-x-100 sm:scale-y-(--fill)"
                  />
                </span>
                {/* The <ol> already announces the order, so the visible number is not read out. */}
                <span aria-hidden="true" className="block font-mono text-sm leading-6 text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* 14px on phones, so four titles fit across 320px (DESIGN.md → Type scale). */}
                <h3 className="mt-1 text-sm font-semibold sm:mt-2 sm:text-xl">
                  {/* The ::after stretches the button over the whole card, so the card is the target. */}
                  <button
                    type="button"
                    onClick={() => choose(index)}
                    className="cursor-pointer text-left after:absolute after:inset-0 after:rounded-lg"
                  >
                    {step.title}
                  </button>
                </h3>
                {/* Phones show only the current step's text, below the tabs; screen readers get all four here. */}
                <p className="mt-2 text-base leading-relaxed text-pretty text-muted sr-only sm:not-sr-only">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
        {/* Phones: the shown step's text under the tabs. Hidden from screen readers, which read the list. */}
        <p aria-hidden="true" className="mt-4 text-base leading-relaxed text-pretty text-muted sm:hidden">
          {steps[shown].description}
        </p>
      </div>
      {/* Where the list above is hidden (from xl, while the animation plays) the steps are only in the
          animation (aria-hidden), so screen readers get them here. */}
      <ol className="sr-only hidden xl:motion-safe:block">
        {steps.map((step) => (
          <li key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The Process heading and the animation player with its steps. Content: data/process.ts. */
export function Process() {
  return (
    <Section id="process" dark>
      <SectionHeading id="process-title" eyebrow={eyebrow} title={title} />
      <ProcessPlayer steps={steps} animation={animation} />
    </Section>
  );
}
