import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type FeatureItemProps = {
  /** The icon or step number above the title. Centre it on phones (`mx-auto sm:mx-0`), like the text. */
  marker: ReactNode;
  title: string;
  description: string;
  /** The wrapper style: the card of Features, Services or Why. */
  className?: string;
  /** Inline style on the wrapper, e.g. the Services stack offset. */
  style?: CSSProperties;
  /** Extra content after the description, e.g. the Services checklist. */
  children?: ReactNode;
};

/**
 * One point in a section list: marker, H3 and one line. Renders an <li>, so use it inside <ul> or <ol>.
 * Centred on phones, left-aligned from sm.
 */
export function FeatureItem({ marker, title, description, className, style, children }: FeatureItemProps) {
  return (
    <li className={cn("text-center sm:text-left", className)} style={style}>
      {marker}
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-pretty text-muted">{description}</p>
      {children}
    </li>
  );
}
