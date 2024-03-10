import { FC } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

import { IProduct } from "@/types/product.interface";

import { getAll, getByCode } from "@/api/product.api";

import { withLayout } from "@/layout/layout";

import { ProductView } from "@/views";

export const ProductPage: FC<ProductPageProps> = ({ product }) => {
  return (
    <>
      <Head>
        <title>{`${product.title}`}</title>
      </Head>

      <ProductView product={product} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let paths: string[] = [];

  for (let locale of locales as string[]) {
    const {
      data: { data: products },
    } = await getAll({ limit: 1000000000000, language: locale });

    paths = paths.concat(products.map((product) => `/${locale}/product/${product.code}`));
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params, locale }) => {
  if (!params) return { notFound: true };

  const code = params.code as string;
  if (!code) return { notFound: true };

  try {
    const { data: product } = await getByCode(code, { language: locale });
    if (!product) return { notFound: true };

    return {
      props: {
        product,
        ...(await serverSideTranslations(String(locale))),
      },
      revalidate: 300,
    };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(ProductPage);

interface ProductPageProps extends Record<string, unknown> {
  product: IProduct;
}
