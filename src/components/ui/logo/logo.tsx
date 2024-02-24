import { FC } from "react";
import cn from "classnames";

import { LogoProps } from "./logo.props";

import { IconLogo } from "@/assets/icons";

import styles from "./logo.module.scss";

export const Logo: FC<LogoProps> = ({ color = "default", ...props }) => {
  return (
    <IconLogo
      className={cn(styles.logo, { [styles["logo--custom"]]: color === "custom" })}
      width={220}
      height={62}
      {...props}
    />
  );
};
