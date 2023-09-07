<template>
  <nuxt-link v-if="isNuxtLink" class="button" :to="to" :class="classList"><slot></slot></nuxt-link>
  <a v-else-if="isOuterLink" class="button" :href="href" :target="targetBlank ? '_blank' : ''" :class="classList"><slot></slot></a>
  <button v-else class="button" :class="classList"><slot></slot></button>
</template>

<script>
import additionalClassCSS from '~/utils/additionalClassCSS';

export default {
  name: 'BButton',
  props: {
    mod: {
      type: [Array, String],
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
    targetBlank: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    modClass() {
      return additionalClassCSS(this.mod);
    },
    disableClass() {
      return { _disabled: this.disabled };
    },
    classList() {
      return Object.assign({}, this.modClass, this.disableClass, this.errorClass);
    },
    isNuxtLink() {
      return !!this.to;
    },
    isOuterLink() {
      return !!this.href;
    },
  },
};
</script>

<style lang="sass" scoped>
.button
  display: inline-flex
  justify-content: center
  align-items: center
  height: 56px
  padding: 0 32px
  @include font-size-lh(20,20)
  font-weight: 700
  text-transform: uppercase
  color: $white
  border-radius: 12px
  @include transition(all)
  background: $orange
  @include bp($phablet)
    height: 48px
    @include font-size-lh(14, 20)
    border-radius: 48px
  &._default
    background: $orange
    @include transition(all)
    +hover()
      background: $disable
      @include transition(all)
</style>
