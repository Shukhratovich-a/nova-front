import { FC } from "react";
import Link from "next/link";
import cn from "classnames";

import { YoutubePlayerProps } from "./youtube-player.props";

import styles from "./youtube-player.module.scss";

export const YoutubePlayer: FC<YoutubePlayerProps> = ({
  url,
  className,
  children,
  width = 560,
  height = 315,
  ...props
}) => {
  const getYoutubePoster = (url: string) => {
    // Проверяем, является ли URL корректным URL YouTube видео
    const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeUrlRegex);
    const videoId = match && match[4];

    return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&mute=1`;
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <iframe
          width={width}
          height={height}
          src={getYoutubePoster(url)}
          // title="YouTube video player"
          // frameBorder={0}
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className={styles.content}>
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
      </div>
    </div>
  );
};
