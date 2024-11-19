import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { FC } from "react";

import { getInstallationCards } from "@/api/video.api";
import { withLayout } from "@/layout/layout";

import { IInstallationVideoCard, IVideoCard } from "@/types/video.interface";

import { InstallationView } from "@/views";

export const InstallationPage: FC<InstallationPageProps> = ({ _nextI18Next, ...rest }) => {
  return (
    <>
      <Head>
        <title>Installation</title>
      </Head>

      <InstallationView {...rest} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<InstallationPageProps> = async ({ locale }) => {
  try {
    const video = await getInstallationCards({ language: locale });

    return {
      props: {
        video,
        ...(await serverSideTranslations(String(locale))),
      },
      // revalidate: 1,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default withLayout(InstallationPage);

export interface InstallationPageProps extends Record<string, unknown> {
  video: IInstallationVideoCard[];
}
