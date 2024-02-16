import { FC } from "react";

import { Breadcrumbs, PostsList } from "@/components";

import { PostsProps } from "./posts.props";

export const PostsView: FC<PostsProps> = ({ posts, total }) => {
  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="30px" />
      </section>

      <section>
        <PostsList posts={posts} total={total} />
      </section>
    </div>
  );
};
