import { FC } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { withLayout } from "@/layout/layout";

import { ProductsView } from "@/views";

export const ProductPage: FC<ProductPageProps> = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t("products")} - Nova Plastik`}</title>
      </Head>

      <ProductsView products={[]} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(ProductPage);

interface ProductPageProps extends Record<string, unknown> {}
