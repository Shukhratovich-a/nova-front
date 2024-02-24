import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IBanner } from "@/types/banner.interface";

export interface HomeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  banners: IBanner[];
}
