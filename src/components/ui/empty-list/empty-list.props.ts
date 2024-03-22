import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface EmptyListProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  translateKey?: string;
}
