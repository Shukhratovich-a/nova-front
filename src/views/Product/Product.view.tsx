import { Breadcrumbs, ProductInfo, ProductIntro } from "@/components";
import { FC } from "react";

export const ProductView: FC = () => {
  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="30px" />
      </section>
      <section>
        <ProductIntro />
      </section>
      <section>
        <ProductInfo />
      </section>
    </div>
  );
};

export default ProductView;
