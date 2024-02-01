import { withLayout } from "@/layout/Layout";
import { HomeView } from "@/views";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Nova</title>
      </Head>
      <HomeView />
    </>
  );
};

// getStaticPaths
// getStaticProps
// getServerSideProps

export default withLayout(Home);
