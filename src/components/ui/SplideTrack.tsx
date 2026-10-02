import { Children, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SplideTrackProps = {
  /** Each slide's classes, e.g. its pre-mount width (Splide's inline width wins once it mounts). */
  slideClassName: string;
  children: ReactNode;
};

/** Splide's track and list, one <li> slide per child. Shared by Carousel and LogoStrip. */
export function SplideTrack({ slideClassName, children }: SplideTrackProps) {
  return (
    <div className="splide__track">
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
