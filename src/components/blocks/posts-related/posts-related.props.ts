import { IPost } from "@/types/post.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface PostsRelatedProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  relatedPosts: IPost[];
  post: IPost;
}
