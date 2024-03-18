import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { ProductsListProps } from "./products-list.props";

import { ProductCard, Button } from "@/components";

import styles from "./products-list.module.scss";

export const ProductsList: FC<ProductsListProps> = ({ className, products, total, ...props }) => {
  const { replace, query } = useRouter();
  const [displayCount, setDisplayCount] = useState<number>(query.limit ? Number(query.limit) : 10);
  const { t } = useTranslation();

  const loadMore = () => {
    if (displayCount >= total) return;

    setDisplayCount(displayCount + 5);
  };

  useEffect(() => {
    if (displayCount) {
      replace({ query: { ...query, limit: displayCount } }, "", { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayCount]);

  useEffect(() => {
    if (query && query.limit) {
      setDisplayCount(Number(query.limit));
    } else {
      setDisplayCount(10);
    }
  }, [query]);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      {products && products.length ? (
        <ul className={cn(styles.list)}>
          {products.map((product) => (
            <li className={cn(styles.item)} key={product.id}>
              <ProductCard product={product} card="product" />
            </li>
          ))}
        </ul>
      ) : (
        <span>No products yet</span>
      )}
      {displayCount < total && (
        <Button className={styles.button} onClick={loadMore}>
          Показать больше
        </Button>
      )}
    </div>
  );
};

export default ProductsList;
