import { IBanner } from "@/types/banner.interface";
import { HTMLAttributes } from "react";

export interface HomeIntroProps extends HTMLAttributes<HTMLDivElement> {
  banner: IBanner[];
}
