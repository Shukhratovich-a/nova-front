import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { FC } from "react";

import { getAll as getAllCertificate } from "@/api/certificate.api";
import { getAll as getAllVideos, getCards } from "@/api/video.api";
import { withLayout } from "@/layout/layout";

import { ICertificate } from "@/types/certificate.interface";
import { IVideo, IVideoCard } from "@/types/video.interface";
import { MediaView } from "@/views";

export const MediaPage: FC<MediaPageProps> = ({ video, certificate }) => {
  return (
    <>
      <Head>
        <title>Media</title>
      </Head>

      <MediaView video={video} certificate={certificate} />
    </>
  );
};

export const getStaticProps: GetStaticProps<MediaPageProps> = async ({ locale }) => {
  try {
    const { data: video } = await getAllVideos({ language: locale });
    // const video = await getCards({ language: locale });

    const { data: certificate } = await getAllCertificate({ language: locale });

    return {
      props: {
        video,
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

export default withLayout(MediaPage);

export interface MediaPageProps extends Record<string, unknown> {
  video: IVideoCard[] | IVideo[];
  certificate: ICertificate[];
}
