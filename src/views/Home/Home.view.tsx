import Intro from "@/components/blocks/Intro/intro";
import MapCard from "@/components/blocks/map/map-block";
import ArticleCard from "@/components/cards/article/article-card";
import NewsCard from "@/components/cards/news/news-card";
import ProductCard from "@/components/cards/product/product-card";

const emptyArray = Array.from({ length: 10 });

export const HomeView = () => {
  return (
    <>
      <section>
        <Intro title={""} subtitle={""} caption="" />

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
      </section>
      <section>products</section>
      <section>video</section>
    </>
  );
};
