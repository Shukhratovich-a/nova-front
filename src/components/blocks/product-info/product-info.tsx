import cn from "classnames";
import { FC } from "react";
import { ProductInfoProps } from "./product-info.props";
import styles from "./product-info.module.scss";

export const ProductInfo: FC<ProductInfoProps> = ({ className }) => {
  return (
    <>
      <div className={cn(styles.wrapper, className)}>
        <h2 className={styles.title}>Информация о продукте</h2>
        <div className={styles.content}>
          <div className={styles.tabs}></div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
