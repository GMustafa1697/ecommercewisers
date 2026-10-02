import type { ComponentType } from "react";
import type { IconProps } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type IconTileProps = {
  icon: ComponentType<IconProps>;
  /** Extra classes on the tile, e.g. the Why cards' hover. */
  className?: string;
};

/**
 * An icon on a gold-tinted tile: the accent marker for the Services and Why cards. The tint marks
 * labels and icons; solid gold marks actions. The icon is the accent (black on white, gold on dark).
 * Centred on phones, like FeatureItem's text.
 */
export function IconTile({ icon: Icon, className }: IconTileProps) {
  return (
    <span
      className={cn(
        "mx-auto flex size-12 items-center justify-center rounded-md bg-primary/15 text-accent sm:mx-0",
        className,
      )}
    >
      <Icon className="size-6" />
    </span>
  );
}
