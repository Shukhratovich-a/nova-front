import { FC } from "react";

import { SubcategoryProps } from "./subcategory.props";

import { Breadcrumbs, CategoryItem, SubcategoryItem } from "@/components";

import styles from "./category.module.scss";

export const SubcategoryView: FC<SubcategoryProps> = ({ subcategory }) => {
  const { title } = subcategory;

  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="10px" />
      </section>

      <section>
        <SubcategoryItem subcategory={subcategory} />
      </section>
    </div>
  );
};
