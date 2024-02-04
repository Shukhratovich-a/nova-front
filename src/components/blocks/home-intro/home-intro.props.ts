import { HTMLAttributes } from "react";

export interface HomeIntroProps extends HTMLAttributes<HTMLDivElement> {
  data: [{ id: number; title: string; subtitle: string; caption?: string }];
}
