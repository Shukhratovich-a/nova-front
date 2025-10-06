module.exports = {
  apps: [
    {
      name: "novaplastik-uz",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4001",
      env: {
        NODE_ENV: "production",
        APP_ENV: "uz",
        NEXT_PUBLIC_DOMAIN: "https://api.novaplastik.com/v2/uz",
        DEFAULT_LANG: "uz",
        NEXT_PUBLIC_WHATSAPP_PHONE: "+998933883042",
      },
    },
    {
      name: "novaplastik-tr",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4002",
      env: {
        NODE_ENV: "production",
        APP_ENV: "tr",
        NEXT_PUBLIC_DOMAIN: "https://api.novaplastik.com/v2/tr",
        DEFAULT_LANG: "tr",
        NEXT_PUBLIC_WHATSAPP_PHONE: "+905494886682",
      },
    },
    {
      name: "novaplastik-eg",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4003",
      env: {
        NODE_ENV: "production",
        APP_ENV: "eg",
        NEXT_PUBLIC_DOMAIN: "https://api.novaplastik.com/v2/eg",
        DEFAULT_LANG: "eg",
      },
    },
  ],
};
