import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Text logo until a real ecommercewisers logo exists (docs/DESIGN.md → Logo). */
export function Wordmark({ className }: { className?: string }) {
  return <span className={cn("text-lg font-semibold tracking-tight", className)}>{site.name}</span>;
}
