import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IContact } from "@/types/contact.interface";

export interface ContactProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  centrals: IContact[];
  factories: IContact[];
}
