import React from "react";
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { ParsedUrlQuery } from "querystring";

import { IPost } from "@/types/post.interface";

import { DOMAIN } from "@/helpers/api.helper";

import { getAll, getByAlias, getByTags } from "@/api/post.api";

import { withLayout } from "@/layout/layout";

import { PostView } from "@/views";

const PostPage: React.FC<PostPageProps> = ({ post, relatedPosts }) => {
  const { title, subtitle, poster } = post;

  const { t, i18n } = useTranslation();

  return (
    <>
      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${t("news")} - ${title}`} />
        <meta property="og:locale" content={i18n.language} />
        <meta property="og:description" content={subtitle} />
        <meta property="og:image" content={`${DOMAIN}${poster}`} />
        <meta property="og:image:secure_ur" content={`${DOMAIN}${poster}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <title>{`${t("news")} - ${post.title}`}</title>
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
    } = await getAll({ language: locale });

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
      revalidate: 1,
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
