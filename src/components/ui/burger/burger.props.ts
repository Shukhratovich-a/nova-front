import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface BurgerProps
  extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "children"> {
  isActive?: boolean;
  color?: "white" | "blue";
}
