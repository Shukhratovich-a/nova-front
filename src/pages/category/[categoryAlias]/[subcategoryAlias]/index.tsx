import { FC } from "react";
import Link from "next/link";
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";

import { ISubcategory } from "@/types/subcategory.interface";

import { getByAlias } from "@/api/subcategory.api";
import { getAllWithChildren } from "@/api/category.api";

import { withLayout } from "@/layout/layout";

import { SubcategoryView } from "@/views";

const Subcategory: FC<SubcategoryProps> = ({ subcategory }) => {
  return (
    <>
      <Head>
        <title>{`${subcategory.title}`}</title>
      </Head>

      <SubcategoryView subcategory={subcategory} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  let paths: string[] = [];

  for (let locale of locales as string[]) {
    const {
      data: { data: categories },
    } = await getAllWithChildren({ limit: 100000000, language: locale });

    paths = paths.concat(
      categories.flatMap((category) =>
        category.subcategories!.map((subcategory) => `/${locale}/category/${category.alias}/${subcategory.alias}`)
      )
    );
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<SubcategoryProps> = async ({
  locale,
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) return { notFound: true };

  const alias = params.subcategoryAlias as string;
  if (!alias) return { notFound: true };

  try {
    const { data: subcategory } = await getByAlias(alias, { language: locale });
    if (!subcategory) return { notFound: true };

    return {
      props: {
        subcategory,
        ...(await serverSideTranslations(String(locale))),
      },
      revalidate: 1,
    };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(Subcategory);

interface SubcategoryProps extends Record<string, unknown> {
  subcategory: ISubcategory;
}
