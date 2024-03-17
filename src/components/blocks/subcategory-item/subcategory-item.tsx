import { FC } from "react";
// import Link from "next/link";
// import { useTranslation } from "next-i18next";
import cn from "classnames";

import { SubcategoryItemProps } from "./subcategory-item.props";

import { ProductCard, Button } from "@/components";

import styles from "./subcategory-item.module.scss";

export const SubcategoryItem: FC<SubcategoryItemProps> = ({ className, subcategory, ...props }) => {
  const { title, products } = subcategory;
  // const { t } = useTranslation();

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <h2>{title}</h2>

      {products && products.length ? (
        <ul className={cn(styles.list)}>
          {products.map((product) => (
            <li className={cn(styles.item)} key={product.id}>
              <ProductCard product={product} card="product" />
            </li>
          ))}
        </ul>
      ) : (
        <span>No products yet</span>
      )}
    </div>
  );
};

export default SubcategoryItem;
