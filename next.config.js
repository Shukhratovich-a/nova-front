const { i18n } = require("./next-i18next.config");
const APP_ENV = process.env.APP_ENV || "uz";

require("dotenv").config({ path: `.env.${APP_ENV}` });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: `.next-${APP_ENV}`,
  env: {
    NEXT_PUBLIC_APP_ENV: APP_ENV,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    DEFAULT_LANG: process.env.DEFAULT_LANG,
    NEXT_PUBLIC_WHATSAPP_PHONE: process.env.NEXT_PUBLIC_WHATSAPP_PHONE,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "youtu.be",
      },
      {
        protocol: "http",
        hostname: "api.novaplastik.com",
      },
      {
        protocol: "https",
        hostname: "api.novaplastik.com",
      },
      {
        protocol: "http",
        hostname: "apmath.nuu.uz",
      },
      {
        protocol: "https",
        hostname: "apmath.nuu.uz",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3002",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3002",
      },
    ],
  },

  i18n,
  // async rewrites() {
  //   return [
  //     {
  //       source: `/uploads/:path*`,
  //       destination: `${process.env.NEXT_PUBLIC_DOMAIN}/uploads/:path*`,
  //     },
  //     {
  //       source: `/file/:path*`,
  //       destination: `${process.env.NEXT_PUBLIC_DOMAIN}/file/:path*`,
  //     },
  //   ];
  // },

  webpack(config, options) {
    config.module.rules.push({
      loader: "@svgr/webpack",
      issuer: /\.[jt]sx?$/,
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                override: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });

    return config;
  },
};

module.exports = nextConfig;
