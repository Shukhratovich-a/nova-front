import { FC } from "react";

import { PostProps } from "./post.props";

import { Breadcrumbs, PostItem } from "@/components";

export const PostView: FC<PostProps> = ({ post }) => {
  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="30px" />
      </section>

      <section>
        <PostItem post={post} />
      </section>
    </div>
  );
};
