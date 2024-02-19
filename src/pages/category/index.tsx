import { FC } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { useTranslation } from "next-i18next";
import { ParsedUrlQuery } from "querystring";

import { ICategory } from "@/types/category.interface";

import { getAll } from "@/api/category.api";

import { withLayout } from "@/layout/Layout";
import Link from "next/link";

const Categories: FC<CategoriesProps> = ({ categories }) => {
  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>

      <div className="container main-margin">
        {categories.map((category) => (
          <div key={category.id}>
            <Link href={`/category/${category.alias}`}>{category.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<CategoriesProps> = async ({
  locale,
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const {
    data: { data: categories, total },
  } = await getAll({ limit: 1000 });

  return {
    props: {
      categories,
      total,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(Categories);

interface CategoriesProps extends Record<string, unknown> {
  categories: ICategory[];
  total: number;
}
