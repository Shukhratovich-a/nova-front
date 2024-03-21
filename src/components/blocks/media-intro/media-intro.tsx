import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import queryString from "query-string";
import cn from "classnames";

import { DOMAIN } from "@/helpers/api.helper";

import { MediaIntroProps } from "./media-intro.props";

import { Button, Slider } from "@/components";

import CatalogBackground from "@images/catalog-background.webp";

import styles from "./media-intro.module.scss";

export const MediaIntro: FC<MediaIntroProps> = ({ catalogs }) => {
  const catalogBg = (
    <div className={cn("swiper-slide-image", styles.background)}>
      <Image fill priority className={cn(styles.image)} alt="catalog background image" src={CatalogBackground} />
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

                  <div className={styles.buttons}>
                    <Link
                      href={queryString.stringifyUrl({ url: `${DOMAIN}/file/download-file`, query: { file: catalog } })}
                    >
                      <Button appearance="yellow">Скачать</Button>
                    </Link>

                    <Link
                      href={queryString.stringifyUrl({ url: `${DOMAIN}/file/get-file`, query: { file: catalog } })}
                      target="_blank"
                    >
                      <Button appearance="outlined">Смотреть</Button>
                    </Link>
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
