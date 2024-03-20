import { FC, useEffect } from "react";
import { useTranslation } from "next-i18next";

import { SubcategoryProps } from "./subcategory.props";

import { Breadcrumbs, SubcategoryItem } from "@/components";

import styles from "./category.module.scss";

export const SubcategoryView: FC<SubcategoryProps> = ({ subcategory }) => {
  const { category } = subcategory;

  const { t } = useTranslation();

  const urlList = [
    { title: t("products"), link: "/category" },
    { title: category!.title, link: `/category/${category!.alias}` },
  ];

  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs urlList={urlList} mb="10px" />
      </section>

      <section>
        <SubcategoryItem subcategory={subcategory} />
      </section>
    </div>
  );
};
