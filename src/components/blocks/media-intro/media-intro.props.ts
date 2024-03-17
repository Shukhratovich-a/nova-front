import { ICatalog } from "@/types/catalog.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface MediaIntroProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  catalogs: ICatalog[];
}
