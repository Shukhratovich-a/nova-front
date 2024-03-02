import { FC } from "react";

import { CategoryProps } from "./category.props";

import { Breadcrumbs, CategoryItem } from "@/components";

import styles from "./category.module.scss";

export const CategoryView: FC<CategoryProps> = ({ category }) => {
  const { title } = category;

  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="10px" urlList={['category', title]}/>
      </section>

      <section>
        <CategoryItem category={category} />
      </section>
    </div>
  );
};
