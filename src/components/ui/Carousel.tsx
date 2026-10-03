"use client";

import "@splidejs/splide/css/core";
import Splide from "@splidejs/splide";
import { useEffect, useRef, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { SplideTrack } from "@/components/ui/SplideTrack";
import { maxPx } from "@/lib/breakpoints";
import { cn } from "@/lib/cn";

// Splide's page buttons (its core CSS leaves them unstyled): an 8px dot, a ring for the other pages
// and filled with the accent (black on white, gold on dark) for the current one. Targets are 24px
// (the WCAG AA minimum, side by side), not 44px, so the dots sit close: the user's choice.
const pageClass =
  "splide__pagination__page inline-flex size-6 cursor-pointer items-center justify-center rounded-full after:size-2 after:rounded-full after:border-[1.5px] after:border-muted after:transition-colors after:duration-300 after:ease-out hover:after:border-foreground aria-selected:after:border-accent aria-selected:after:bg-accent";


// The prev/next buttons (Splide finds them by their splide__arrow--prev/--next classes and wires them):
// round, 44px, a black chevron on white with a dark ring, so they show over light and dark screenshots
// alike. Centred on the track, inset from its edges. On phones they'd cover the card, so they drop into
// the dots row below instead: top-full + mt-8 puts their top on the row's (it has the same mt-8).
const arrowClass =
  "splide__arrow absolute top-1/2 z-10 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-foreground text-background transition-colors ease-out hover:bg-foreground/90 max-sm:top-full max-sm:mt-8 max-sm:translate-y-0";

type CarouselProps = {
  /** The group's accessible name, e.g. "Review videos". */
  label: string;
  /** Splide's per-slide label; %s is replaced by the number and total, e.g. "Video %s of %s". */
  slideLabel: string;
  /** Prev/next buttons over the track's edges (default off: the reviews use the dots only). */
  arrows?: boolean;
  /** Extra wiring after Splide mounts (must be a stable function). May return a cleanup. */
  onMounted?: (root: HTMLElement, splide: Splide) => void | (() => void);
  className?: string;
  children: ReactNode;
};

/**
 * The shared looping Splide carousel (core styles only; the look comes from the tokens).
 * 4 slides per view from lg, 2 on tablets, and on phones 1 centred with a peek of the cards either side,
 * edge to edge (it takes back the container's padding), with page dots under it.
 * Moved by the dots, drag and swipe, the arrow keys when focused, and with `arrows` the prev/next buttons.
 * Loop clones slides as plain DOM without React handlers, so slides must work without them
 * (CSS only, or wired in onMounted through listeners on the root).
 */
export function Carousel({
  label,
  slideLabel,
  arrows = false,
  onMounted,
  className,
  children,
}: CarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const splide = new Splide(root, {
      type: "loop",
      // The section is already the landmark region. Splide sets aria-label from `label` on mount.
      role: "group",
      label,
      perPage: 4,
      // One slide per move (Splide's default moves a whole page).
      perMove: 1,
      gap: "1.5rem",
      // Below lg and below sm, matching the pre-mount widths' sm: and lg: classes. Phones: 12% of the
      // track either side shows the neighbouring cards, so each card is 76% of the screen wide (the
      // whole width inside the track's padding, hence w-full before mount).
      breakpoints: {
        [maxPx("lg")]: { perPage: 2 },
        [maxPx("sm")]: { perPage: 1, gap: "1rem", padding: "12%" },
      },
      pagination: true,
      // When on, Splide uses our buttons below (when off it would otherwise add its own).
      arrows,
      drag: true,
      noDrag: "button",
      keyboard: "focused",
      // Splide's default reducedMotion sets this to 0 for prefers-reduced-motion.
      speed: 300,
      i18n: { slideLabel },
      classes: { page: pageClass },
    });
    splide.mount();
    const cleanup = onMounted?.(root, splide);
    return () => {
      cleanup?.();
      splide.destroy();
    };
  }, [label, slideLabel, arrows, onMounted]);

  return (
    // is-rendered: Splide's core CSS hides a carousel until it mounts; this class (from Splide's own
    // SSR renderer) keeps the server-rendered slides visible before then, and without JavaScript.
    // Phones: -mx-4 cancels the container's padding, so the neighbouring cards run to the screen edges.
    <div ref={rootRef} className={cn("splide is-rendered max-sm:-mx-4", className)} aria-label={label}>
      <div className="relative">
        {/* Pre-mount widths, gap and (on phones) the track's side padding match Splide's, so nothing
            jumps when it mounts; its inline styles win after. The margins are important (!) to beat the
            core CSS's unlayered `margin: 0`. */}
        <SplideTrack
          trackClassName="max-sm:px-[12%]"
          slideClassName="mr-4! w-full sm:mr-6! sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
        >
          {children}
        </SplideTrack>
        {/* Shown once Splide has mounted (is-initialized), so there are never buttons that do nothing.
            Splide adds their labels ("Previous slide", "Next slide") and aria-controls. */}
        {arrows && (
          <div className="splide__arrows hidden in-[.is-initialized]:block">
            <button type="button" className={cn(arrowClass, "splide__arrow--prev left-3 max-sm:left-4")}>
              <ChevronLeftIcon className="size-5" />
            </button>
            <button type="button" className={cn(arrowClass, "splide__arrow--next right-3 max-sm:right-4")}>
              <ChevronRightIcon className="size-5" />
            </button>
          </div>
        )}
      </div>
      {/* Splide fills the list with one button per page; the box holds its height before mount, so nothing
          shifts. On phones with arrows it's 44px tall, holding them either side of the dots. */}
      <div className={cn("mt-8 flex h-6 items-center justify-center", arrows && "max-sm:h-11")}>
        <ul className="splide__pagination" />
      </div>
    </div>
  );
}
