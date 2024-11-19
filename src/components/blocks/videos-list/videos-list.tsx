import { FC } from "react";
import { useTranslation } from "next-i18next";

import { VideosListProps } from "./videos-list.props";

import { ProductCard, EmptyList } from "@/components";

import styles from "./videos-list.module.scss";
import Link from "next/link";

export const VideosList: FC<VideosListProps> = ({ videos }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t("videos")}</h2>

      {!!videos?.length ? (
        <ul className={styles.list}>
          {videos?.map((video) => (
            <li className={styles.item} key={video?.id}>
              <Link href={`/video/${video?.id}`}>
                <ProductCard card="video" product={video} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyList translateKey="videos" />
      )}
    </div>
  );
};
