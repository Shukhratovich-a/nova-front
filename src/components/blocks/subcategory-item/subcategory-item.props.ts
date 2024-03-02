import { DetailedHTMLProps, HTMLAttributes } from "react";

import { ISubcategory } from "@/types/subcategory.interface";

export interface SubcategoryItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  subcategory: ISubcategory;
}
