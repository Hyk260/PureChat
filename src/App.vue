<template>
  <div>
   <!-- <router-view /> -->
   123

   <svg-icon icon-class="arrow-right"></svg-icon>
    <el-button type="primary">Primary</el-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
export default defineComponent({
  components: {
    SvgIcon
  }
})
</script>

<style lang="scss" scoped>

</style>
