import { FC } from "react";

import { IVideoCard } from "@/types/video.interface";

import { VideosList } from "@/components";

export const VideosView: FC<{ videos: IVideoCard[] }> = ({ videos }) => {
  return (
    <div className="main-margin container">
      <section>
        <VideosList videos={videos} />
      </section>
    </div>
  );
};

export default VideosView;
