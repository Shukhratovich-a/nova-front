import cn from "classnames";
import { useTranslation } from "next-i18next";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";

import { MediaProps } from "./media.props";

import { ProductCard, Slider } from "@/components";

import PdfButtons from "@/components/ui/pdf-buttons/pdf-buttons";
import styles from "./media.module.scss";

export const MediaView: FC<MediaProps> = ({ video, certificate, catalogs }) => {
  const { t } = useTranslation();

  return (
    <div className="main-margin">
      {/* {!!catalogs?.length && (
        <section>p
          <MediaIntro catalogs={catalogs} />
        </section>
      )} */}
      {!!catalogs.length && (
        <section className={cn(styles["block-mb"], "container")}>
          <h2 className={cn(styles.title, "color-accent")}>{t("catalogs")}</h2>

          <Slider type={"dynamic"} quantity={4} title={t("catalogs")}>
            {catalogs.map((item) => {
              return (
                <SwiperSlide className={styles.catalog} key={item.id}>
                  <ProductCard card="catalog" product={item} />
                  <PdfButtons name={item.catalog} type="catalog" className={styles.pdfButton} />
                </SwiperSlide>
              );
            })}
          </Slider>
        </section>
      )}

      {!!video?.length && (
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

      {!!certificate?.length && (
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
