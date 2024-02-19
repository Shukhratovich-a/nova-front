import { FC } from "react";
import Link from "next/link";
import cn from "classnames";

import { TagProps } from "./tag.props";

import styles from "./tag.module.scss";

export const Tag: FC<TagProps> = ({ className, children, ...props }) => {
  return (
    <Link className={cn(styles.tag, className, "badge-text")} {...props}>
      {children}
    </Link>
  );
};
