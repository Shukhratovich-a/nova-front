import { HTMLAttributes } from "react";

import { IVideoCard } from "@/types/video.interface";

export interface VideosListProps extends HTMLAttributes<HTMLDivElement> {
  videos: IVideoCard[];
}
