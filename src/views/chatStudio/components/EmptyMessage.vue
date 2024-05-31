<template>
  <div :class="[classNmae]">
    <el-empty :description="$t('el.table.emptyText')" :image-size="150" />
    <div
      v-if="classNmae == 'no-msg' && activetab == 'whole'"
      class="flex justify-center launch"
      @click="launch"
    >
      发起聊天
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useState } from "@/utils/hooks/useMapper";
const props = defineProps({
  classNmae: {
    type: String,
    default: "",
  },
});
const { activetab } = useState({
  activetab: (state) => state.conversation.activetab,
});
const { commit } = useStore();
function launch() {
  commit("TAGGLE_OUE_SIDE", "notebook");
}
</script>

<style lang="scss" scoped>
.no-msg {
  color: rgba(0, 0, 0, 0.45);
  margin-top: 50%;
}

.empty {
  height: 100%;
  :deep(.el-empty) {
    height: 100%;
  }
}
.launch {
  cursor: pointer;
  color: #29d;
  font-size: 13px;
}
</style>
