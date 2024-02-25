import { DetailedHTMLProps, SVGAttributes } from "react";

export interface LogoProps extends DetailedHTMLProps<SVGAttributes<SVGAElement>, SVGAElement> {
  color?: "default" | "custom";
}
