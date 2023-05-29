<template>
  <button class="burger" :class="{ _active: isActive }" @click="toggleMenu"><span /></button>
</template>

<script setup>
const isActive = ref(false);
const emit = defineEmits(['toggleMenu']);

const toggleMenu = () => {
  isActive.value = !isActive.value;
  emit('toggleMenu');
};
</script>

<style lang="sass" scoped>
.burger
  width: 44px
  height: 44px
  border: 1px solid $white
  border-radius: 50%
  position: relative
  display: none
  @include bp($tablet)
    display: flex
  @include bp($phablet)
    width: 40px
    height: 40px
  &:after, & span
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    width: 15px
    @include transition(all)
    @include bp($phablet)
      width: 13px
  &:after
    content: ''
    height: 2px
    background: $white
  & span
    height: 14px
    @include bp($phablet)
      height: 12px
    &:before, &:after
      content: ''
      position: absolute
      right: 0
      width: 100%
      height: 2px
      background: $white
      @include transition(all)
    &:before
      top: 0
    &:after
      bottom: 0
  &._active
    &:after
      width: 0
    & span
      width: 12px
      height: 12px
      &:before, &:after
        right: 1px
        width: 15px
      &:before
        transform: rotate(-45deg)
        transform-origin: right top
      &:after
        transform: rotate(45deg)
        transform-origin: right bottom
</style>
