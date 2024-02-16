import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IPost } from "@/types/post.interface";

export interface PostsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  posts: IPost[];
  total: number;
}
