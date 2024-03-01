import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

export interface DropdownProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  // isOpen: boolean;
  // setIsOpen: Function;
  trigger: ReactElement<any, any> | string;
}
