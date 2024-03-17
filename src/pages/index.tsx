import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { FC } from "react";

import { IBanner } from "@/types/banner.interface";
import { ICategory } from "@/types/category.interface";

import { getAll as getAllBanners } from "@/api/banner.api";
import { getAll as getAllCategories } from "@/api/category.api";
import { getAll as getAllCertificate } from "@/api/certificate.api";

import { withLayout } from "@/layout/layout";

import { ICertificate } from "@/types/certificate.interface";
import { HomeView } from "@/views";

const HomePage: FC<HomePageProps> = ({ banners, categories, certificate }) => {
  return (
    <>
      <Head>
        <title>Nova</title>
      </Head>

      <HomeView banners={banners} categories={categories} certificate={certificate} />
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ locale }) => {
  try {
    const {
      data: { data: banners },
    } = await getAllBanners({ language: locale });

    const {
      data: { data: categories },
    } = await getAllCategories({ language: locale, limit: 10 });

    const { data: certificate } = await getAllCertificate({ language: locale });

    return {
      props: {
        banners,
        categories,
        certificate,
        ...(await serverSideTranslations(String(locale))),
      },
      revalidate: 10,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default withLayout(HomePage);

export interface HomePageProps extends Record<string, unknown> {
  banners: IBanner[];
  certificate: ICertificate[];
  categories: ICategory[];
}
