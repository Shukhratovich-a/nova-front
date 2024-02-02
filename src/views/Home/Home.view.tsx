import { ArticleSlide, Intro, ProductBlock } from "@/components";

const emptyArray = Array.from({ length: 10 });

export const HomeView = () => {
  return (
    <>
      <section>
        <Intro data={[]} />
      </section>

      <section className="container">
        <ProductBlock />
      </section>

      <section className="container">
        <ArticleSlide />
      </section>
    </>
  );
};

export default HomeView;
