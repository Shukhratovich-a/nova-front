import { withLayout } from "@/layout/layout";
import AboutView from "@/views/About/about.view";
import Head from "next/head";
import { FC } from "react";

const About: FC = () => {
  return (
    <div>
      <Head>
        <title>About</title>
      </Head>
      <AboutView />
    </div>
  );
};

export default withLayout(About);
