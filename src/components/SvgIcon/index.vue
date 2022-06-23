<template>
  <svg class="svg-icon" :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
  import { defineComponent, computed, reactive } from "vue";
  export default defineComponent({
    props: {
      iconClass: {
        type: String,
        default: () => null
      },
      className: {
        type: String,
        default: () => null
      }
    },
    setup(props) {
      const svgClass = computed(() => {
        return props.className
      });

      const iconName = computed(() => {
        return `#icon-${props.iconClass}`
      });

      return {
        svgClass,
        iconName
      }
    }
  })
</script>

<style lang="scss" scoped>
  .svg-icon {
    font-size: 16px;
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    cursor: pointer;
  }
</style>