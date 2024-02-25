import { FC } from "react";
import cn from "classnames";

import { BurgerProps } from "./burger.props";

import { IconBurger, IconClose } from "@icons";

import styles from "./burger.module.scss";

export const Burger: FC<BurgerProps> = ({ className, isActive = false, color = "white", ...props }) => {
  return (
    <button className={cn(styles.burger, className, styles[`burger--${color}`])} {...props}>
      {isActive ? <IconClose /> : <IconBurger />}
    </button>
  );
};
