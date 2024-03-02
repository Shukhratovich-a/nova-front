import { Breadcrumbs, ContactsMap } from "@/components";
import ContactsOurFactories from "@/components/blocks/contacts-our-factories/contacts-our-factories";
import { FC } from "react";
import styles from "./contact.module.scss";

export const ContactView: FC = () => {
  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="30px" urlList={['contacts']}/>
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>Контакты</h2>
        <ContactsMap orient={"row"} />
      </section>
      <section className={styles.section}>
        <ContactsOurFactories />
      </section>
    </div>
  );
};

export default ContactView;
