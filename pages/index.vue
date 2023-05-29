<template>
  <div>
    <BPosterSlider :data="posters" />
  </div>
</template>

<script setup>
const posters = [
  { id: 1, src: "/img/poster1.jpg", url: "/" },
  { id: 2, src: "/img/poster2.jpg", url: "/" },
  { id: 3, src: "/img/poster1.jpg", url: "/" },
];
</script>

<style lang="scss" scoped></style>
