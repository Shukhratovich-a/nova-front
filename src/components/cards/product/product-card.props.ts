import { HTMLAttributes } from "react";

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  imageUrl: string;
  link: string;
}
