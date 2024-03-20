import { FC } from "react";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import cn from "classnames";

import { DOMAIN } from "@/helpers/api.helper";

import { HomeIntroProps } from "./home-intro.props";

import { Slider } from "@/components";

import styles from "./home-intro.module.scss";

export const HomeIntro: FC<HomeIntroProps> = ({ banners }) => {
  return (
    <div className={styles.wrapper}>
      <Slider className={cn(styles.swiper)} type={"full-screen"}>
        {banners.map(({ id, poster, title, description, subtitle }, index) => {
          return (
            <SwiperSlide className={cn(styles.slide)} key={id}>
              <div
                className={cn(styles.background, {
                  [styles["background--blue"]]: index % 2 !== 0,
                })}
              >
                <Image
                  className="swiper-slide-image"
                  src={`${DOMAIN}${poster}`}
                  alt={title}
                  fill
                  priority={index > 1 ? false : true}
                  loading={index > 1 ? "lazy" : "eager"}
                />
              </div>

              <div className={cn(styles.wrap, "container")}>
                <div className={styles.content}>
                  <h1 className={cn("color-white")} dangerouslySetInnerHTML={{ __html: title }} />

                  <div
                    className={cn(styles.description, "subtitle-lg", "color-white")}
                    dangerouslySetInnerHTML={{ __html: description }}
                  />

                  <div
                    className={cn(styles.subtitle, "subtitle-md", "color-white")}
                    dangerouslySetInnerHTML={{ __html: subtitle }}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Slider>
    </div>
  );
};

export default HomeIntro;
