import cn from "classnames";
import { FC, useState } from "react";
import styles from "./product-info.module.scss";
import { ProductInfoProps } from "./product-info.props";
import Tabs from "@/components/tabs/tabs";

export const ProductInfo: FC<ProductInfoProps> = ({ className, detailCategories, ...props }) => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <h2 className={styles.title}>Информация о продукте</h2>

      <Tabs />
    </div>
  );
};

export default ProductInfo;
