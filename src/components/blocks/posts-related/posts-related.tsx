import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { PostsRelatedProps } from "./posts-related.props";

import { Button, PostCard, ShowLink } from "@/components";

import styles from "./posts-related.module.scss";

export const PostsRelated: FC<PostsRelatedProps> = ({ className, post, relatedPosts, ...props }) => {
  const { type, tags } = post;
  const { t } = useTranslation();

  return (
    <div className={cn(styles.wrapper, className, { [styles["wrapper--hor"]]: type === "hor" })} {...props}>
      <div className={cn(styles.head)}>
        <h2 className={cn(styles.title, "subtitle-lg")}>{t("news-related")}</h2>

        {type === "hor" && <ShowLink href={{ pathname: "/news", query: { tags } }}>{t("show-all")}</ShowLink>}
      </div>

      <ul className={cn(styles.list)}>
        {relatedPosts.length &&
          relatedPosts.map((post) => (
            <li className={cn(styles.post)} key={post.id}>
              {<PostCard post={post} />}
            </li>
          ))}
      </ul>

      {type !== "hor" && (
        <Link href={{ pathname: "/news", query: { tags } }}>
          <Button className={styles.button}>{t("show-more")}</Button>
        </Link>
      )}
    </div>
  );
};
