import { ArticleCard, Slider } from "@/components";
import cn from "classnames";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./product-related.module.scss";
import { ProductRelatedProps } from "./product-related.props";

export const ProductRelated: FC<ProductRelatedProps> = ({ className }) => {
  return (
    <>
      <div className={cn(styles.wrapper, className)}>
        <h2 className={styles.title}>Похожие продукты</h2>
        <Slider type="dynamic" quantity={5}>
          <SwiperSlide>
            <ArticleCard productCode={2020} text={""} imageUrl={""} link={""} />
          </SwiperSlide>
          <SwiperSlide>
            <ArticleCard productCode={2020} text={""} imageUrl={""} link={""} />
          </SwiperSlide>
          <SwiperSlide>
            <ArticleCard productCode={2020} text={""} imageUrl={""} link={""} />
          </SwiperSlide>
          <SwiperSlide>
            <ArticleCard productCode={2020} text={""} imageUrl={""} link={""} />
          </SwiperSlide>
          <SwiperSlide>
            <ArticleCard productCode={2020} text={""} imageUrl={""} link={""} />
          </SwiperSlide>
          <SwiperSlide>
            <ArticleCard productCode={2020} text={""} imageUrl={""} link={""} />
          </SwiperSlide>
          <SwiperSlide>
            <ArticleCard productCode={2020} text={""} imageUrl={""} link={""} />
          </SwiperSlide>
          <SwiperSlide>
            <ArticleCard productCode={2020} text={""} imageUrl={""} link={""} />
          </SwiperSlide>
          <SwiperSlide>
            <ArticleCard productCode={2020} text={""} imageUrl={""} link={""} />
          </SwiperSlide>
          <SwiperSlide>
            <ArticleCard productCode={2020} text={""} imageUrl={""} link={""} />
          </SwiperSlide>
        </Slider>
      </div>
    </>
  );
};

export default ProductRelated;
