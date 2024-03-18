import { FC } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { IProduct } from "@/types/product.interface";

import { search } from "@/api/product.api";

import { withLayout } from "@/layout/layout";

import { ProductsView } from "@/views";

export const ProductPage: FC<ProductPageProps> = ({ products, total }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t("products")} - Nova Plastik`}</title>
      </Head>

      <ProductsView products={products} total={total} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async ({ locale, query: { q, limit } }) => {
  const {
    data: { data: products, total },
  } = await search(q as string, { language: locale, limit: limit ? Number(limit) : 10 });

  return {
    props: {
      products,
      total,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(ProductPage);

interface ProductPageProps extends Record<string, unknown> {
  products: IProduct[];
  total: number;
}
