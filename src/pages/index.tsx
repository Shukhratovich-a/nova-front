import { FC } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";

import { IBanner } from "@/types/banner.interface";

import { withLayout } from "@/layout/layout";

import { HomeView } from "@/views";

const HomePage: FC<HomePageProps> = ({ banners }) => {
  return (
    <>
      <Head>
        <title>Nova</title>
      </Head>

      <HomeView banner={banners} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ locale }) => {
  const {
    data: { data: banners },
  } = await axios.get(`http://localhost:3001/banner/get-all?language=${locale}`).catch((error) => error);

  return {
    props: {
      banners,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(HomePage);

export interface HomePageProps extends Record<string, unknown> {
  banners: IBanner[];
}
