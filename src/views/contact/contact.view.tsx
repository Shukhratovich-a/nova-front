import cn from "classnames";
import { useTranslation } from "next-i18next";
import { FC } from "react";

import { ContactProps } from "./contact.props";

import { ContactsMap } from "@/components";

import styles from "./contact.module.scss";

export const ContactView: FC<ContactProps> = ({ className, centrals, factories, ...props }) => {
  const { t } = useTranslation();

  const mapsList = centrals.concat(factories);

  return (
    <div className={cn("main-margin", "container", styles.view, className)} {...props}>
      {!!mapsList.length && (
        <section className={styles.section}>
          <h2 className={styles.title}>{t("contacts")}</h2>

          <div className={styles.list}>
            {mapsList.map((central) => (
              <ContactsMap contact={central} orient={"row"} key={central.id} />
            ))}
          </div>
        </section>
      )}
      {/* 
      <section className={styles.section}>
        <ContactsOurFactories contacts={factories} />
      </section> */}
    </div>
  );
};

export default ContactView;
