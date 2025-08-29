<template>
  <div v-if="isShowMore" class="view-ref flex-c">
    <!-- <div class="showMore">
      {{ chatStore.noMore ? $t("chat.noMore") : "" }}
    </div> -->
    <Loader v-show="!chatStore.noMore" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

import Loader from "@/components/Loader/index.vue"
import { useChatStore } from "@/stores/modules/chat"

const props = defineProps({
  index: {
    type: Number,
  },
})

const chatStore = useChatStore()

const isShowMore = computed(() => {
  return props.index === 0
})
</script>

<style lang="scss" scoped>
.view-ref {
  width: 100%;
  overflow: hidden;
}
.showMore {
  padding-top: 12px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  color: var(--color-time-divider);
}
</style>
