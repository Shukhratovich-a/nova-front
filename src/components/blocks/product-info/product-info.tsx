import { FC } from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { ProductInfoProps } from "./product-info.props";

import { Tabs } from "@/components";

import styles from "./product-info.module.scss";

export const ProductInfo: FC<ProductInfoProps> = ({ className, detailCategories, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <h2 className={styles.title}>{t("product-info")}</h2>

      <Tabs tabs={detailCategories} />
    </div>
  );
};

export default ProductInfo;
