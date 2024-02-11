import { Button, NewsCard } from "@/components";
import { FC } from "react";
import styles from "./news-list.module.scss";
import { NewsListProps } from "./news-list.props";

export const NewsList: FC<NewsListProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Новости</h2>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NewsCard />
        </li>
        <li className={styles.item}>
          <NewsCard />
        </li>
        <li className={styles.item}>
          <NewsCard />
        </li>
        <li className={styles.item}>
          <NewsCard />
        </li>
        <li className={styles.item}>
          <NewsCard />
        </li>
        <li className={styles.item}>
          <NewsCard />
        </li>
        <li className={styles.item}>
          <NewsCard />
        </li>
        <li className={styles.item}>
          <NewsCard />
        </li>
      </ul>
      <Button className={styles.button}>Показать больше</Button>
    </div>
  );
};
export default NewsList;
