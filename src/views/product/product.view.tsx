import { FC } from "react";
import cn from "classnames";

import { ProductProps } from "./product.props";

import { Breadcrumbs, ProductInfo, ProductIntro, ProductRelated } from "@/components";

export const ProductView: FC<ProductProps> = ({ className, product, ...props }) => {
  return (
    <div className={cn("main-margin", "container", className)} {...props}>
      <section>
        <Breadcrumbs mb="30px" urlList={["products", "item"]} />
      </section>

      <section>
        <ProductIntro product={product} />
      </section>

      <section>
        <ProductInfo detailCategories={product.detailCategories} />
      </section>

      <section>{/* <ProductRelated /> */}</section>
    </div>
  );
};

export default ProductView;
