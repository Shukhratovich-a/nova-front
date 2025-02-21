import cn from "classnames";
import { FC, useState } from "react";
import { ProductIntroProps } from "./product-intro.props";

import PdfButtons from "@/components/ui/pdf-buttons/pdf-buttons";
import { DOMAIN } from "@/helpers/api.helper";
import { useTranslation } from "next-i18next";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { type SwiperClass, Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import styles from "./product-intro.module.scss";

import Image from "next/image";

export const ProductIntro: FC<ProductIntroProps> = ({ className, product, ...props }) => {
  const { i18n } = useTranslation();
  const { code, title, description, mainImage, schemeImage, boxImage } = product || {};
  const [thumbsSwiper, setThumbsSwiper] = useState<null | SwiperClass>(null);
  const images = [mainImage, schemeImage, boxImage].filter((url) => !!url);
  // const images: ReactImageGalleryItem[] = useMemo(() => {
  //   const images = [mainImage, schemeImage, boxImage].filter((url) => !!url);

  //   if (images?.length) {
  //     return images.map((url) => ({
  //       original: `${DOMAIN}${url}`,
  //       thumbnail: `${DOMAIN}${url}`,
  //       thumbnailHeight: 100,
  //       thumbnailWidth: 100,
  //       thumbnailClass: styles.thumbnail,
  //     }));
  //   }

  //   return [];
  // }, [mainImage, schemeImage, boxImage]);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.head}>
        <h1 className="color-accent">{code}</h1>
        <h2>{title}</h2>
      </div>
      <div
        className={cn(styles.description, "subtitle-md", "custom-scrollbar")}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <PdfButtons name={code + "-" + i18n.language} type="product" className={styles.buttons} />
      {/* <ImageGallery showNav={false} showPlayButton={false} additionalClass={styles.gallery} items={images} /> */}

      <div className={styles.gallery}>
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={cn(styles.swiper, styles.mySwiper2)}
        >
          {images?.map((src, index) => (
            <SwiperSlide key={index} className={styles["swiper-slide"]}>
              <Image style={{ objectFit: "contain" }} width={500} height={500} alt="product" src={`${DOMAIN}${src}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          className={cn(styles.swiper, styles.mySwiper)}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {images?.map((src, index) => (
            <SwiperSlide key={index} className={styles["swiper-slide"]}>
              <Image style={{ objectFit: "contain" }} width={150} height={150} alt="product" src={`${DOMAIN}${src}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductIntro;
