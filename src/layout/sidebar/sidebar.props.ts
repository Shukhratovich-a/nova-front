import { DetailedHTMLProps, HTMLAttributes } from "react";
import { HTMLMotionProps } from "framer-motion";

export interface SidebarProps extends Omit<HTMLMotionProps<"div">, "ref"> {}
