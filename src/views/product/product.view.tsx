import { FC } from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { ProductProps } from "./product.props";

import { Breadcrumbs, ProductInfo, ProductIntro, ProductRelated } from "@/components";

export const ProductView: FC<ProductProps> = ({ className, product, relatedProducts, ...props }) => {
  const { t } = useTranslation();

  const { subcategory } = product;

  const urlList = [
    { title: t("products"), link: "/category" },
    { title: subcategory!.category!.title, link: `/category/${subcategory?.category?.alias}` },
    { title: subcategory!.title, link: `/category/${subcategory?.category?.alias}/${subcategory?.alias}` },
  ];

  return (
    <div className={cn("main-margin", "container", className)} {...props}>
      <section>
        <Breadcrumbs mb="30px" urlList={urlList} />
      </section>

      <section>
        <ProductIntro product={product} />
      </section>

      {!!product.detailCategories.length && (
        <section>
          <ProductInfo detailCategories={product.detailCategories} />
        </section>
      )}

      <section>
        <ProductRelated relatedProducts={relatedProducts} />
      </section>
    </div>
  );
};

export default ProductView;
