import { HTMLAttributes } from "react";

export interface IntroProps extends HTMLAttributes<HTMLDivElement> {
  data: [{ id: number; title: string; subtitle: string; caption?: string }];
}
