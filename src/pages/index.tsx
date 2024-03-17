import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { FC } from "react";

import { IBanner } from "@/types/banner.interface";
import { ICategory } from "@/types/category.interface";

import { getAll as getAllBanners } from "@/api/banner.api";
import { getAll as getAllCategories } from "@/api/category.api";
import { getAll as getAllCertificates } from "@/api/certificate.api";
import { getAll as getAllPosts } from "@/api/post.api";

import { withLayout } from "@/layout/layout";

import { ICertificate } from "@/types/certificate.interface";
import { HomeView } from "@/views";
import { IPost } from "@/types/post.interface";

const HomePage: FC<HomePageProps> = ({ banners, categories, certificates, posts}) => {
  return (
    <>
      <Head>
        <title>NOVA Plastik</title>
      </Head>

      <HomeView banners={banners} categories={categories} certificates={certificates} posts={posts}/>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ locale }) => {
  try {
    const {
      data: { data: banners },
    } = await getAllBanners({ language: locale });

    const {
      data: { data: categories },
    } = await getAllCategories({ language: locale, limit: 10 });

    const { data: certificates } = await getAllCertificates({ language: locale });

    const {
      data: { data: posts },
    } = await getAllPosts({ language: locale });

    return {
      props: {
        banners,
        categories,
        certificates,
        posts,
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

export default withLayout(HomePage);

export interface HomePageProps extends Record<string, unknown> {
  banners: IBanner[];
  certificates: ICertificate[];
  categories: ICategory[];
  posts: IPost[];
}
