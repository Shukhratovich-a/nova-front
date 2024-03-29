import { HTMLAttributes } from "react";

export interface PdfButtonsProps extends HTMLAttributes<HTMLDivElement> {
  name: string | number;
  type: "product" | "catalog";
}
