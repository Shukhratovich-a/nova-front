import { getByProductId } from "@/api/video.api";
import { Breadcrumbs, ProductInfo, ProductIntro, ProductRelated } from "@/components";
import ProductVideos from "@/components/product-videos/product-videos";
import { IVideoCard } from "@/types/video.interface";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { FC, useEffect, useState } from "react";
import { ProductProps } from "./product.props";

export const ProductView: FC<ProductProps> = ({ className, product, relatedProducts, ...props }) => {
  const { t } = useTranslation();
  const [productVideoData, setProductVideoData] = useState<IVideoCard[]>([]);

  useEffect(() => {
    getByProductId(product?.id).then((data) => setProductVideoData(data));
  }, [product?.id]);

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

      {/* <section>
        <ProductIntro product={product} />
      </section> */}

      {!!product.detailCategories.length && (
        <section>
          <ProductInfo detailCategories={product.detailCategories} />
        </section>
      )}

      {!!productVideoData?.length && (
        <section>
          <ProductVideos videos={productVideoData} />
        </section>
      )}
      <section>
        <ProductRelated relatedProducts={relatedProducts} />
      </section>
    </div>
  );
};

export default ProductView;
