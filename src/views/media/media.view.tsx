import { Breadcrumbs, ProductCard, Slider } from "@/components";
import MediaIntro from "@/components/blocks/media-intro/media-intro";
import cn from "classnames";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./media.module.scss";
import { MediaProps } from "./media.props";

export const MediaView: FC<MediaProps> = ({ video, certificate, catalogs }) => {
  return (
    <div id="catalog" className="main-margin">
      <section>
        <MediaIntro catalogs={catalogs} />
      </section>

      <section id="video" className={cn(styles["block-mb"], "container")}>
        <h2 className={cn(styles.title, "color-accent")}>Видеоинструкция по монтажу</h2>
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

      <section id="certificate" className={cn(styles["block-mb"], "container")}>
        <h2 className={cn(styles.title, "color-accent")}>Сертификаты</h2>
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
    </div>
  );
};

export default MediaView;
