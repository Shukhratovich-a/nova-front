import { FC } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";

import { IProduct } from "@/types/product.interface";

import { DOMAIN } from "@/helpers/api.helper";

import { getAll, getByCode } from "@/api/product.api";

import { withLayout } from "@/layout/layout";

import { ProductView } from "@/views";

export const ProductPage: FC<ProductPageProps> = ({ product }) => {
  const { title, description, mainImage } = product;

  const { t, i18n } = useTranslation();

  return (
    <>
      <Head>
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${t("product")} - ${title}`} />
        <meta property="og:locale" content={i18n.language} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${DOMAIN}${mainImage}`} />
        <meta property="og:image:secure_ur" content={`${DOMAIN}${mainImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <title>{`${t("product")} - ${title}`}</title>
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
      revalidate: 1,
    };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(ProductPage);

interface ProductPageProps extends Record<string, unknown> {
  product: IProduct;
}
