import { withLayout } from "@/layout/Layout";
import { HomeView } from "@/views";

const Home = () => {
  return <HomeView />;
};

// getStaticPaths
// getStaticProps
// getServerSideProps

export default withLayout(Home);
