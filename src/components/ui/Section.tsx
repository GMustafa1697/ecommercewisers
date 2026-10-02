import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type SectionProps = {
  /** The anchor id. The section is labelled by its heading, which must have the id `${id}-title`. */
  id: string;
  /** Render as a dark section (.theme-dark); otherwise it sits on the white page. */
  dark?: boolean;
  /** Extra classes on the <section>, e.g. a divider between two dark sections. No padding or colour. */
  className?: string;
  children: ReactNode;
};

/** A homepage section after the Hero: the anchor, the landmark label, the standard padding and the container. */
export function Section({ id, dark = false, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(dark && "theme-dark", "py-16 md:py-24 lg:py-28", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
