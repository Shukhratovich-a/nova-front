import { DetailedHTMLProps, HTMLAttributes } from "react";

import { ICategory } from "@/types/category.interface";

export interface CategoriesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  categories: ICategory[];
  total: number;
}
