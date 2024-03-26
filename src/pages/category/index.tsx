import { FC } from "react";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { ParsedUrlQuery } from "querystring";

import { ICategory } from "@/types/category.interface";

import { getAll } from "@/api/category.api";

import { withLayout } from "@/layout/layout";

import { CategoriesView } from "@/views/categories/categories.view";

const Categories: FC<CategoriesProps> = ({ categories, total }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t("category")} - Nova Plastik`}</title>
      </Head>

      <CategoriesView categories={categories} total={total} />
    </>
  );
};

export const getStaticProps: GetStaticProps<CategoriesProps> = async ({
  locale,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  const {
    data: { data: categories, total },
  } = await getAll({ language: locale });

  return {
    props: {
      categories,
      total,
      ...(await serverSideTranslations(String(locale))),
    },
    revalidate: 1,
  };
};

export default withLayout(Categories);

interface CategoriesProps extends Record<string, unknown> {
  categories: ICategory[];
  total: number;
}
