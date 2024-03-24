import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IProduct } from "@/types/product.interface";

export interface ProductRelatedProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  relatedProducts: IProduct[];
}
