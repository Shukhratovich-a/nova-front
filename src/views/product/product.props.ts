import { IProduct } from "@/types/product.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
  relatedProducts: IProduct[];
}
