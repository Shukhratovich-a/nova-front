import { HTMLAttributes, ReactNode } from "react";

export interface SliderProps extends HTMLAttributes<HTMLDivElement> {
  quantity?: number;
  type: "full-screen" | "dynamic";
  width?: number;
  mobile?: boolean;
  // children?: ReactNode;
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
