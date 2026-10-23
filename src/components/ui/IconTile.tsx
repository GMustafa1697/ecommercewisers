import type { ComponentType } from "react";
import type { IconProps } from "@/components/ui/icons";

type IconTileProps = {
  icon: ComponentType<IconProps>;
};

/**
 * An icon on a solid gold tile, the icon in black: the marker for the Services and footer Why cards (solid
 * since 2026-10-22, your requests; a 15% gold tint before). Centred on phones, like FeatureItem's text.
 */
export function IconTile({ icon: Icon }: IconTileProps) {
  return (
    <span className="mx-auto flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground sm:mx-0">
      <Icon className="size-6" />
    </span>
  );
}
