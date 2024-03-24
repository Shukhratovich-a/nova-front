import { ArticleSlide, EmptyList, ProductCard, Slider } from "@/components";
import cn from "classnames";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./product-related.module.scss";
import { ProductRelatedProps } from "./product-related.props";

export const ProductRelated: FC<ProductRelatedProps> = ({ className, relatedProducts }) => {
  return (
    <>
      <div className={cn(styles.wrapper, className)}>
        <h2 className={styles.title}>Похожие продукты</h2>

        {!!relatedProducts.length ? (
          <Slider type="dynamic" quantity={5}>
            {relatedProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} card="product" />
              </SwiperSlide>
            ))}
          </Slider>
        ) : (
          <EmptyList />
        )}
      </div>
    </>
  );
};

export default ProductRelated;
