import { Children, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SplideTrackProps = {
  /** Each slide's classes, e.g. its pre-mount width (Splide's inline width wins once it mounts). */
  slideClassName: string;
  /** The track's classes, e.g. its pre-mount padding (Splide's inline padding wins once it mounts). */
  trackClassName?: string;
  children: ReactNode;
};

/** Splide's track and list, one <li> slide per child. Shared by Carousel and LogoStrip. */
export function SplideTrack({ slideClassName, trackClassName, children }: SplideTrackProps) {
  return (
    <div className={cn("splide__track", trackClassName)}>
      <ul className="splide__list">
        {Children.toArray(children).map((child, index) => (
          <li
            key={isValidElement(child) && child.key !== null ? child.key : index}
            className={cn("splide__slide", slideClassName)}
          >
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}
