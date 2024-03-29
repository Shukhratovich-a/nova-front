import cn from "classnames";
import Image from "next/image";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import { ProductIntroProps } from "./product-intro.props";

import { Slider } from "@/components";

import PdfButtons from "@/components/ui/pdf-buttons/pdf-buttons";
import { DOMAIN } from "@/helpers/api.helper";
import styles from "./product-intro.module.scss";

export const ProductIntro: FC<ProductIntroProps> = ({ className, product, ...props }) => {
  const { code, title, description, mainImage, schemeImage, boxImage } = product;

  const images = [
    { id: 1, image: mainImage },
    { id: 2, image: schemeImage },
    { id: 3, image: boxImage },
  ];

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.text}>
        <h1 className="color-accent">{code}</h1>
        <h2>{title}</h2>
      </div>

      <div
        className={cn(styles.description, "subtitle-md", "custom-scrollbar")}
        dangerouslySetInnerHTML={{ __html: description }}
      />

      <PdfButtons name={code} type="product" className={styles.buttons} />

      <Slider className={cn(styles.gallery)} type="dynamic" quantity={1}>
        {images.map(({ id, image }) => {
          if (!image) return "";

          return (
            <SwiperSlide key={id}>
              <div className={styles.image}>
                <Image
                  className={cn("swiper-slide-image")}
                  src={`${DOMAIN}${image}`}
                  alt={title}
                  width={800}
                  height={400}
                  priority
                  quality={100}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductIntro;
