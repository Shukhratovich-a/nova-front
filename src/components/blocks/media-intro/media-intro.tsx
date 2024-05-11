import cn from "classnames";
import Image from "next/image";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";

import { DOMAIN } from "@/helpers/api.helper";

import { MediaIntroProps } from "./media-intro.props";

import { Slider } from "@/components";

import CatalogBackground from "@images/catalog-background.webp";

import PdfButtons from "@/components/ui/pdf-buttons/pdf-buttons";
import styles from "./media-intro.module.scss";

export const MediaIntro: FC<MediaIntroProps> = ({ catalogs }) => {
  const catalogBg = (
    <div className={cn("swiper-slide-image", styles.background)}>
      {CatalogBackground && <Image fill priority alt="catalog background image" src={CatalogBackground} />}
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
                  alt={title}
                  src={`${DOMAIN}${poster}`}
                />
                <div className={styles.content}>
                  <h2 className={cn("color-accent")}>
                    {title} {year}
                  </h2>

                  {subtitle && <p className={cn("subtitle-lg color-gray")}>{subtitle}</p>}

                  <PdfButtons name={catalog} type="catalog" className={styles.buttons} />
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
