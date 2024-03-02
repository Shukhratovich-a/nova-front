import { FC } from "react";
import cn from "classnames";

import { ProductInfoProps } from "./product-info.props";

import { Tabs } from "@/components";

import styles from "./product-info.module.scss";

export const ProductInfo: FC<ProductInfoProps> = ({ className, detailCategories, ...props }) => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <h2 className={styles.title}>Информация о продукте</h2>

      <Tabs tabs={detailCategories} />
    </div>
  );
};

export default ProductInfo;
