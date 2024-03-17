import { Breadcrumbs } from "@/components";
import { IVideo } from "@/types/video.interface";
import { FC } from "react";

export const VideoView: FC<{ video: IVideo }> = ({ video }) => {
  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="30px" urlList={["video", video.title]} />
      </section>
      {video.title}
    </div>
  );
};

export default VideoView;
