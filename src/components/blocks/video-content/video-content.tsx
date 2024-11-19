import { YoutubePlayer } from "@/components/ui/youtube-player/youtube-player";
import { FC } from "react";
import styles from "./video-content.module.scss";
import { VideoContentProps } from "./video-content.props";
import ProductCard from "@/components/cards/product/product-card";

export const VideoContent: FC<VideoContentProps> = ({ video, children, ...props }) => {
  const { video: url, products } = video;
  return (
    <div className={styles.wrapper} {...props}>
      <YoutubePlayer className={styles.video} width={1440} height={684} url={url} />
      {products?.length !== 0 && (
        <div className={styles.content}>
          <h2 className={styles.title}>товары, связанные с видео</h2>
          <div className={styles.products}>
            {products?.map((item) => {
              return <ProductCard key={item.id} product={item} card={"product"} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoContent;
