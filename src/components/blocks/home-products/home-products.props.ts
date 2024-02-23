import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface HomeProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}
