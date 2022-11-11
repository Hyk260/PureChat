<template>
  <svg class="svg-icon" :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { defineComponent, computed, reactive } from "vue";
export default defineComponent({
  // <svg-icon iconClass="loginBg" class="wave" />
  props: {
    iconClass: {
      type: String,
      default: () => null,
      // validator: (val) => {
      //   return [
      //     "link",
      //     "text",
      //     "default",
      //   ].includes(val);
      // },
    },
    className: {
      type: String,
      default: () => null,
    },
  },
  setup(props) {
    const svgClass = computed(() => {
      return props.className;
    });

    const iconName = computed(() => {
      return `#icon-${props.iconClass}`;
    });

    return {
      svgClass,
      iconName,
    };
  },
});
</script>

<style lang="scss" scoped>
.svg-icon {
  font-size: 16px;
  width: 1em;
  height: 1em;
  cursor: pointer;
}
</style>
