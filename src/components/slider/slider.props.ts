import { HTMLAttributes } from "react";

export interface SliderProps extends HTMLAttributes<HTMLDivElement> {
  quantity?: 1 | 2 | 3 | 4;
  type: "full-screen" | "dynamic";
  width?: number;
}

export interface IBreakpoints {
  [key: number]: {
    slidesPerView: number;
    slidesPerGroup: number;
  };
}

export interface IGetBreakpoints {
  quantity: number;
  width: number;
}
