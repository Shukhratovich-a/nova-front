import { FC } from "react";
import cn from "classnames";

import { CategoryItemProps } from "./category-item.props";

import { CategoryCard, EmptyList } from "@/components";

import styles from "./category-item.module.scss";

export const CategoryItem: FC<CategoryItemProps> = ({ className, category, ...props }) => {
  const { title, subcategories } = category;

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <h2>{title}</h2>

      {subcategories && subcategories.length ? (
        <ul className={cn(styles.list)}>
          {subcategories.map((subcategory) => (
            <li className={cn(styles.item)} key={subcategory.id}>
              <CategoryCard category={subcategory} href={`/category/${category.alias}/${subcategory.alias}`} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyList translateKey="subcategories" />
      )}
    </div>
  );
};

export default CategoryItem;
