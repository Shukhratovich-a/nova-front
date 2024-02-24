import { DetailedHTMLProps, HTMLAttributes } from "react";

import { ICategory } from "@/types/category.interface";

export interface HomeCategoriesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  categories: ICategory[];
}
