"use client";

import type { DotLottie } from "@lottiefiles/dotlottie-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import type { ProcessAnimation, ProcessStep } from "@/data/process";
import { below } from "@/lib/breakpoints";
import { cn } from "@/lib/cn";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/useMediaQuery";

type ProcessPlayerProps = {
  steps: ProcessStep[];
  animation: ProcessAnimation;
};

// Phones (below Tailwind's sm, 640px) get the portrait animation.
const PHONE = below("sm");
const onServer = () => false;
const onClient = () => true;
const neverChanges = () => () => {};

// Below xl the desktop animation is cropped to its right-hand part (the tiles and store panel).
const keepRight: [number, number] = [1, 0.5];
const centred: [number, number] = [0.5, 0.5];
// Reserves each layout's box: portrait on phones (at most 400px wide), the 5:3 crop, the whole canvas.
const animationBox =
  "mx-auto aspect-20/37 w-full max-w-100 sm:max-w-none sm:aspect-5/3 lg:order-last xl:order-0 xl:aspect-127/60";

/**
 * The Process steps beside the animation, in step with it: the step whose scene is playing is
 * highlighted, and a gold bar on its left fills as the scene plays (gold once done, like the
 * animation's timeline). Choosing a step jumps the animation to it. Under reduced motion nothing
 * plays: choosing a step shows its scene as a still, and the default still has every step done.
 * From xl the animation shows whole, with its own drawn step column, so this list is hidden and a
 * static copy (no buttons, so no hidden focus stops) is kept for screen readers. Phones get the
 * portrait animation (one step at a time) on its own, with the same static copy; under reduced
 * motion its still shows only one step, so phones keep the list then.
 */
export function ProcessPlayer({ steps, animation }: ProcessPlayerProps) {
  const [player, setPlayer] = useState<DotLottie | null>(null);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = useMediaQuery(REDUCED_MOTION);
  const phone = useMediaQuery(PHONE);
  // The player mounts after hydration, once `phone` is known, so a phone never fetches the desktop file.
  const hydrated = useSyncExternalStore(neverChanges, onClient, onServer);
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
    <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-16 xl:grid-cols-1 xl:gap-0">
      {/* Phones: the 400×740 portrait file, whole. Otherwise the 1270×600 desktop file: a drawn step
          column (x 0–270), then the tiles and store panel. A 5:3 box, kept to the right, shows exactly
          x 270–1270; from xl the box matches the whole canvas. */}
      {hydrated ? (
        <LottieAnimation
          src={phone ? animation.mobileSrc : animation.src}
          stillFrame={steps[reduced ? shown : last].still}
          fit={phone ? "contain" : "cover"}
          align={phone ? centred : keepRight}
          onPlayer={setPlayer}
          className={animationBox}
        />
      ) : (
        <div aria-hidden="true" className={animationBox} />
      )}
      <ol className="hidden flex-col gap-2 motion-reduce:flex sm:flex xl:hidden">
        {steps.map((step, index) => {
          const current = index === shown;
          return (
            <li
              key={step.title}
              aria-current={current ? "step" : undefined}
              className={cn(
                "relative rounded-lg py-5 pr-5 pl-10 transition-colors ease-out",
                current ? "bg-surface" : "hover:bg-surface/50",
              )}
            >
              <span aria-hidden="true" className="absolute inset-y-5 left-5 w-0.5 overflow-hidden rounded-full bg-border">
                <span
                  ref={(fill) => {
                    fills.current[index] = fill;
                  }}
                  className="block size-full origin-top scale-y-(--fill) bg-primary [--fill:0]"
                />
              </span>
              {/* The <ol> already announces the order, so the visible number is not read out. */}
              <span aria-hidden="true" className="block font-mono text-sm leading-6 text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-xl font-semibold">
                {/* The ::after stretches the button over the whole card, so the card is the target. */}
                <button
                  type="button"
                  onClick={() => choose(index)}
                  className="cursor-pointer text-left after:absolute after:inset-0 after:rounded-lg"
                >
                  {step.title}
                </button>
              </h3>
              <p className="mt-2 text-base leading-relaxed text-pretty text-muted">{step.description}</p>
            </li>
          );
        })}
      </ol>
      {/* Where the list above is hidden (phones, and from xl) the steps are only in the animation
          (aria-hidden), so screen readers get them here. */}
      <ol className="sr-only motion-reduce:hidden sm:hidden xl:block">
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
