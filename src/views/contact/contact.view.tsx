import { FC } from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { ContactProps } from "./contact.props";

import { ContactsMap, ContactsOurFactories } from "@/components";

import styles from "./contact.module.scss";

export const ContactView: FC<ContactProps> = ({ className, centrals, factories, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className={cn("main-margin", "container", styles.view, className)} {...props}>
      {!!centrals.length && (
        <section className={styles.section}>
          <h2 className={styles.title}>{t("contacts")}</h2>

          {centrals.map((central) => (
            <ContactsMap contact={central} orient={"row"} key={central.id} />
          ))}
        </section>
      )}

      <section className={styles.section}>
        <ContactsOurFactories contacts={factories} />
      </section>
    </div>
  );
};

export default ContactView;
