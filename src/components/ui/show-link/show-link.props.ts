import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode, RefAttributes } from "react";
import { LinkProps } from "next/link";

export interface ShowLinkProps
  extends DetailedHTMLProps<
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
      LinkProps & {
        children?: ReactNode;
      } & RefAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}
