import { Breadcrumbs, ProductCard, Slider } from "@/components";
import MediaIntro from "@/components/blocks/media-intro/media-intro";
import cn from "classnames";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./media.module.scss";
import { MediaProps } from "./media.props";

export const MediaView: FC<MediaProps> = ({ video, certificate }) => {
  return (
    <div className="main-margin">
      <section className="container">
        <Breadcrumbs mb="30px" urlList={["media"]} />
      </section>
      <section>
        <MediaIntro />
      </section>
      <section className="container">
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
      <section className="container">
        <h2 className={cn(styles.title, "color-accent")}>Видеоинструкция по монтажу</h2>
        <Slider type={"dynamic"} quantity={5}>
          {video.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <ProductCard card="video" product={item} />
              </SwiperSlide>
            );
          })}
        </Slider>
      </section>
    </div>
  );
};

export default MediaView;
