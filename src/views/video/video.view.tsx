import { FC } from "react";
import { useTranslation } from "next-i18next";

import { VideoProps } from "./video.props";

import { Breadcrumbs, VideoContent } from "@/components";

export const VideoView: FC<VideoProps> = ({ video, ...props }) => {
  const { t } = useTranslation();

  const urlList = [{ title: t("video"), link: "/video" }];

  return (
    <div className="main-margin container" {...props}>
      <section>
        <Breadcrumbs mb="30px" urlList={urlList} />
      </section>

      <section>
        <VideoContent video={video} />
      </section>
    </div>
  );
};

export default VideoView;
