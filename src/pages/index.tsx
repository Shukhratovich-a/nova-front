import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { FC } from "react";

import { IBanner } from "@/types/banner.interface";
import { ICategory } from "@/types/category.interface";

import { getAll as getAllBanners } from "@/api/banner.api";
import { getAll as getAllCategories } from "@/api/category.api";
import { getAll as getAllCatalogs } from "@/api/catalog.api";
import { getAll as getAllCertificates } from "@/api/certificate.api";
import { getAll as getAllPosts } from "@/api/post.api";

import { withLayout } from "@/layout/layout";

import { ICatalog } from "@/types/catalog.interface";
import { ICertificate } from "@/types/certificate.interface";
import { IPost } from "@/types/post.interface";

import { HomeView } from "@/views";

const HomePage: FC<HomePageProps> = ({ _nextI18Next, ...rest }) => {
  return (
    <>
      <Head>
        <title>NOVA Plastik</title>
      </Head>

      <HomeView {...rest} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ locale }) => {
  try {
    const {
      data: { data: banners },
    } = await getAllBanners({ language: locale });

    // const {
    //   data: { data: categories },
    // } = await getAllCategories({ language: locale, limit: 9 });
    // const {
    //   data: { data: catalogs },
    // } = await getAllCatalogs({ language: locale, limit: 12 });
    // const {
    //   data: { data: posts },
    // } = await getAllPosts({ language: locale, limit: 12 });

    // const { data: certificates } = await getAllCertificates({ language: locale });

    return {
      props: {
        banners,
        // categories,
        // certificates,
        // catalogs,
        // posts,
        ...(await serverSideTranslations(String(locale))),
      },
    };
  } catch (e) {
    console.log(e);

    return {
      notFound: true,
    };
  }
};

export default withLayout(HomePage);

export interface HomePageProps extends Record<string, unknown> {
  banners: IBanner[];
  // categories: ICategory[];
  // certificates: ICertificate[];
  // posts: IPost[];
  // catalogs: ICatalog[];
}
