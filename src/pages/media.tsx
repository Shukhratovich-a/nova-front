import { FC } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withLayout } from "@/layout/layout";

import { MediaView } from "@/views";

export const MediaPage: FC<MediaPageProps> = () => {
  return (
    <>
      <Head>
        <title>Media</title>
      </Head>

      <MediaView />
    </>
  );
};

export const getStaticProps: GetStaticProps<MediaPageProps> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale))),
    },
    revalidate: 10,
  };
};

export default withLayout(MediaPage);

export interface MediaPageProps extends Record<string, unknown> {}
