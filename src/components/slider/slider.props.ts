import { HTMLAttributes } from "react";

export interface SliderProps extends HTMLAttributes<HTMLDivElement> {
  quantity?: number;
  type: "full-screen" | "dynamic";
  width?: number;
  mobile?: boolean;
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
  mobile?: boolean;
}
