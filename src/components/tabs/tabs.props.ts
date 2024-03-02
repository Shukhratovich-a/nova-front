import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IDetailCategory } from "@/types/product.interface";

export interface TabsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  tabs: IDetailCategory[];
}
