import cn from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

import { ProductCardProps } from "./product-card.props";

import { DOMAIN } from "@/helpers/api.helper";

import { IconYoutube } from "@/assets/icons";
import styles from "./product-card.module.scss";

export const ProductCard: FC<ProductCardProps> = ({ className, product, card: type = "product", ...props }) => {
  const title = product.title;
  let code = "";
  let image = "";
  let url = "";

  const isProduct = type === "product" && "code" in product && "mainImage" in product;
  const isCertificate = type === "certificate" && "certificate" in product;
  const isVideo = type === "video" && "poster" in product && "code" in product;
  const isCatalog = type === "catalog" && "poster" in product && "catalog" in product;

  if (isProduct) {
    code = product.code;
    image = `${DOMAIN}${product.mainImage}`;
    url = `/product/${product.code}`;
  } else if (isCertificate) {
    image = `${DOMAIN}${product.poster}`;
    url = `${DOMAIN}${product.certificate}`;
  } else if (isVideo) {
    image = product.poster;
    url = `/video/${product.id}`;
    code = product.code;
  } else if (isCatalog) {
    image = `${DOMAIN}${product.poster}`;
    url = `${DOMAIN}${product.catalog}`;
  }

  const wrapperClass = cn(styles.card, {
    [styles.certificate]: isCertificate,
    [styles.catalog]: isCatalog,
    [styles.video]: isVideo,
  });

  const { push } = useRouter();

  const handleNavigation = () => {
    if (isCertificate || isCatalog) window.open(url, "_blank");
    else push(url);
  };

  return (
    <div className={wrapperClass} onClick={() => handleNavigation()} {...props}>
      <div className={cn(styles.image)}>
        <Image src={image} alt="" width={300} height={272} priority quality={50} />
        {type === "video" && <IconYoutube className={styles.play} />}
      </div>

      <div className={cn(styles.content)}>
        {!!code && <p className="subtitle-sm fw-extrabold color-accent">{code}</p>}
        <h3 title={title}>{title}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
