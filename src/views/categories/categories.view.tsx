import { FC } from "react";
import cn from "classnames";

import { CategoriesProps } from "./categories.props";

import { CategoriesList } from "@/components";

import styles from "./categories.module.scss";

export const CategoriesView: FC<CategoriesProps> = ({ className, categories, total, ...props }) => {
  return (
    <div className={cn("main-margin", "container", styles.view, className)} {...props}>
      <section>
        <CategoriesList categories={categories} total={total} />
      </section>
    </div>
  );
};
