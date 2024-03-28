import cn from "classnames";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FC, useState } from "react";

import { IProduct } from "@/types/product.interface";
import { SearchProps } from "./search.props";

import { search } from "@/api/product.api";

import { Loader, Modal } from "@/components";

import { IconSearch } from "@/assets/icons";

import { DOMAIN } from "@/helpers/api.helper";
import styles from "./search.module.scss";

interface ISearch {
  products: IProduct[];
  total: number;
}

const limit = 10;

export const Search: FC<SearchProps> = () => {
  const [searchState, setSearchState] = useState<ISearch>({ products: [], total: 0 });
  const [value, setValue] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const { i18n, t } = useTranslation();

  const handleSearch = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!target.value) return setSearchState({ products: [], total: 0 });
      setValue(target.value);
      setLoading(true);

      const {
        data: { data: products, total },
      } = await search(target.value, { language: i18n.language, page: 1, limit });

      setLoading(false);
      setSearchState({ products, total });
    } catch {
      setLoading(false);
      setSearchState({ products: [], total: 0 });
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
              ) : !!searchState.products.length ? (
                <>
                  {searchState.products.map(({ id, code, title, mainImage }) => {
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
                  })}

                  {searchState.products.length + 1 < searchState.total && (
                    <Link className={cn(styles.item, styles.more)} href={{ pathname: "/product", query: { q: value } }}>
                      {t("show-more")}
                    </Link>
                  )}
                </>
              ) : (
                <Link href="/category" className={styles.item}>
                  <p className="text-lg">{t("all-products")}</p>
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
