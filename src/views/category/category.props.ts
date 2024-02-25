import { DetailedHTMLProps, HTMLAttributes } from "react";

import { ICategory } from "@/types/category.interface";

export interface CategoryProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  category: ICategory;
}
