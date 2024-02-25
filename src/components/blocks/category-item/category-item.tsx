import { FC } from "react";
// import Link from "next/link";
// import { useTranslation } from "next-i18next";
import cn from "classnames";

import { CategoryItemProps } from "./category-item.props";

import { CategoryCard, Button } from "@/components";

import styles from "./category-item.module.scss";

export const CategoryItem: FC<CategoryItemProps> = ({ className, category, ...props }) => {
  const { title, subcategories } = category;
  // const { t } = useTranslation();

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <h2>{title}</h2>

      <ul className={cn(styles.list)}>
        {subcategories &&
          subcategories.length &&
          subcategories.map((subcategory) => (
            <li className={cn(styles.item)} key={subcategory.id}>
              <CategoryCard category={subcategory} href={`/category/${category.alias}/${subcategory.alias}`} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CategoryItem;
