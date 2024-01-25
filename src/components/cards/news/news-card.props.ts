import { HTMLAttributes } from "react";

export interface NewsCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  text: string;
  imageUrl: string;
  link: string;
  date: string;
}
