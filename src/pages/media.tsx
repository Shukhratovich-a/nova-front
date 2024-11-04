import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { FC } from "react";

import { getAll as getAllCertificate } from "@/api/certificate.api";
import { getCards } from "@/api/video.api";
import { withLayout } from "@/layout/layout";

import { getAll as getAllCatalogs } from "@/api/catalog.api";
import { ICatalog } from "@/types/catalog.interface";
import { ICertificate } from "@/types/certificate.interface";
import { IVideoCard } from "@/types/video.interface";
import { MediaView } from "@/views";

export const MediaPage: FC<MediaPageProps> = ({ _nextI18Next, ...rest }) => {
  return (
    <>
      <Head>
        <title>Media</title>
      </Head>

      <MediaView {...rest} />
    </>
  );
};

export const getStaticProps: GetStaticProps<MediaPageProps> = async ({ locale }) => {
  try {
    const video = await getCards({ language: locale });

    const { data: certificate } = await getAllCertificate({ language: locale });

    const {
      data: { data: catalogs },
    } = await getAllCatalogs({ language: locale });

    return {
      props: {
        video,
        certificate,
        catalogs,
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

export default withLayout(MediaPage);

export interface MediaPageProps extends Record<string, unknown> {
  video: IVideoCard[];
  certificate: ICertificate[];
  catalogs: ICatalog[];
}
