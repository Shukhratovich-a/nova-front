import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { CategoriesListProps } from "./categories-list.props";

import { CategoryCard, Button, EmptyList } from "@/components";

import styles from "./categories-list.module.scss";

export const CategoriesList: FC<CategoriesListProps> = ({ className, categories, total, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <h2>{t("category")}</h2>

      {categories.length ? (
        <ul className={cn(styles.list)}>
          {categories.map((category) => (
            <li className={cn(styles.item)} key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyList translateKey="categories" />
      )}

      {categories.length < total && (
        <div className={cn(styles.button)}>
          <Link href="/category">
            <Button>{t("show-more")}</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
