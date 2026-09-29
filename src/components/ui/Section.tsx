import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type SectionProps = {
  /** The anchor id. The section is labelled by its heading, which must have the id `${id}-title`. */
  id: string;
  /** Render as a light band (.theme-light). */
  light?: boolean;
  children: ReactNode;
};

/** A homepage section after the Hero: the anchor, the landmark label, the standard padding and the container. */
export function Section({ id, light = false, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn(light && "theme-light", "py-16 md:py-24")}>
      <Container>{children}</Container>
    </section>
  );
}
