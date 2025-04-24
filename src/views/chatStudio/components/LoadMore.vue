<template>
  <div class="view-ref flex-c" v-if="isShowMore">
    <!-- <div class="showMore">
      {{ chatStore.noMore ? $t("chat.noMore") : "" }}
    </div> -->
    <Loader v-show="!chatStore.noMore" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useChatStore } from "@/stores/modules/chat/index";
import Loader from "@/views/components/Loader/index.vue";

const props = defineProps({
  index: {
    type: Number,
  },
});

const chatStore = useChatStore();

const isShowMore = computed(() => {
  // return chatStore.currentMessageList?.length - 1 === props.index;
  return props.index === 0;
});
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
