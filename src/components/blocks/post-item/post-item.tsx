import { FC, lazy } from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { format } from "date-fns";

import { DOMAIN } from "@/helpers/api.helper";

import { PostItemProps } from "./post-item.props";

import { PostCard } from "@/components";

import { IconArrowRight } from "@/assets/icons";

import styles from "./post-item.module.scss";

export const PostItem: FC<PostItemProps> = ({ post }) => {
  const { title, subtitle, body, image, createAt, type } = post;

  return (
    <div className={cn(styles.wrapper, styles[type])}>
      <div className={styles.head}>
        <h2 className={styles.title}>{title}</h2>

        <p className="text-md">{format(createAt, "dd MMMM yyyy")}</p>
      </div>

      <div className={styles.body}>
        <div className={styles.content}>
          <Image className={styles.image} width={1000} height={480} alt="" src={`${DOMAIN}${image}`} priority />

          <p className="subtitle-sm">{subtitle}</p>

          <div className="text-lg" dangerouslySetInnerHTML={{ __html: body }} />
        </div>

        {/* <article className={styles.article}>
          <div className={styles["article-head"]}>
            <h4 className="subtitle-lg">Похожие новости</h4>
            <Link className="color-accent" href={""}>
              Показать все
              <IconArrowRight />
            </Link>
          </div>
          <ul className={styles['article-body']}>
            <li>
              <NewsCard />
            </li>
            <li>
              <NewsCard />
            </li>
            <li>
              <NewsCard />
            </li>
          </ul>
        </article> */}
      </div>
    </div>
  );
};
