import { FC } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { withLayout } from "@/layout/layout";

import { ContactView } from "@/views";

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

export const getStaticProps: GetStaticProps<ContactPageProps> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale))),
    },
    revalidate: 10,
  };
};

export default withLayout(ContactPage);

export interface ContactPageProps extends Record<string, unknown> {}
