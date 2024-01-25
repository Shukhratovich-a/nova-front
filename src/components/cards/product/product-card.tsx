import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { ProductCardProps } from "./product-card.props";
import styles from "./product-card.module.scss";
import cn from "classnames";
import { IconArrowRight } from "@/assets/icons";
import productImageSrc from "@/assets/images/product.jpg";

const ProductCard: FC<ProductCardProps> = (props) => {
  const { name, imageUrl, link, ...rest } = props;

  return (
    <div className={styles.card} {...rest}>
      <div className={styles.content}>
        <h3 className={styles.name}>Элементы канализации для подключения унитаза</h3>
        <Link href={""} className={cn(styles.link, "color-accent")}>
          Посмотреть <IconArrowRight />
        </Link>
      </div>
      <Image className={styles.image} src={productImageSrc} alt="" width={300} height={300} />
    </div>
  );
};

export default ProductCard;
