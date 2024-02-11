import { withLayout } from "@/layout/Layout";
import { NewsItemView } from "@/views";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";

const NewsItemPage: FC = () => {
  const router = useRouter();
  // router.query.id
  return (
    <>
      <Head>
        <title>News</title>
      </Head>
      <NewsItemView />
    </>
  );
};

export default withLayout(NewsItemPage);
