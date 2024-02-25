import { FC } from "react";

import { CategoriesProps } from "./categories.props";

import { CategoriesList } from "@/components";

import styles from "./categories.module.scss";

export const CategoriesView: FC<CategoriesProps> = ({ categories, total }) => {
  return (
    <div className="main-margin container">
      <section>
        <CategoriesList categories={categories} total={total} />
      </section>
    </div>
  );
};
