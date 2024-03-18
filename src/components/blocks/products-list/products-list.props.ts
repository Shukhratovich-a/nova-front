import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IProduct } from "@/types/product.interface";

export interface ProductsListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  products: IProduct[];
  total: number;
}
