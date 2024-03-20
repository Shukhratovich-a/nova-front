import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IVideo } from "@/types/video.interface";

export interface VideoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  video: IVideo;
}
