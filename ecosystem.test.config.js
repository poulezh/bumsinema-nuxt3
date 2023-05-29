module.exports = {
  apps: [
    {
      name: 'nuxt-dev',
      script: 'npm',
      args: 'run dev',
    },
    {
      name: 'nuxt-prod',
      script: 'npm',
      args: 'run start',

      env: {
        PORT: 10001,
        NODE_ENV: 'development',
      },
    },
  ],
};
