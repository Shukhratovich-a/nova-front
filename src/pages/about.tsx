import { FC } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withLayout } from "@/layout/layout";

import { AboutView } from "@/views";

const AboutPage: FC<AboutPageProps> = () => {
  return (
    <div>
      <Head>
        <title>About</title>
      </Head>

      <AboutView />
    </div>
  );
};

export const getStaticProps: GetStaticProps<AboutPageProps> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale))),
    },
    revalidate: 10,
  };
};

export default withLayout(AboutPage);

export interface AboutPageProps extends Record<string, unknown> {}
