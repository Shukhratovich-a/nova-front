import cn from "classnames";
import { FC } from "react";
import styles from "./contacts-our-factories.module.scss";
import { ContactsOurFactoriesProps } from "./contacts-our-factories.props";
import ContactsMap from "../contacts-map/contacts-map";

export const ContactsOurFactories: FC<ContactsOurFactoriesProps> = ({ className, children }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={cn(styles.title, "text-center")}>Наши заводы</h2>
      <div className={styles.content}>
        <ContactsMap orient="column" />
        <ContactsMap orient="column" />
        <ContactsMap orient="column" />
      </div>
    </div>
  );
};

export default ContactsOurFactories;
