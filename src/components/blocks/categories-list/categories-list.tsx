import { FC, useEffect, useReducer } from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { CategoriesListProps } from "./categories-list.props";
import { ICategory } from "@/types/category.interface";

import { ILoadMoreReducer, loadMoreReducer } from "@/reducers/load-more.reducer";

import { CategoryCard, Button, EmptyList } from "@/components";

import styles from "./categories-list.module.scss";

export const CategoriesList: FC<CategoriesListProps> = ({ className, categories, total, ...props }) => {
  const [{ limitedItems: limitedCategories, limit }, dispatchSort] = useReducer<ILoadMoreReducer<ICategory>>(
    loadMoreReducer,
    {
      allItems: categories,
      limitedItems: categories.slice(0, 10),
      limit: 10,
    }
  );

  const { t } = useTranslation();

  const loadMore = () => {
    dispatchSort({ type: "load" });
  };

  useEffect(() => {
    dispatchSort({ type: "reset", initialState: categories });
  }, [categories]);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <h2>{t("category")}</h2>
      {limitedCategories.length ? (
        <ul className={cn(styles.list)}>
          {limitedCategories.map((category) => (
            <li className={cn(styles.item)} key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyList translateKey="categories" />
      )}
      {limit < total && (
        <div className={cn(styles.button)}>
          <Button onClick={loadMore}>{t("show-more")}</Button>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
