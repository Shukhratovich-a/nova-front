import { withLayout } from "@/layout/Layout";
import { IBanner } from "@/types/banner.interface";

import { MediaView } from "@/views";
import axios from "axios";
import { GetStaticProps } from "next";
import Head from "next/head";
import { FC } from "react";

const Home: FC<{ banner: IBanner[] }> = (props) => {
  return (
    <>
      <Head>
        <title>Nova</title>
      </Head>
      <MediaView banner={props.banner} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get("http://localhost:3001/banner/get-all?language=ru");

  return { props: { banner: res.data } };
};

export default withLayout(Home);
