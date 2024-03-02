import { IconArrowRight } from "@/assets/icons";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import styles from "./breadcrumbs.module.scss";
import { BreadcrumbsProps } from "./breadcrumbs.props";

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ mb = "10px", urlList=[] }) => {
  const router = useRouter();

  const getPathSegments = () => {
    const pathList = router.asPath.split("/").filter((segment) => segment !== "");

    return pathList;
  };

  const pathSegments = getPathSegments();

  return (
    <nav className={styles.wrapper} style={{ marginBottom: mb }}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={cn(styles.link, "nav-link-text", "color-accent")} href="/">
            Home
            <IconArrowRight />
          </Link>
        </li>
        {urlList.map((segment, index) => (
          <li className={styles.item} key={index}>
            <Link
              className={cn(styles.link, "nav-link-text", "color-accent")}
              href={`/${pathSegments.slice(0, index + 1).join("/")}`}
            >
              {segment} {index < pathSegments.length - 1 ? <IconArrowRight /> : ""}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
