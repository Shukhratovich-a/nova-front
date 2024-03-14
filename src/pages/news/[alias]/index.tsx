import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { ParsedUrlQuery } from "querystring";

import { IPost } from "@/types/post.interface";

import { getAll, getByAlias, getByTags } from "@/api/post.api";

import { withLayout } from "@/layout/layout";

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
    } = await getAll({ limit: 100000000, language: locale });

    paths = paths.concat(posts.map((post) => `/${locale}/news/${post.alias}`));
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
  locale,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) return { notFound: true };

  const alias = params.alias as string;
  if (!alias) return { notFound: true };

  try {
    const { data: post } = await getByAlias(alias, { language: locale });
    if (!post) return { notFound: true };

    let {
      data: { data: relatedPosts },
    } = await getByTags(post.tags, { language: locale, limit: post.type === "hor" ? 3 : 4, newsId: post.id });

    return {
      props: {
        post,
        relatedPosts,
        ...(await serverSideTranslations(String(locale))),
      },
      revalidate: 10,
    };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(PostPage);

export interface PostPageProps extends Record<string, unknown> {
  post: IPost;
  relatedPosts: IPost[];
}
