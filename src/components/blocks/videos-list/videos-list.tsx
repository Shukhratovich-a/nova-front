import { useTranslation } from "next-i18next";
import { FC } from "react";

import { ProductCard } from "@/components";

import styles from "./videos-list.module.scss";
import { VideosListProps } from "./videos-list.props";

export const VideosList: FC<VideosListProps> = ({ videos }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t("videos")}</h2>

      {!!videos.length ? (
        <ul className={styles.list}>
          {videos.map((video) => (
            <li className={styles.item} key={video.id}>
              <ProductCard card="video" product={video} />
            </li>
          ))}
        </ul>
      ) : (
        <span>No video yet</span>
      )}
    </div>
  );
};
