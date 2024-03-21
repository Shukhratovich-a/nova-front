import { FC } from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { CategoryProps } from "./category.props";

import { Breadcrumbs, CategoryItem } from "@/components";

import styles from "./category.module.scss";

export const CategoryView: FC<CategoryProps> = ({ className, category, ...props }) => {
  const { t } = useTranslation();

  const urlList = [{ title: t("products"), link: "/category" }];

  return (
    <div className={cn("main-margin", "container", styles.view, className)} {...props}>
      <section>
        <Breadcrumbs mb="10px" urlList={urlList} />
      </section>

      <section>
        <CategoryItem category={category} />
      </section>
    </div>
  );
};
