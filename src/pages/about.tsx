import MapCard from "@/components/blocks/map/map-card";
import ArticleCard from "@/components/cards/article/article-card";
import NewsCard from "@/components/cards/news/news-card";
import ProductCard from "@/components/cards/product/product-card";
import Icon from "@/components/icon/icon-list";
import { FC } from "react";

const About: FC = () => {
  return (
    <div>
      <h1>about</h1>
      <h2>h2</h2>
      <button className="button button-blue">button</button>
      <button className="button button-yellow">button</button>
      <button className="button button-border">button</button>
      <Icon name="youtube" className="color-yellow" />
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
    </div>
  );
};

export default About;
