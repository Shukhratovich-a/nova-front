import { DetailedHTMLProps, HTMLAttributes } from "react";

import { ICategory } from "@/types/category.interface";

export interface CategoryItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  category: ICategory;
}
