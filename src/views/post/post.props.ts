import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IPost } from "@/types/post.interface";

export interface PostProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: IPost;
  relatedPosts: IPost[];
}
