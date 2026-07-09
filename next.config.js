const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
      // Per-tenant API domains — required for next/image to accept images
      // served from each tenant's API, resolved at runtime (see
      // tenant.config.js / TENANT_*_API_DOMAIN env vars).
      ...require("./tenant.config")
        .tenants.map((tenant) => {
          try {
            const { protocol, hostname, port } = new URL(tenant.apiDomain);
            return { protocol: protocol.replace(":", ""), hostname, port };
          } catch {
            return null;
          }
        })
        .filter(Boolean),
    ],
  },

  i18n,

  webpack(config, { isServer }) {
    if (!isServer) {
      // tenant-context.js pulls in Node's async_hooks; it's guarded by a
      // `typeof window` check at runtime, but the client webpack build
      // still needs to resolve the import at build time.
      config.resolve.fallback = { ...config.resolve.fallback, async_hooks: false };
    }

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
