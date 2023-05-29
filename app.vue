<template>
  <NuxtLayout>
    <NuxtPage :key="$route.fullPath" />
  </NuxtLayout>
</template>

<script setup>
import { useGeneralStore } from '~~/store/useGeneralStore';
import 'virtual:svg-icons-register';

const generalStore = useGeneralStore();

await useAsyncData(`general`, generalStore.fetchData);


</script>
