import type { ReactNode } from "react";

type SectionGridProps = {
  /** The list's <li> items. */
  children: ReactNode;
  /** An <ol> for ordered steps (Process); otherwise a <ul>. */
  ordered?: boolean;
};

/** The 1 / 2 / 4-column list under a section heading. */
export function SectionGrid({ children, ordered = false }: SectionGridProps) {
  const List = ordered ? "ol" : "ul";
  return <List className="mt-12 grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">{children}</List>;
}
