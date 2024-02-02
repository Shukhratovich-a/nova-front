import Image from "next/image";
import { FC } from "react";
import styles from "./article-card.module.scss";
import { ArticleCardProps } from "./article-card.props";

import articleImageSrc1 from "@/assets/images/article-1.jpg";
import { useRouter } from "next/router";

export const ArticleCard: FC<ArticleCardProps> = (props) => {
  const { productCode, text, imageUrl, link, children, ...rest } = props;

  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div onClick={() => handleNavigation("link")} className={styles.card} {...rest}>
      <div className={styles.image}>
        <Image src={articleImageSrc1} alt="" width={350} height={200} />
      </div>

      <div className={styles.content}>
        {productCode ? <p className="subtitle-md fw-extrabold color-accent">{productCode}</p> : ""}
        <h3>Nova Alçıpan Ti̇p Gömme Rezervuar Montaj Vi̇deosu</h3>
      </div>
    </div>
  );
};

export default ArticleCard;
