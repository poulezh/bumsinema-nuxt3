<template>
  <div class="tabs" :class="classList">
    <div v-for="(tab, idx) in tabs" :key="idx" class="tabs__tab" :class="{ _active: tab === currentTab }" @click="changeTab(tab)">
      {{ tab.name }}
    </div>
  </div>
</template>

<script>
import additionalClassCSS from '~/utils/additionalClassCSS';

export default {
  name: 'BTabs',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    mod: {
      type: [Array, String],
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: [Number, String, Object, Boolean],
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentTab: null,
    };
  },
  computed: {
    modClass() {
      return additionalClassCSS(this.mod);
    },
    disableClass() {
      return additionalClassCSS(this.disable ? 'disable' : '');
    },
    classList() {
      return Object.assign({}, this.modClass, this.disableClass, this.errorClass);
    },
  },
  created() {
    if (this.initValue) {
      this.currentTab = this.initValue;
    } else {
      this.currentTab = this.tabs[0];
    }
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
      this.$emit('change', this.currentTab);
    },
  },
};
</script>

<style lang="sass" scoped>
.tabs
  position: relative
  display: flex
  gap: 8px
  &__tab
    display: inline-flex
    justify-content: center
    align-items: center
    padding: 0 24px
    height: 56px
    border-radius: 12px
    background: $disable
    text-align: center
    @include font-size-lh(20,26)
    font-weight: 500
    color: $white
    cursor: pointer
    @include transition(all)
    &._transparent
      background transparent
    @media $xs
    @include font-size-lh(14,24)
      height 48px
    &._active
      background $orange
      color $green
      pointer-events none
      @include transition(all)
  &._affiche
    & .tabs__tab
      border-radius 0
</style>
