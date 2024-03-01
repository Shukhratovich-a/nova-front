import { Breadcrumbs, ProductInfo, ProductIntro, ProductRelated } from "@/components";
import { FC } from "react";

export const ProductView: FC = () => {
  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="30px" urlList={["products", "item"]} />
      </section>
      <section>
        <ProductIntro />
      </section>
      <section>
        <ProductInfo />
      </section>
      <section>
        <ProductRelated />
      </section>
    </div>
  );
};

export default ProductView;
