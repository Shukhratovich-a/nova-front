import { FC } from "react";
import { GetStaticPaths, GetStaticPathsContext, GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";

import { ICategory } from "@/types/category.interface";

import { getAll, getByAlias } from "@/api/category.api";

import { withLayout } from "@/layout/layout";

import { CategoryView } from "@/views";

const Category: FC<CategoryProps> = ({ category }) => {
  return (
    <>
      <Head>
        <title>{`${category.title}`}</title>
      </Head>

      <CategoryView category={category} />
    </>
  );
};

// export const getStaticPaths: GetStaticPaths = async ({ locales }: GetStaticPathsContext) => {
//   let paths: string[] = [];

//   for (let locale of locales as string[]) {
//     const {
//       data: { data: categories },
//     } = await getAll({ language: locale });

//     paths = paths.concat(categories.map((category) => `/${locale}/category/${category.alias}`));
//   }

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

export const getServerSideProps: GetServerSideProps<CategoryProps> = async ({
  locale,
  params,
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  if (!params) return { notFound: true };

  const alias = params.categoryAlias as string;
  if (!alias) return { notFound: true };

  try {
    const { data: category } = await getByAlias(alias, { language: locale });
    if (!category) return { notFound: true };

    return {
      props: {
        category,
        ...(await serverSideTranslations(String(locale))),
      },
      revalidate: 1,
    };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(Category);

interface CategoryProps extends Record<string, unknown> {
  category: ICategory;
}
