import Image from "next/image";
import { FC } from "react";
import styles from "./article-card.module.scss";
import { ArticleCardProps } from "./article-card.props";

import articleImageSrc1 from "@/assets/images/article-1.jpg";
import articleImageSrc2 from "@/assets/images/article-2.jpg";
import { useRouter } from "next/router";

const ArticleCard: FC<ArticleCardProps> = (props) => {
  const { productCode, text, imageUrl, link, children, ...rest } = props;

  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      <div onClick={() => handleNavigation("link")} className={styles.card} {...rest}>
        <div className={styles.image}>
          <Image src={articleImageSrc1} alt="" width={350} height={200} />
        </div>

        <div className={styles.content}>
          {productCode ? <p className="badge-text fw-extrabold color-accent">{productCode}</p> : ""}
          <h3>Nova Alçıpan Ti̇p Gömme Rezervuar Montaj Vi̇deosu</h3>
        </div>
      </div>
      <div onClick={() => handleNavigation("link")} className={styles.card} {...rest}>
        <div className={styles.image}>
          <Image src={articleImageSrc2} alt="" width={350} height={200} />
        </div>

        <div className={styles.content}>
          {/* {productCode ? <p className="badge-text fw-extrabold color-accent">{productCode}</p> : ""} */}
          <h3>Nova Alçıpan Ti̇p Gömme Rezervuar Montaj Vi̇deosu</h3>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
