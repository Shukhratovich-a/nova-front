import { DetailedHTMLProps, TimeHTMLAttributes } from "react";

export interface DateTimeProps extends DetailedHTMLProps<TimeHTMLAttributes<HTMLTimeElement>, HTMLTimeElement> {
  date: string;
  size?: "sm" | "md";
}
