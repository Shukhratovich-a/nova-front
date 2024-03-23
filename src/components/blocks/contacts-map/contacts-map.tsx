import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { ContactsMapProps } from "./contacts-map.props";

import { Map } from "@/components";

import styles from "./contacts-map.module.scss";

export const ContactsMap: FC<ContactsMapProps> = ({ className, contact, orient, ...props }) => {
  const { map, address, type, phone, email, country } = contact;

  const { t } = useTranslation();
  const { t: countryT } = useTranslation("countries");

  return (
    <div
      className={cn(styles.card, className, {
        [styles.cardOrientRow]: orient === "row",
        [styles.cardColumn]: orient === "column",
      })}
      {...props}
    >
      <div className={styles.map}>
        <Map map={map} />
      </div>

      <div className={styles.content}>
        <h2 className={cn(styles.title, "color-accent")}>{`${t(type)} (${countryT(country)})`}</h2>

        <div className={styles.info}>
          <p className="text-lg fw-bold">{`${t("address")} :`}</p>
          <p className="text-lg">{address}</p>
          <p className="text-lg fw-bold">{`${t("phone")} :`}</p>
          <Link href={`tel:${phone}`} className="color-accent text-lg">
            {phone}
          </Link>

          <p className="text-lg fw-bold">{`${t("email")} :`}</p>

          <Link href={`mailto:${email}`} className="color-accent text-lg">
            {email}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ContactsMap;
