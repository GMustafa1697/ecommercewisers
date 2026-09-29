import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

/** The small label above a heading: gold on dark, black on light bands (text-accent). */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={cn("font-mono text-xs uppercase tracking-widest text-accent", className)}>
      {children}
    </p>
  );
}
