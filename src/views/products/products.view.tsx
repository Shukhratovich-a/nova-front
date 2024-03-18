import { FC } from "react";
import cn from "classnames";

import { ProductsProps } from "./products.props";

import { Breadcrumbs, ProductsList } from "@/components";

import styles from "./category.module.scss";

export const ProductsView: FC<ProductsProps> = ({ className, products, total, ...props }) => {
  return (
    <div className={cn("main-margin", "container", className)} {...props}>
      <section>
        <Breadcrumbs urlList={[]} mb="10px" />
      </section>

      <section>
        <ProductsList products={products} total={total} />
      </section>
    </div>
  );
};
