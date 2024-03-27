import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface NavbarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  headerIsScrolled?: boolean
}
