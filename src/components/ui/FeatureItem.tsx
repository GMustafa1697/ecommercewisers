import type { ReactNode } from "react";

type FeatureItemProps = {
  /** The icon or step number above the title. */
  marker: ReactNode;
  title: string;
  description: string;
  /** The wrapper style: a card (Services) or a top border (Why). */
  className?: string;
};

/** One point in a section list: marker, H3 and one line. Renders an <li>, so use it inside <ul> or <ol>. */
export function FeatureItem({ marker, title, description, className }: FeatureItemProps) {
  return (
    <li className={className}>
      {marker}
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-muted">{description}</p>
    </li>
  );
}
