import { FC } from "react";
import cn from "classnames";

import { PostProps } from "./post.props";

import { PostsRelated, Breadcrumbs, PostItem } from "@/components";

import styles from "./post.module.scss";

export const PostView: FC<PostProps> = ({ post, relatedPosts }) => {
  const { type } = post;

  return (
    <div className={cn("main-margin", "container")}>
      <section>
        <Breadcrumbs mb={type === "ver" ? "30px" : "10px"} urlList={["news", post.title]} />
      </section>

      <section className={cn(styles.body, { [styles["body--hor"]]: type === "hor" })}>
        <PostItem post={post} />

        <PostsRelated className={cn(styles.posts)} relatedPosts={relatedPosts} post={post} />
      </section>
    </div>
  );
};
