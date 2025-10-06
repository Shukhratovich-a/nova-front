module.exports = {
  apps: [
    {
      name: "novaplastik-uz",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4001",
      env: { NODE_ENV: "production", APP_ENV: "uz" },
    },
    {
      name: "novaplastik-tr",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4002",
      env: { NODE_ENV: "production", APP_ENV: "tr" },
    },
    {
      name: "novaplastik-eg",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4003",
      env: { NODE_ENV: "production", APP_ENV: "eg" },
    },
  ],
};
