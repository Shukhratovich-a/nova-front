import { FC } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ContactTypeEnum } from "@/enums/contact-type.enum";
import { IContact } from "@/types/contact.interface";

import { getByType } from "@/api/contact.api";

import { withLayout } from "@/layout/layout";

import { ContactView } from "@/views";

export const ContactPage: FC<ContactPageProps> = ({ centrals, factories }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t("contacts")} - NOVA Plastik`}</title>
      </Head>

      <ContactView centrals={centrals} factories={factories} />
    </>
  );
};

export const getStaticProps: GetStaticProps<ContactPageProps> = async ({ locale }) => {
  try {
    const { data: centrals } = await getByType(ContactTypeEnum.CENTRAL);
    const { data: factories } = await getByType(ContactTypeEnum.FACTORY);

    return {
      props: {
        centrals,
        factories,
        ...(await serverSideTranslations(String(locale))),
      },
      revalidate: 10,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default withLayout(ContactPage);

export interface ContactPageProps extends Record<string, unknown> {
  centrals: IContact[];
  factories: IContact[];
}
