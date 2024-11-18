import { IVideoCard } from "@/types/video.interface";
import cn from "classnames";
import { FC } from "react";
import { useTranslation } from "next-i18next";
import { SwiperSlide } from "swiper/react";
import ProductCard from "../cards/product/product-card";
import Slider from "../slider/slider";
import styles from "./product-video.module.scss";

type Props = {
  videos: IVideoCard[];
} & JSX.IntrinsicElements["div"];

const ProductVideos: FC<Props> = ({ videos, className = "", ...rest }) => {
  const { t } = useTranslation();

  if (!videos?.length) return "";

  return (
    <div className={cn(styles.wrapper, className)} {...rest}>
      <h2 className={styles.title}>{t("video")}</h2>
      <Slider type="dynamic" quantity={4}>
        {videos?.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard card="video" product={item} />
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
};

export default ProductVideos;
