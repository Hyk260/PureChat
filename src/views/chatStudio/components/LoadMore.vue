<template>
  <div class="view-ref" v-if="isShowMore">
    <!-- <div class="showMore">
      {{ noMore ? $t("chat.noMore") : "" }}
    </div> -->
    <Loader v-show="!chatStore.noMore" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useChatStore } from "@/stores/modules/chat/index";
import Loader from "@/views/components/Loader/index.vue";
import store from "@/store/index";

const props = defineProps({
  index: {
    type: Number,
  },
});

const chatStore = useChatStore();

const isShowMore = computed(() => {
  return chatStore.currentMessageList?.length - 1 === props.index;
});
</script>

<style lang="scss" scoped>
.view-ref {
  @include flex-center;
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
