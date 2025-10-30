<template>
  <div class="panel-wrapper w-full flex flex-col">
    <div class="title flex-bc">
      <span>{{ item.title }}</span>
      <ElIcon @click="emit('onClose')">
        <Close />
      </ElIcon>
    </div>
    <Currency v-if="item.id === 'currency'" />
    <WebSearch v-else-if="item.id === 'webSearch'" />
    <About v-else-if="item.id === 'about'" />
    <ProviderModel v-else-if="item.id === 'provider'" />
  </div>
</template>

<script setup lang="ts">
import { X as Close } from "lucide-vue-next"

import About from "./about.vue"
import Currency from "./currency.vue"
import ProviderModel from "./providerModel.vue"
import WebSearch from "./webSearch.vue"

defineProps({
  item: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(["onClose"])
</script>

<style lang="scss" scoped>
.panel-wrapper {
  padding: 1.25rem;
  min-width: 300px;
  .title {
    margin-bottom: 20px;
    line-height: 26px;
    font-weight: 500;
    font-size: 16px;
    .el-icon {
      cursor: pointer;
    }
  }
}

.setting li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  .el-select {
    max-width: 180px;
  }
}

// .divider {
//   border-color: #f2f4f7;
//   margin-top: 1.5rem;
//   margin-bottom: 1.5rem;
//   display: flex;
//   width: 100%;
//   min-width: 100%;
//   margin: 24px 0;
//   border-top: 1px solid rgba(16, 24, 40, 0.06);
// }
</style>
