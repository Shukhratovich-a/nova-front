import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IPost } from "@/types/post.interface";

export interface PostCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: IPost;
}
