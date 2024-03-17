import { IconArrowBottom } from "@/assets/icons";
import { Button, Slider } from "@/components";
import cn from "classnames";
import Image from "next/image";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./media-intro.module.scss";
import { MediaIntroProps } from "./media-intro.props";
import { DOMAIN } from "@/helpers/api.helper";

export const MediaIntro: FC<MediaIntroProps> = ({ catalogs }) => {
  return (
    <div className={styles.wrapper}>
      <Slider className={styles.slider} type="full-screen">
        {catalogs.map(({ id, title, poster, subtitle, year }) => {
          return (
            <SwiperSlide key={id} className={styles["slider-item"]}>
              <Image
                className={cn("swiper-slide-image", styles.image)}
                width={1200}
                height={450}
                alt=""
                src={`https://picsum.photos/seed/picsum/1400/400`}
              />
              <div className={cn(styles.wrap, "container")}>
                <Image className={styles["catalog-image"]} width={372} height={522} alt="" src={`${DOMAIN}${poster}`} />
                <div className={styles.content}>
                  <h2 className={cn("color-accent")}>
                    {title} {year}
                  </h2>
                  <p className={cn("subtitle-lg color-gray")}>{subtitle}</p>
                  <div className={styles.buttons}>
                    <Button appearance="yellow">
                      Скачать <IconArrowBottom />
                    </Button>
                    <Button appearance="outlined"> Каталог товаров</Button>
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
