import cn from "classnames";
import Image from "next/image";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";


import { HomeIntroProps } from "./home-intro.props";

import { Slider } from "@/components";

import styles from "./home-intro.module.scss";

const colorArray = [
  "#a6babe",
  "#A6ABBF",
  "#A6BFB3",
  "#A6B3BF",
  "#999966",
  "#A6BFBB",
  "#809980",
  "#999933",
  "#66664D",
  "#4D80CC",
];

export const HomeIntro: FC<HomeIntroProps> = ({ banners }) => {
  return (
    <div className={styles.wrapper}>
      <Slider className={cn(styles.swiper)} type={"full-screen"}>
        {banners.map(({ id, poster, title, description, subtitle }, index) => {
          return (
            <SwiperSlide className={cn(styles.slide)} key={id}>
              <div
                className={cn(styles.background)}
                style={{ backgroundColor: colorArray[index] }}
              >
                <Image
                  className="swiper-slide-image"
                  src={`${poster}`}
                  alt={title}
                  fill
                  priority
                  loading='eager'
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
