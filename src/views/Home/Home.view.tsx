import { ArticleSlide, HomeProduct, HomeIntro } from "@/components";

export const HomeView = () => {
  return (
    <>
      <section>
        <HomeIntro data={[]} />
      </section>

      <section className="container">
        <HomeProduct />
      </section>

      <section className="container">
        <ArticleSlide />
      </section>
    </>
  );
};

export default HomeView;
