import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IContact } from "@/types/contact.interface";

export interface ContactsOurFactoriesProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  contacts: IContact[];
}
