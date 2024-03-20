import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { FC } from "react";

import { IVideoCard } from "@/types/video.interface";

import { getCards } from "@/api/video.api";

import { withLayout } from "@/layout/layout";
import VideosView from "@/views/videos/videos.view";

export const VideoPage: FC<VideoPageProps> = ({ videos }) => {

  return (
    <>
      <Head>
        <title>Video</title>
      </Head>

      <VideosView videos={videos} />
    </>
  );
};

export const getStaticProps: GetStaticProps<VideoPageProps> = async ({ locale }) => {
  try {
    const videos = await getCards({ language: locale });

    return {
      props: {
        videos,
        ...(await serverSideTranslations(String(locale))),
      },
      revalidate: 10,
    };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(VideoPage);

interface VideoPageProps extends Record<string, unknown> {
  videos: IVideoCard[];
}
