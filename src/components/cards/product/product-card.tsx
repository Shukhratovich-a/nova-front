import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import cn from "classnames";

import { ProductCardProps } from "./product-card.props";

import { DOMAIN } from "@/helpers/api.helper";

import styles from "./product-card.module.scss";

export const ProductCard: FC<ProductCardProps> = ({ className, product, ...props }) => {
  const { title, code, mainImage } = product;

  const { push } = useRouter();

  const handleNavigation = () => {
    push(`/product/${code}`);
  };

  return (
    <div className={cn(styles.card)} onClick={() => handleNavigation()} {...props}>
      <div className={cn(styles.image)}>
        <Image src={`${DOMAIN}${mainImage}`} alt="" width={300} height={272} priority quality={50} />
      </div>

      <div className={cn(styles.content)}>
        <p className="subtitle-sm fw-extrabold color-accent">{code}</p>

        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
