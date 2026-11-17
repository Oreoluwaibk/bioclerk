import type { DetailedHTMLProps, HTMLAttributes } from "react";

type MsStoreBadgeProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  productid?: string;
  productname?: string;
  cid?: string;
  theme?: "dark" | "light" | "auto";
  animation?: "on" | "off";
  language?: string;
  "window-mode"?: "direct" | "full";
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ms-store-badge": MsStoreBadgeProps;
    }
  }
}

export {};
