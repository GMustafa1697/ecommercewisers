"use client";

import type { DotLottie } from "@lottiefiles/dotlottie-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { REDUCED_MOTION, useMediaQuery } from "@/lib/useMediaQuery";

// Self-hosted renderer, copied from the installed @lottiefiles/dotlottie-web 0.80.0 (pinned exactly
// through package.json). The version is in the file name, so it's cached forever (next.config.ts):
// on an upgrade, copy the new dist/dotlottie-player.wasm under its new version and update this.
const WASM_URL = "/lottie/dotlottie-player-0.80.0.wasm";

// The player's JS loads in its own chunk, and only when an animation nears the viewport (below);
// it then fetches the 1.24 MB WASM. Nothing of it is in the first load.
const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((module) => {
      module.setWasmUrl(WASM_URL);
      return module.DotLottieReact;
    }),
  { ssr: false },
);

// How far ahead of the viewport the player starts loading, so it's ready when scrolled to.
const LOAD_AHEAD = "400px 0px";

type LottieAnimationProps = {
  /** A .lottie file in public/animations/. */
  src: string;
  /** Shown instead of playing for reduced motion: a frame with every element on screen. */
  stillFrame: number;
  /** "cover" crops the canvas to the box's aspect ratio; "contain" (the default) fits it whole. */
  fit?: "contain" | "cover";
  /** Which part of the canvas stays in view when it doesn't fit: [x, y], 0 to 1 (default centred). */
  align?: [number, number];
  /** Playback rate: 1 (the default) as drawn, below 1 slower. */
  speed?: number;
  /** Must reserve the box before the canvas loads (an aspect ratio and a width), so nothing shifts. */
  className: string;
  /** Receives the player once it exists, e.g. to follow its frames. Must be a stable function. */
  onPlayer?: (player: DotLottie) => void;
};

/**
 * A decorative Lottie animation. The player mounts once the box comes within LOAD_AHEAD of the
 * viewport. It loops, freezes off-screen, and shows a still frame for reduced motion. Playback starts
 * in the load handler rather than through `autoplay`, so a reduced-motion visitor never sees it move.
 * No background: the section sets it.
 */
export function LottieAnimation({
  src,
  stillFrame,
  fit = "contain",
  align = [0.5, 0.5],
  speed = 1,
  className,
  onPlayer,
}: LottieAnimationProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [player, setPlayer] = useState<DotLottie | null>(null);
  const reduced = useMediaQuery(REDUCED_MOTION);

  useEffect(() => {
    const box = boxRef.current;
    if (!box || near) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: LOAD_AHEAD },
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, [near]);

  useEffect(() => {
    if (player) onPlayer?.(player);
  }, [player, onPlayer]);

  useEffect(() => {
    if (!player) return;
    const sync = () => {
      if (!player.isLoaded) return;
      if (reduced) {
        player.pause();
        player.setFrame(stillFrame);
      } else {
        player.play();
      }
    };
    player.addEventListener("load", sync);
    sync();
    return () => player.removeEventListener("load", sync);
  }, [player, reduced, stillFrame]);

  return (
    <div ref={boxRef} aria-hidden="true" className={className}>
      {near && (
        <DotLottieReact
          src={src}
          layout={{ fit, align }}
          speed={speed}
          loop
          renderConfig={{ freezeOnOffscreen: true, autoResize: true }}
          dotLottieRefCallback={setPlayer}
        />
      )}
    </div>
  );
}
