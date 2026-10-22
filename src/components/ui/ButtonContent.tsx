import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "@/components/ui/icons";

// The arrow's travel, from your buttons.html: 400ms on its ease-out curve.
const arrowMotion = "transition-transform duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)]";

/**
 * The contents of a CTA button: the spin ring, the label and the arrow that swaps on hover.
 *
 * The ring (`.btn-ring`, drawn in globals.css) sits over the button's 2px border and appears on hover
 * or keyboard focus, spinning; the label and the arrow sit above its inner cover (`z-1`).
 *
 * The arrow is a diagonal up-right glyph in a fixed 14px box that clips it (overflow-hidden). Two
 * copies of the same glyph sit in the box: the first is in place at rest and leaves through the
 * top-right corner on hover, while the second waits below the clip and rises into place. The clip
 * does the hiding, so the arrow is always there. Its stroke is heavier than the other icons' (3 on
 * the 24 grid, about 1.8px), as in buttons.html, so it holds up beside the semibold label.
 *
 * The box sits in the button's flow, so the button never changes size on hover (no layout shift).
 * The `group` class comes from the button's variant (ButtonLink.tsx), so `group-hover:` means "the
 * button is hovered" and `group-focus-visible:` "the button has keyboard focus". The `motion-safe:`
 * prefixes keep the arrow still under prefers-reduced-motion.
 */
export function ButtonContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="btn-ring" aria-hidden="true" />
      <span className="relative z-1">{children}</span>
      <span className="relative z-1 size-3.5 shrink-0 overflow-hidden" aria-hidden="true">
        <ArrowUpRightIcon
          strokeWidth={3}
          className={`absolute inset-0 size-full ${arrowMotion} motion-safe:group-hover:translate-x-[150%] motion-safe:group-hover:-translate-y-[150%] motion-safe:group-focus-visible:translate-x-[150%] motion-safe:group-focus-visible:-translate-y-[150%]`}
        />
        <ArrowUpRightIcon
          strokeWidth={3}
          className={`absolute inset-0 size-full translate-y-[150%] ${arrowMotion} motion-safe:group-hover:translate-y-0 motion-safe:group-focus-visible:translate-y-0`}
        />
      </span>
    </>
  );
}
