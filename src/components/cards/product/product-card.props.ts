import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IProduct } from "@/types/product.interface";

export interface ProductCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
}
