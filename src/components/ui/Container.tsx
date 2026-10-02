import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** The page container: at most 1440px wide (max-w-360 = 90rem), padding included. */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
