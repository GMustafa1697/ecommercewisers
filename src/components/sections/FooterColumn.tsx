import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

type FooterColumnProps = {
  title: string;
  /** The column's <li> items. */
  children: ReactNode;
};

/** A titled link list in the Footer. The title is a small muted label, like the Contact email's. */
export function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <Eyebrow as="h2" variant="label">
        {title}
      </Eyebrow>
      <ul className="mt-3">{children}</ul>
    </div>
  );
}
