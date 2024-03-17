import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

export interface YoutubePlayerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  url: string;
  width?: number | string;
  height?: number | string
}

