import { IDetailCategory } from "@/types/product.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ProductInfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  detailCategories: IDetailCategory[];
}
