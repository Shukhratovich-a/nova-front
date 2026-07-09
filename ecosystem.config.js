module.exports = {
  apps: [
    {
      name: "novaplastik",
      script: "server.js",
      exec_mode: "fork",
      instances: 1,
      env: { NODE_ENV: "production", PORT: 4000 },
      max_memory_restart: "500M",
    },
  ],
};
