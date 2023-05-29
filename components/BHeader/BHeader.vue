<template>
  <header class="header" :class="{ _showMenu: isMenuActive }">
    <div class="header__wrapper">
      <div class="header__left">
        <nuxt-link to="/" class="header__logo"><img src="/img/logo.png" alt="" /></nuxt-link>
      </div>
      <div class="header__right">
        <div class="header__menu">
          <nuxt-link v-for="item in menu" :key="item.id" :to="item.url" class="header__menu-item">{{ item.name }}</nuxt-link>
        </div>
        <BBurger class="header__burger" @toggle-menu="toggleMenu" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useGeneralStore } from "~/store/useGeneralStore";

const generalStore = useGeneralStore();
const menu = computed(() => generalStore.data.menu);

const isMenuActive = ref(false);

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
};
</script>

<style lang="sass" scoped>
.header
  width: 100%
  height: 80px
  background: $black
  position: fixed
  top: 0
  z-index: 9
  &__wrapper
    max-width: 1560px
    width: 100%
    height: 80px
    margin: 0 auto
    display: flex
    justify-content: space-between
    align-items: center
  &__right
    display: flex
    align-items: center
    margin-right: 24px
  &__left
    margin-left: 24px
    & img
        height: 62px
        width: 62px
  &__menu
    display: flex
    &-item
      @include font-size-lh(20,26)
      color: $white
      font-weight: 500
      text-transform: uppercase
      display: flex
      height: 80px
      align-items: center
      padding: 0 20px
      @include transition(all)
      @include hover
        background: $orange
        @include transition(all)
</style>
