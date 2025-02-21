import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { FC } from "react";

import { IProduct } from "@/types/product.interface";

import { getByCode, getRelated } from "@/api/product.api";

import { withLayout } from "@/layout/layout";

import { DOMAIN } from "@/helpers/api.helper";
import { ProductView } from "@/views";

export const ProductPage: FC<ProductPageProps> = ({ product, relatedProducts }) => {
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

      {/* <ProductView product={product} relatedProducts={relatedProducts} /> */}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async ({ params, locale }) => {
  if (!params) return { notFound: true };

  const code = params.code as string;
  if (!code) return { notFound: true };

  try {
    const { data: product } = await getByCode(code, { language: locale });
    if (!product) return { notFound: true };

    const {
      data: { data: relatedProducts },
    } = await getRelated(product.id, { language: locale, limit: 10 });
    if (!product) return { notFound: true };

    console.log(product);
    console.log(relatedProducts);

    return {
      props: {
        product,
        relatedProducts,
        ...(await serverSideTranslations(String(locale))),
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(ProductPage);

interface ProductPageProps extends Record<string, unknown> {
  product: IProduct;
  relatedProducts: IProduct[];
}
