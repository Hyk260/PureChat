<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    iconClass: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#808080',
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`)
    return { symbolId }
  },
})
</script>
<style lang="scss" scoped>
.svg-icon {
  font-size: 16px;
  width: 1em;
  height: 1em;
  // cursor: pointer;
  display: inline-block;
  // color: #ccc; 
  // fill: currentColor; 
  // stroke: currentColor;
  vertical-align: -0.15em;
}
</style>
