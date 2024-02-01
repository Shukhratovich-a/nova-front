import { ArticleCard, Intro, MapCard, NewsCard, ProductBlock, ProductCard } from "@/components";

const emptyArray = Array.from({ length: 10 });

export const HomeView = () => {
  return (
    <>
      <section>
        <Intro data={[]} />
      </section>

      <section>
        <ProductBlock />
      </section>

      <h1>about</h1>
      <h2>h2</h2>
      <button className="button button-blue">button</button>
      <button className="button button-yellow">button</button>
      <button className="button button-border">button</button>

      <ProductCard name="" imageUrl="" link="" />

      <NewsCard title="" imageUrl="" text="" link="" date="" />

      <MapCard
        title={""}
        address={""}
        map={{
          latitude: "",
          longitude: "",
        }}
        phone={""}
        mail={""}
        orient={"column"}
      />

      <MapCard
        title={""}
        address={""}
        map={{
          latitude: "",
          longitude: "",
        }}
        phone={""}
        mail={""}
        orient={"row"}
      />

      <ArticleCard productCode={5190} text={""} imageUrl={""} link={""} />
      <section>products</section>
      <section>video</section>
    </>
  );
};

export default HomeView;
