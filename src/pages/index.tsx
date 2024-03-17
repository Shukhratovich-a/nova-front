import { FC } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IBanner } from "@/types/banner.interface";
import { ICategory } from "@/types/category.interface";

import { getAll as getAllBanners } from "@/api/banner.api";
import { getAll as getAllCategories } from "@/api/category.api";

import { withLayout } from "@/layout/layout";

import { HomeView } from "@/views";

const HomePage: FC<HomePageProps> = ({ banners, categories }) => {
  return (
    <>
      <Head>
        <title>NOVA Plastik</title>
      </Head>

      <HomeView banners={banners} categories={categories} />
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

    return {
      props: {
        banners,
        categories,
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

  categories: ICategory[];
}
