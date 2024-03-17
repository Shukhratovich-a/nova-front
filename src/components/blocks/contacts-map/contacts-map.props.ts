import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IContact } from "@/types/contact.interface";

export interface ContactsMapProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  orient: "row" | "column";
  contact: IContact;
}
