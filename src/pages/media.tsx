import { withLayout } from "@/layout/Layout";
import { MediaView } from "@/views";
import Head from "next/head";
import { FC } from "react";

export const MediaPage: FC = () => {
  return (
    <>
      <Head>
        <title>Media</title>
      </Head>
      <MediaView />
    </>
  );
};

export default withLayout(MediaPage);
