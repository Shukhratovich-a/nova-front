import { FC } from "react";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import cn from "classnames";

import { DOMAIN } from "@/helpers/api.helper";

import { ProductIntroProps } from "./product-intro.props";

import { Button, Slider } from "@/components";

import { IconArrowBottom } from "@/assets/icons";

import styles from "./product-intro.module.scss";

export const ProductIntro: FC<ProductIntroProps> = ({ className, product, ...props }) => {
  const { code, title, description, mainImage, schemeImage, boxImage } = product;

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h1 className="color-accent">{code}</h1>

          <h2>{title}</h2>

          {description && (
            <div
              className={cn(styles.description, "subtitle-md", "custom-scrollbar")}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        <div className={styles.buttons}>
          <Button appearance="yellow">
            Скачать <IconArrowBottom />
          </Button>

          <Button appearance="outlined">Смотреть</Button>
        </div>
      </div>

      <Slider type="dynamic" quantity={1}>
        <SwiperSlide>
          <Image
            className={cn(styles.image, "swiper-slide-image")}
            src={`${DOMAIN}${mainImage}`}
            alt={title}
            width={800}
            height={500}
            priority
            quality={100}
          />
        </SwiperSlide>

        {schemeImage && (
          <SwiperSlide>
            <Image
              className={cn(styles.image, "swiper-slide-image")}
              src={`${DOMAIN}${schemeImage}`}
              alt={title}
              width={800}
              height={500}
              priority
              quality={100}
            />
          </SwiperSlide>
        )}

        {boxImage && (
          <SwiperSlide>
            <Image
              className={cn(styles.image, "swiper-slide-image")}
              src={`${DOMAIN}${boxImage}`}
              alt={title}
              width={800}
              height={500}
              priority
              quality={100}
            />
          </SwiperSlide>
        )}
      </Slider>
    </div>
  );
};

export default ProductIntro;
