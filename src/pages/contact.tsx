import { withLayout } from "@/layout/layout";
import { ContactView } from "@/views";
import Head from "next/head";
import { FC } from "react";

export const ContactPage: FC = () => {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <ContactView />
    </>
  );
};

export default withLayout(ContactPage);
