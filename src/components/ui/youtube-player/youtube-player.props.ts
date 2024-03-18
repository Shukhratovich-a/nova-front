import { HTMLAttributes } from "react";

export interface YoutubePlayerProps extends HTMLAttributes<HTMLIFrameElement> {
  url: string;
  width?: number | string;
  height?: number | string;
}
