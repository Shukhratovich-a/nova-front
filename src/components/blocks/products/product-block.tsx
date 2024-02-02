import { Button } from "@/components/button/button";
import ProductCard from "@/components/cards/product/product-card";
import cn from "classnames";
import { FC } from "react";
import styles from "./product-block.module.scss";
import { ProductBlockProps } from "./products-block.props";

export const ProductBlock: FC<ProductBlockProps> = ({ children, className }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <h2>Продукты</h2>
      <ul className={styles.list}>
        {children}
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
        <li className={styles.item}>
          <ProductCard name={""} imageUrl={""} link={""} />
        </li>
      </ul>
      <div className={styles.button}>
        <Button>Показать больше</Button>
      </div>
    </div>
  );
};

export default ProductBlock;
