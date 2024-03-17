import { FC } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { ParsedUrlQuery } from "querystring";

import { IPost } from "@/types/post.interface";

import { getAll, getByTags } from "@/api/post.api";

import { withLayout } from "@/layout/layout";

import { PostsView } from "@/views";

const PostsPage: FC<PostsPageProps> = ({ posts, total }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{`${t("news")} - Nova Plastik`}</title>
      </Head>

      <PostsView posts={posts} total={total} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PostsPageProps> = async ({
  locale,
  query: { limit, tags },
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  if (tags) {
    const {
      data: { data: posts, total },
    } = await getByTags([String(tags)], { limit: limit ? Number(limit) : 12, language: locale });

    return {
      props: {
        posts,
        total,
        ...(await serverSideTranslations(String(locale))),
      },
    };
  }

  const {
    data: { data: posts, total },
  } = await getAll({ page: 1, limit: limit ? Number(limit) : 12, language: locale });

  return {
    props: {
      posts,
      total,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(PostsPage);

interface PostsPageProps extends Record<string, unknown> {
  posts: IPost[];
  total: number;
}
