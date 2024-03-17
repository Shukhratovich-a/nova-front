import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IBanner } from "@/types/banner.interface";
import { ICategory } from "@/types/category.interface";
import { ICertificate } from "@/types/certificate.interface";
import { IPost } from "@/types/post.interface";

export interface HomeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  banners: IBanner[];
  categories: ICategory[];
  certificates: ICertificate[];
  posts: IPost[]
}
