import { withLayout } from "@/layout/layout";
import { ProductView } from "@/views";
import Head from "next/head";
import { FC } from "react";

export const ProductPage: FC = () => {
  return (
    <>
      <Head>
        <title>product</title>
      </Head>
      <ProductView />
    </>
  );
};

export default withLayout(ProductPage);
