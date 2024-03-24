import { FC } from "react";
import { useTranslation } from "next-i18next";
import { SwiperSlide } from "swiper/react";
import cn from "classnames";

import { ProductRelatedProps } from "./product-related.props";

import { EmptyList, ProductCard, Slider } from "@/components";

import styles from "./product-related.module.scss";

export const ProductRelated: FC<ProductRelatedProps> = ({ className, relatedProducts }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={cn(styles.wrapper, className)}>
        <h2 className={styles.title}>{t("products-related")}</h2>

        {!!relatedProducts.length ? (
          <Slider type="dynamic" quantity={5}>
            {relatedProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} card="product" />
              </SwiperSlide>
            ))}
          </Slider>
        ) : (
          <EmptyList key={"products-related"} />
        )}
      </div>
    </>
  );
};

export default ProductRelated;
