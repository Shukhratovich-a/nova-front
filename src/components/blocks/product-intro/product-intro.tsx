import cn from "classnames";
import { FC } from "react";
import { ProductIntroProps } from "./product-intro.props";

import PdfButtons from "@/components/ui/pdf-buttons/pdf-buttons";
import { DOMAIN } from "@/helpers/api.helper";
import ImageGallery from "react-image-gallery";
import styles from "./product-intro.module.scss";

export const ProductIntro: FC<ProductIntroProps> = ({ className, product, ...props }) => {
  const { code, title, description, mainImage, schemeImage, boxImage } = product;

  const images = [mainImage, schemeImage, boxImage].filter((url) => !!url);

  const items = images.map((url) => ({ original: `${DOMAIN}${url}`, thumbnail: `${DOMAIN}${url}` }));

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.head}>
        <h1 className="color-accent">{code}</h1>
        <h2>{title}</h2>
      </div>
      <div
        className={cn(styles.description, "subtitle-md", "custom-scrollbar")}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <PdfButtons name={code} type="product" className={styles.buttons} />
      <ImageGallery showNav={false} showPlayButton={false} additionalClass={styles.gallery} items={items} />
    </div>
  );
};

export default ProductIntro;
