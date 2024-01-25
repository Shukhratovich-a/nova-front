import Image from "next/image";
import { FC } from "react";
import styles from "./article-card.module.scss";
import { ArticleCardProps } from "./article-card.props";

import articleImageSrc1 from "@/assets/images/article-1.jpg";
import articleImageSrc2 from "@/assets/images/article-2.jpg";

const ArticleCard: FC<ArticleCardProps> = (props) => {
  const { productCode, text, imageUrl, link, ...rest } = props;

  return (
    <div>
      <div className={styles.card} {...rest}>
        <div>
          <Image className={styles.image} src={articleImageSrc1} alt="" width={350} height={200} />
        </div>

        <div className={styles.content}>
          {productCode ? <p className="badge fw-extrabold color-accent">{productCode}</p> : ""}
          <h3>Nova Alçıpan Ti̇p Gömme Rezervuar Montaj Vi̇deosu</h3>
        </div>
      </div>
      <div className={styles.card} {...rest}>
        <div>
          <Image className={styles.image} src={articleImageSrc2} alt="" width={350} height={200} />
        </div>

        <div className={styles.content}>
          {/* {productCode ? <p className="badge fw-extrabold color-accent">{4105}</p> : ""} */}
          <h3>Nova Alçıpan Ti̇p Gömme Rezervuar Montaj Vi̇deosu</h3>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
