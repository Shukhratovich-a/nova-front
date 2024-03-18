import { Button, Slider } from "@/components";
import { DOMAIN } from "@/helpers/api.helper";
import cn from "classnames";
import Image from "next/image";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./media-intro.module.scss";
import { MediaIntroProps } from "./media-intro.props";

export const MediaIntro: FC<MediaIntroProps> = ({ catalogs }) => {
  const catalogBg = (
    <div className={cn("swiper-slide-image", styles.background)}>
      <Image
        fill
        priority
        className={cn(styles.image)}
        alt="catalog background image"
        src={"/catalog-background.jpg"}
      />
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <Slider className={styles.slider} type="full-screen">
        {catalogs.map(({ id, title, poster, subtitle, year, catalog }) => {
          return (
            <SwiperSlide key={id} className={styles["slider-item"]}>
              {catalogBg}
              <div className={cn(styles.wrap, "container")}>
                <Image
                  priority
                  className={styles["catalog-image"]}
                  width={372}
                  height={522}
                  alt=""
                  src={`${DOMAIN}${poster}`}
                />
                <div className={styles.content}>
                  <h2 className={cn("color-accent")}>
                    {title} {year}
                  </h2>
                  <p className={cn("subtitle-lg color-gray")}>{subtitle}</p>
                  <div className={styles.buttons}>
                    <Button appearance="yellow">Скачать</Button>
                    <Button appearance="outlined" onClick={() => window.open(`${DOMAIN}${catalog}`, "_blank")}>
                      Каталог товаров
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Slider>
    </div>
  );
};

export default MediaIntro;
