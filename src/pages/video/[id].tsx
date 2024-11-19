import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { FC } from "react";

import { IVideo } from "@/types/video.interface";

import { getById, getByInstallationId } from "@/api/video.api";

import { withLayout } from "@/layout/layout";

import { VideoView } from "@/views";

export const VideoPage: FC<VideoPageProps> = ({ video }) => {
  return (
    <>
      <Head>
        <title>{`${video.title}`}</title>
      </Head>

      <VideoView video={video} />
    </>
  );
};

// export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
//   let paths: string[] = [];

//   for (let locale of locales as string[]) {
//     const { data: videos } = await getAll({ limit: 1000000000000, language: locale });

//     paths = paths.concat(videos.map((video) => `/${locale}/video/${video.id}`));
//   }

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

export const getServerSideProps: GetServerSideProps<VideoPageProps> = async ({ params, locale }) => {
  if (!params) return { notFound: true };

  const id = params?.id as string;
  const isInstalationVidoe = id?.includes("i");
  if (!id) return { notFound: true };

  try {
    const { data: video } = await (isInstalationVidoe
      ? getByInstallationId(id?.replace("i", ""), { language: locale })
      : getById(id, { language: locale }));

    if (!video) return { notFound: true };

    return {
      props: {
        video,
        ...(await serverSideTranslations(String(locale))),
      },
      // revalidate: 1,
    };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(VideoPage);

interface VideoPageProps extends Record<string, unknown> {
  video: IVideo;
}
