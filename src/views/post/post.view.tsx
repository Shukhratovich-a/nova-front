import { FC } from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { PostProps } from "./post.props";

import { PostsRelated, Breadcrumbs, PostItem } from "@/components";

import styles from "./post.module.scss";

export const PostView: FC<PostProps> = ({ post, relatedPosts }) => {
  const { type } = post;

  const { t } = useTranslation();

  const urlList = [
    {
      title: t("news"),
      link: "/news",
    },
  ];

  return (
    <div className={cn("main-margin", "container")}>
      <section>
        <Breadcrumbs mb={type === "ver" ? "30px" : "10px"} urlList={urlList} />
      </section>

      <section className={cn(styles.body, { [styles["body--hor"]]: type === "hor" })}>
        <PostItem post={post} />

        <PostsRelated className={cn(styles.posts)} relatedPosts={relatedPosts} post={post} />
      </section>
    </div>
  );
};
