import axios from 'axios';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const defaultUrl = config.public.API_BASE_URL;

  const api = axios.create({
    baseURL: defaultUrl,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // eslint-disable-next-line no-console
      console.log(`${error.code}: ${error.message} at ${error.config.url}`);
      throw error;
    },
  );

  return {
    provide: {
      api,
    },
  };
});
