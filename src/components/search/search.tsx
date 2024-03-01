import { IconSearch } from "@/assets/icons";
import { Dropdown } from "@/components";
import cn from "classnames";
import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";
import styles from "./search.module.scss";
import { SearchProps } from "./search.props";

const searchContent = [
  { title: "Футбольный мячvФутбольный мячФутбольный мяч" },
  { title: "Ноутбук" },
  { title: "Фотоаппарат" },
  { title: "Книга 'Война и мир'" },
  { title: "Смартфон" },
  { title: "Фитнес трекер" },
  { title: "Кофеварка" },
  { title: "Наушники" },
  { title: "Футболка" },
  { title: "Кроссовки" },
];

const Search: FC<SearchProps> = () => {
  const [content, setContent] = useState(searchContent);

  const searchByTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const filter = searchContent.filter(({ title }) => {
      return title.toLowerCase().includes(target.value.toLowerCase());
    });
    setContent(filter);
  };

  return (
    <div>
      <Dropdown trigger={<IconSearch className="color-white" />}>
        <div className={styles.wrapper}>
          <div className={styles.input}>
            <label htmlFor="header-search">
              <IconSearch className="color-accent" />
            </label>
            <input
              onChange={searchByTitle}
              placeholder="Search"
              type="search"
              name="header-search"
              id="header-search"
            />
          </div>
          <div className={cn(styles.body, "custom-scrollbar")}>
            {!content.length && <p className="text-lg">There are no products for this request</p>}
            {content.map(({ title }, index) => {
              return (
                <div key={index} className={styles.item}>
                  <Image src="https://picsum.photos/100/100" alt="" width={60} height={60} />
                  <p className={styles.title}>{title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default Search;
