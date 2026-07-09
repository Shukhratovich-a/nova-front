import { FC } from "react";

import { IconWhatsApp } from "@/assets/icons";
import { useWhatsappPhone } from "@/contexts/tenant.context";

import styles from "./fixed-icon.module.scss";
import Link from "next/link";

export const FixedIcon: FC<{ url?: string }> = ({ url }) => {
  const whatsappPhone = useWhatsappPhone();
  const href = url ?? `https://wa.me/${whatsappPhone}`;

  return (
    <div className={styles.wrapper}>
      <Link href={href} target="_blank" title="WhatsApp" className={styles.icon}>
        <IconWhatsApp />
      </Link>
    </div>
  );
};

export default FixedIcon;
