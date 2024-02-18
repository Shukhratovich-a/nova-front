import { DetailedHTMLProps, TimeHTMLAttributes } from "react";

export interface DateProps extends DetailedHTMLProps<TimeHTMLAttributes<HTMLTimeElement>, HTMLTimeElement> {
  date: Date;
  size?: "sm" | "md";
}
