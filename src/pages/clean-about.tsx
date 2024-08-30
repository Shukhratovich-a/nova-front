import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { FC } from "react";

import { IAbout } from "@/types/about.interface";

import { getAll } from "@/api/about.api";

import { AboutView } from "@/views";

const AboutPage: FC<AboutPageProps> = ({ abouts }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title>{`${t("menu.about")} - Nova Plastik`}</title>
      </Head>

      <AboutView abouts={abouts} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<AboutPageProps> = async ({ locale }) => {
  try {
    const {
      data: { data: abouts },
    } = await getAll({ language: locale });

    return {
      props: {
        abouts,
        ...(await serverSideTranslations(String(locale))),
      },
      revalidate: 1,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default AboutPage;

export interface AboutPageProps extends Record<string, unknown> {
  abouts: IAbout[];
}
