import { FC } from "react";

import { PostsList } from "@/components";

import { PostsProps } from "./posts.props";

export const PostsView: FC<PostsProps> = ({ posts, total }) => {
  return (
    <div className="main-margin container">
      <section>
        <PostsList posts={posts} total={total} />
      </section>
    </div>
  );
};
