import { FC } from "react";
import cn from "classnames";

import { LoaderProps } from "./loader.props";

import styles from "./loader.module.scss";

export const Loader: FC<LoaderProps> = ({ className, ...props }) => {
  return <span className={cn(styles.loader)} {...props}></span>;
};
