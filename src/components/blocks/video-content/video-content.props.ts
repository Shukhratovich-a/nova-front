import { IVideo } from "@/types/video.interface";
import { HTMLAttributes } from "react";

export interface VideoContentProps extends HTMLAttributes<HTMLDivElement> {
  video: IVideo
}
