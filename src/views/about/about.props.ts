import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IAbout } from "@/types/about.interface";

export interface AboutProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  abouts: IAbout[];
}
