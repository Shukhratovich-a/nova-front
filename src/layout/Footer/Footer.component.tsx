import React from "react";
import cn from "classnames";

import { FooterProps } from "./Footer.props";

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return <footer className={cn(className)}>footer</footer>;
};
