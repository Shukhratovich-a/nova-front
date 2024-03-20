import { FC } from "react";
import { useTranslation } from "next-i18next";

import { CategoryProps } from "./category.props";

import { Breadcrumbs, CategoryItem } from "@/components";

import styles from "./category.module.scss";

export const CategoryView: FC<CategoryProps> = ({ category }) => {
  const { t } = useTranslation();

  const urlList = [{ title: t("products"), link: "/category" }];

  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="10px" urlList={urlList} />
      </section>

      <section>
        <CategoryItem category={category} />
      </section>
    </div>
  );
};
