<template>
  <div class="viewref" v-if="index == currentMessageList.length - 1">
    <div class="showMore">
      {{ noMore ? $t("chat.noMore") : "" }}
    </div>
    <Loader v-show="!noMore" />
  </div>
</template>

<script setup>
import { useState } from "@/utils/hooks/useMapper";
import Loader from "@/views/components/Loader/index.vue";

const props = defineProps({
  index: {
    type: Number,
  },
});

const { noMore, currentMessageList } = useState({
  noMore: (state) => state.conversation.noMore,
  currentMessageList: (state) => state.conversation.currentMessageList,
});
</script>

<style lang="scss" scoped>
.viewref {
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
