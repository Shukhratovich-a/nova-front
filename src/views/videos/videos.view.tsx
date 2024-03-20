import { Breadcrumbs } from "@/components";
import { VideosList } from "@/components/blocks/videos-list/videos-list";
import { IVideoCard } from "@/types/video.interface";
import { FC } from "react";

export const VideosView: FC<{ videos: IVideoCard[] }> = ({ videos }) => {
  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="30px" urlList={["video"]} />
      </section>
      <section>
        <VideosList videos={videos} />
      </section>
    </div>
  );
};

export default VideosView;
