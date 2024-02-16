import { HTMLAttributes } from "react";

import { IPost } from "@/types/post.interface";

export interface PostItemProps extends HTMLAttributes<HTMLDivElement> {
  post: IPost;
}
