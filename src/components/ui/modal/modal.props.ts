import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

export interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  // isOpen: boolean;
  // setIsOpen: Function;
  trigger: ReactElement<any, any> | string;
}
