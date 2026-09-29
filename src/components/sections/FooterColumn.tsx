import type { ReactNode } from "react";

type FooterColumnProps = {
  title: string;
  /** The column's <li> items. */
  children: ReactNode;
};

/** A titled link list in the Footer. */
export function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <h2 className="text-sm text-muted">{title}</h2>
      <ul className="mt-2">{children}</ul>
    </div>
  );
}
