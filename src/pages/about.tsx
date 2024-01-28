import MapCard from "@/components/blocks/map/map-block";
import ArticleCard from "@/components/cards/article/article-card";
import NewsCard from "@/components/cards/news/news-card";
import ProductCard from "@/components/cards/product/product-card";
import Slider from "@/components/slider/slider";
import Image from "next/image";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";

const emptyArray = Array.from({ length: 10 });

const About: FC = () => {
  return (
    <div>
      <Slider type="full-screen">
        {emptyArray.map((_, index) => (
          <SwiperSlide key={index}>
            <Image
              className="swiper-slide-image"
              width={1200}
              height={800}
              alt=""
              src="https://picsum.photos/1200/900"
            />
          </SwiperSlide>
        ))}
      </Slider>
      
      <Slider type="dynamic" quantity={4}>
        {emptyArray.map((_, index) => (
          <SwiperSlide key={index}>
            <NewsCard title="" imageUrl="" text="" link="" date="" />
          </SwiperSlide>
        ))}
      </Slider>

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
    </div>
  );
};

export default About;
