import { FC } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IBanner } from "@/types/banner.interface";

import { getAll } from "@/api/banner.api";

import { withLayout } from "@/layout/layout";

import { HomeView } from "@/views";

const HomePage: FC<HomePageProps> = ({ banners }) => {
  return (
    <>
      <Head>
        <title>Nova</title>
      </Head>

      <HomeView banners={banners} />
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ locale }) => {
  try {
    const {
      data: { data: banners },
    } = await getAll({ language: locale });

    return {
      props: {
        banners,
        ...(await serverSideTranslations(String(locale))),
      },
    };
  } catch {
    return {
      props: {
        banners: [],
        ...(await serverSideTranslations(String(locale))),
      },
    };
  }
};

export default withLayout(HomePage);

export interface HomePageProps extends Record<string, unknown> {
  banners: IBanner[];
}
