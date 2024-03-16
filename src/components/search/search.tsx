import { ChangeEvent, FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { IProduct } from "@/types/product.interface";
import { SearchProps } from "./search.props";

import { search } from "@/api/product.api";
import { DOMAIN } from "@/helpers/api.helper";

import { Modal, Loader } from "@/components";

import { IconSearch } from "@/assets/icons";

import styles from "./search.module.scss";

export const Search: FC<SearchProps> = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { i18n } = useTranslation();

  const handleSearch = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!target.value) return setProducts([]);
      setLoading(true);

      const {
        data: { data: products },
      } = await search(target.value, { language: i18n.language, page: 1, limit: 10 });

      setLoading(false);
      setProducts(products);
    } catch {
      setLoading(false);
      setProducts([]);
    }
  };

  return (
    <div>
      <Modal trigger={<IconSearch />}>
        <div className={styles.wrapper}>
          <div className={styles.input}>
            <label htmlFor="header-search">
              <IconSearch />
            </label>

            <input onChange={handleSearch} placeholder="Search" type="search" name="header-search" id="header-search" />
          </div>

          <div className={styles.body}>
            <div className={cn(styles.list, "custom-scrollbar")}>
              {loading ? (
                <div className={cn(styles.loader)}>
                  <Loader />
                </div>
              ) : !!products.length ? (
                products.map(({ id, code, title, mainImage }) => {
                  return (
                    <Link className={styles.item} href={`/product/${code}`} key={id}>
                      <Image src={`${DOMAIN}${mainImage}`} alt="" width={60} height={60} quality={20} />

                      <div className={cn(styles.content)}>
                        <p className={styles.code}>{code}</p>

                        <p className={styles.title} title={title}>
                          {title}
                        </p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <Link href="/category" className={styles.item}>
                  <p className="text-lg">All Products</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Search;
