import { Button, Slider } from "@/components";
import cn from "classnames";
import Image from "next/image";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./media-intro.module.scss";
import { MediaIntroProps } from "./media-intro.props";
import { IconArrowBottom } from "@/assets/icons";

export const MediaIntro: FC<MediaIntroProps> = () => {
  return (
    <div className={styles.wrapper}>
      <Slider className={styles.slider} type="full-screen">
        <SwiperSlide className={styles["slider-item"]}>
          <Image
            className={cn("swiper-slide-image", styles.image)}
            width={1200}
            height={800}
            alt=""
            src={`https://picsum.photos/1200/700`}
          />
          <div className={cn(styles.wrap, "container")}>
            <Image
              className={styles["catalog-image"]}
              width={372}
              height={522}
              alt=""
              src={`https://picsum.photos/372/522`}
            />
            <div className={styles.content}>
              <h2 className={cn("color-accent")}>Каталог Турции 2022</h2>
              <p className={cn("subtitle-lg color-gray")}>Plumbing Solutions</p>
              <div className={styles.buttons}>
                <Button appearance="yellow">
                  Скачать <IconArrowBottom />
                </Button>
                <Button appearance="outlined"> Каталог товаров</Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.item}>
          <Image
            className={cn("swiper-slide-image", styles.image)}
            width={1200}
            height={800}
            alt=""
            src={`https://picsum.photos/1200/700`}
          />
          <div className={cn(styles.wrap, "container")}>
            <Image
              className={styles["catalog-image"]}
              width={372}
              height={522}
              alt=""
              src={`https://picsum.photos/372/522`}
            />
            <div className={styles.content}>
              <h2 className={cn("color-accent")}>Каталог Турции 2022</h2>
              <p className={cn("subtitle-lg color-gray")}>Plumbing Solutions</p>
              <div className={styles.buttons}>
                <Button appearance="yellow">
                  Скачать <IconArrowBottom />
                </Button>
                <Button appearance="outlined"> Каталог товаров</Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Slider>
    </div>
  );
};

export default MediaIntro;
