import { HTMLAttributes } from "react";
import { IPost } from "@/types/post.interface";

export interface PostCardProps extends HTMLAttributes<HTMLDivElement> {
  post: IPost;
}
