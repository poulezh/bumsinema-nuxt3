import { defineStore } from 'pinia';

export const useGeneralStore = defineStore('general', () => {
  const { $api } = useNuxtApp();

  const data = ref(null);

  const fetchData = async () => {
    const { data: generalData } = await $api.get('/general/');
    data.value = generalData;
    return data;
  };

  return { data, fetchData };
});