<template>
  <div class="poster">
    <client-only>
      <swiper
        navigation
        :pagination="{ clickable: true }"
        :loop="true"
        :autoplay="{
          delay: 6000,
          disableOnInteraction: true,
        }"
        :modules="modules"
        class="poster__swiper"
      >
        <swiper-slide v-for="item in data" :key="item.id" class="poster__slide">
          <img :src="item.src" alt="" />
        </swiper-slide>
      </swiper>
    </client-only>
  </div>
</template>

<script setup>
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const modules = [Pagination, Autoplay];
</script>

<style lang="sass" scoped>
.poster
  position: relative
  &__swiper
    width: 100%
    max-height: 600px
    height: 100%
    overflow: hidden
    position: relative
  &:deep(.swiper-pagination)
    position: absolute
    bottom: 18px
    left: 50%
    transform: translateY(-50%)
    z-index: 3
  &:deep
    .swiper-pagination-bullet
      margin: 0 14px
      opacity: 1
      position: relative
      &:before
        position: absolute
        content: ''
        background-color: rgba(0, 0, 0, 0.6)
        width: 14px
        height: 14px
        left: calc(50% - 14px/2)
        top: calc(50% - 14px/2)
        border-radius: 50%
      &:after
        position: absolute
        content: ''
        width: 10px
        height: 10px
        left: calc(50% - 10px/2)
        top: calc(50% - 10px/2)
        border-radius: 50%
        background-color: transparent
        box-sizing: border-box
        border: 1px solid #fff
        border-radius: 50%
  &:deep
    .swiper-pagination-bullet-active
      &:after
        background-color: $white
</style>
