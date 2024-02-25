import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IBanner } from "@/types/banner.interface";
import { ICategory } from "@/types/category.interface";

export interface HomeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  banners: IBanner[];
  categories: ICategory[];
}
