import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FC, useEffect, useState } from "react";

import { PostsListProps } from "./posts-list.props";

import { Button, PostCard, EmptyList } from "@/components";

import styles from "./posts-list.module.scss";

export const PostsList: FC<PostsListProps> = ({ posts, total }) => {
  const { replace, query } = useRouter();
  const [displayCount, setDisplayCount] = useState<number>(query.limit ? Number(query.limit) : 12);
  const { t } = useTranslation();

  const loadMore = () => {
    if (displayCount >= total) return;

    setDisplayCount(displayCount + 4);
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
      setDisplayCount(12);
    }
  }, [query]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t("news")}</h2>

      {!!posts.length ? (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li className={styles.item} key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyList translateKey="posts" />
      )}

      {displayCount < total && (
        <Button className={styles.button} onClick={loadMore}>
          Показать больше
        </Button>
      )}
    </div>
  );
};
