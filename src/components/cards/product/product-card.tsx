import { IconArrowRight } from "@/assets/icons";
import productImageSrc from "@/assets/images/product.jpg";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import styles from "./product-card.module.scss";
import { ProductCardProps } from "./product-card.props";

const ProductCard: FC<ProductCardProps> = (props) => {
  const { name, imageUrl, link, ...rest } = props;

  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div onClick={() => handleNavigation("link")} className={styles.card}>
      <Image className={styles.image} src={productImageSrc} alt="" width={300} height={300} />
      <div className={styles.content}>
        <h3 className={styles.name} title={name}>
          Элементы канализации для подключения унитаза
        </h3>
        <Link href={"link"} className={cn(styles.link, "color-accent")}>
          Посмотреть <IconArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
