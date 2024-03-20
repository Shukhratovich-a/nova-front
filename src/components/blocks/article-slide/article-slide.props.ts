import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ArticleSlideProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  anchor?: "certificate" | 'video' | 'catalog';
  page?: "media" | 'news'
}
