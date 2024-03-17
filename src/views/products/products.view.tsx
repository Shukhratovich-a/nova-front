import { FC } from "react";

import { ProductsProps } from "./products.props";

import { Breadcrumbs, SubcategoryItem } from "@/components";

import styles from "./category.module.scss";

export const ProductsView: FC<ProductsProps> = ({ products }) => {
  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs urlList={[]} mb="10px" />
      </section>

      <section></section>
    </div>
  );
};
