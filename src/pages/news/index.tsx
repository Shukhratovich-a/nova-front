import { withLayout } from "@/layout/Layout";
import { NewsView } from "@/views";
import Head from "next/head";
import { FC } from "react";

const NewsPage: FC = () => {
  return (
    <>
      <Head>
        <title>News</title>
      </Head>
      <NewsView />
    </>
  );
};

export default withLayout(NewsPage);
