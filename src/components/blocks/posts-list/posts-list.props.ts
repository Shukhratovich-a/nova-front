import { HTMLAttributes } from "react";

import { IPost } from "@/types/post.interface";

export interface PostsListProps extends HTMLAttributes<HTMLDivElement> {
  posts: IPost[];
  total: number;
}
