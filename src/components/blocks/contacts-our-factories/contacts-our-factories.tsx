import { FC } from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { ContactsOurFactoriesProps } from "./contacts-our-factories.props";

import { ContactsMap } from "@/components";

import styles from "./contacts-our-factories.module.scss";

export const ContactsOurFactories: FC<ContactsOurFactoriesProps> = ({ className, contacts, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <h2 className={cn(styles.title, "text-center")}>{t("factories")}</h2>

      <div className={cn(styles.content)}>
        {!!contacts.length &&
          contacts.map((contact) => <ContactsMap contact={contact} orient="column" key={contact.id} />)}
      </div>
    </div>
  );
};

export default ContactsOurFactories;
