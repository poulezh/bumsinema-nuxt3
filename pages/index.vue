<template>
  <div>
    <BPosterSlider :data="posters" />
  </div>
</template>

<script setup>
import { useGeneralStore } from "~/store/useGeneralStore";

const generalStore = useGeneralStore();
const posters = computed(() => generalStore.data.posters);

</script>

<style lang="scss" scoped></style>
