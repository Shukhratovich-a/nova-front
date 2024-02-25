import { HTMLAttributes } from "react";

import { ICategory } from "@/types/category.interface";
import { ISubcategory } from "@/types/subcategory.interface";

export interface CategoryCardProps extends HTMLAttributes<HTMLDivElement> {
  category: ICategory | ISubcategory;
  href?: string;
}
