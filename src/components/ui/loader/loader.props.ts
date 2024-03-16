import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface LoaderProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> {}
