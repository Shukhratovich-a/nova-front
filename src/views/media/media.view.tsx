import { FC } from "react";
import { useTranslation } from "next-i18next";
import { SwiperSlide } from "swiper/react";
import cn from "classnames";

import { MediaProps } from "./media.props";

import { ProductCard, Slider, MediaIntro } from "@/components";

import styles from "./media.module.scss";

export const MediaView: FC<MediaProps> = ({ video, certificate, catalogs }) => {
  const { t } = useTranslation();

  return (
    <div id="catalog" className="main-margin">
      {!!catalogs.length && (
        <section>
          <MediaIntro catalogs={catalogs} />
        </section>
      )}

      {!!video.length && (
        <section id="video" className={cn(styles["block-mb"], "container")}>
          <h2 className={cn(styles.title, "color-accent")}>{t("video")}</h2>

          <Slider type={"dynamic"} quantity={4}>
            {video.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <ProductCard card="video" product={item} />
                </SwiperSlide>
              );
            })}
          </Slider>
        </section>
      )}

      {!!certificate.length && (
        <section id="certificate" className={cn(styles["block-mb"], "container")}>
          <h2 className={cn(styles.title, "color-accent")}>{t("certificates")}</h2>

          <Slider type={"dynamic"} quantity={5}>
            {certificate.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <ProductCard card="certificate" product={item} />
                </SwiperSlide>
              );
            })}
          </Slider>
        </section>
      )}
    </div>
  );
};

export default MediaView;
