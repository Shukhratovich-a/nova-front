import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { ParsedUrlQuery } from "querystring";

import { IPost } from "@/types/post.interface";

import { getAll, getByAlias, getByTags } from "@/api/post.api";

import { withLayout } from "@/layout/Layout";

import { PostView } from "@/views";

const PostPage: React.FC<PostPageProps> = ({ post, relatedPosts }) => {
  return (
    <>
      <Head>
        <title>{`Новости - ${post.title}`}</title>
      </Head>

      <PostView post={post} relatedPosts={relatedPosts} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  let paths: string[] = [];

  for (let locale of locales as string[]) {
    const {
      data: { data: posts },
    } = await getAll({ page: 1, limit: 1, language: locale });

    paths = paths.concat(posts.map((post) => `/${locale}/news/${post.alias}`));
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
  locale,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { data: post } = await getByAlias(params.alias as string, { language: locale });

  let {
    data: { data: relatedPosts },
  } = await getByTags(post.tags, { language: locale, page: 1, limit: post.type === "hor" ? 3 : 4, newsId: post.id });

  return {
    props: {
      post,
      relatedPosts,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(PostPage);

export interface PostPageProps extends Record<string, unknown> {
  post: IPost;
  relatedPosts: IPost[];
}
