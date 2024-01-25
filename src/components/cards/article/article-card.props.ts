import { HTMLAttributes } from "react";

export interface ArticleCardProps extends HTMLAttributes<HTMLDivElement> {
  productCode?: number;
  text: string;
  imageUrl: string;
  link: string;
}
