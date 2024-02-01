import cn from "classnames";
import React from "react";

import styles from "./Button.module.scss";
import { ButtonProps } from "./button.props";

export const Button: React.FC<ButtonProps> = ({ className, children, appearance = "accent", ...props }) => {
  return (
    <button className={cn(styles.button, className, styles[appearance])} {...props}>
      {children}
    </button>
  );
};

export default Button