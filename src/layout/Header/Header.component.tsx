import React from "react";
import cn from "classnames";

import { HeaderProps } from "./Header.props";

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return <header className={cn(className)}>header</header>;
};
