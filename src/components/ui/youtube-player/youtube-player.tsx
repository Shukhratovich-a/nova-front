import { FC } from "react";

import { YoutubePlayerProps } from "./youtube-player.props";

export const YoutubePlayer: FC<YoutubePlayerProps> = ({ url, width = 560, height = 315, ...props }) => {
  const getYoutubeEmbedUrl = (url: string) => {
    const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url?.match(youtubeUrlRegex);

    const videoId = match && match[4];

    return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&mute=1`;
  };

  const embedUrl = getYoutubeEmbedUrl(url);

  return <iframe {...props} width={width} height={height} src={embedUrl} allowFullScreen></iframe>;
};
