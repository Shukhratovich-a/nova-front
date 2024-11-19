import { HTMLAttributes } from "react";

import { IInstallationVideoCard, IVideoCard } from "@/types/video.interface";

export interface VideosListProps extends HTMLAttributes<HTMLDivElement> {
  videos: (IInstallationVideoCard | IVideoCard)[];
}
