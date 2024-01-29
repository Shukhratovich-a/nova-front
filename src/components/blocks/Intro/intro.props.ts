import { HTMLAttributes } from "react";

export interface IntroProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  caption?: string
}
