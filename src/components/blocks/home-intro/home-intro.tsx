import { Slider } from "@/components";
import cn from "classnames";
import Image from "next/image";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./home-intro.module.scss";
import { HomeIntroProps } from "./home-intro.props";

export const HomeIntro: FC<HomeIntroProps> = ({ banner }) => {
  // const { id, poster, title, description, subtitle } = props.banner;
  console.log(banner);

  return (
    <div className={styles.wrapper}>
      <Slider type={"full-screen"}>
        {banner.map(({ id, poster, title, description, subtitle }) => {
          return (
            <SwiperSlide key={id}>
              <Image className="swiper-slide-image" src={`http://localhost:3001${poster}`} alt="" fill priority />
              <div className={cn(styles.wrap, "container")}>
                <div className={styles.content}>
                  <h1 className={cn("color-white")} dangerouslySetInnerHTML={{ __html: title }}></h1>
                  <p className={cn("subtitle-lg color-white")} dangerouslySetInnerHTML={{ __html: description }}></p>
                  <p className={"subtitle-md color-white"} dangerouslySetInnerHTML={{ __html: subtitle }}></p>
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
