import { IconArrowRight } from "@/assets/icons";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import styles from "./breadcrumbs.module.scss";

export const Breadcrumbs: FC<{ mb?: string }> = ({ mb = "10px" }) => {
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment !== "");

  return (
    <nav className={styles.wrapper} style={{ marginBottom: mb }}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={cn(styles.link, "nav-link-text", "color-accent")} href="/">
            Home
            <IconArrowRight />
          </Link>
        </li>
        {pathSegments.map((segment, index) => (
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
