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

  const isProduct = type === "product" && "code" in product;
  const isCertificate = type === "certificate" && "certificate" in product;
  const isVideo = type === "video" && "video" in product;
  const isCatalog = type === "catalog";

  const getYoutubePoster = (url: string) => {
    // Проверяем, является ли URL корректным URL YouTube видео
    const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeUrlRegex);
    const videoId = match && match[4];

    return `https://img.youtube.com/vi_webp/${videoId}/hqdefault.webp`;
  };

  if (isProduct) {
    code = product.code;
    image = `${DOMAIN}${product.mainImage}`;
    url = `/product/${product.code}`;
  } else if (isCertificate) {
    image = `${DOMAIN}${product.poster}`;
    url = `${DOMAIN}${product.certificate}`;
  } else if (isVideo) {
    image = getYoutubePoster(product.video);
    url = `/video/${product.id}`;
  }

  const wrapperClass = cn(styles.card, {
    [styles.certificate]: isCertificate,
    [styles.catalog]: isCatalog,
    [styles.video]: isVideo,
  });

  const { push } = useRouter();

  const handleNavigation = () => {
    if (isCertificate) window.open(url, "_blank");
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
