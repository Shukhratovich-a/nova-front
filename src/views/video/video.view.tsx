import { Breadcrumbs } from "@/components";
import VideoContent from "@/components/blocks/video-content/video-content";
import { YoutubePlayer } from "@/components/ui/youtube-player/youtube-player";
import { IVideo } from "@/types/video.interface";
import { FC } from "react";

export const VideoView: FC<{ video: IVideo }> = ({ video }) => {
  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="30px" urlList={["video", video.title]} />
      </section>
      <section>
        <VideoContent video={video}/>
      </section>
    </div>
  );
};

export default VideoView;
