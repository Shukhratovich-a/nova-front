import { FC } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { format } from "date-fns";

import { DOMAIN } from "@/helpers/api.helper";

import { PostCardProps } from "./post-card.props";

import { IconArrowRight } from "@/assets/icons";

import styles from "./post-card.module.scss";

export const PostCard: FC<PostCardProps> = ({ post }) => {
  const { poster, title, subtitle, body, alias, tags, createAt } = post;

  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.card}>
      <div onClick={() => handleNavigation("link")} className={styles.head}>
        <div className={styles.image}>
          <Image src={`${DOMAIN}${poster}`} alt="" width={350} height={200} priority />
        </div>

        <div className={styles.captions}>
          <span className={cn(styles.date, "badge-text")}>{format(new Date(createAt), "dd MMMM yyyy")}</span>

          {tags.length && <span className={cn(styles.label, "badge-text")}>{tags[0]}</span>}
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{title}</h3>

        <div className={cn(styles.description, "text-md")} dangerouslySetInnerHTML={{ __html: subtitle || body }} />

        <Link href={`/news/${alias}`} className={cn(styles.link, "color-accent")}>
          Посмотреть <IconArrowRight />
        </Link>
      </div>
    </div>
  );
};
