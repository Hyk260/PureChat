<template>
  <div :class="[className]">
    <el-empty :description="$t('common.emptyText')" :image-size="150" />
    <div
      v-if="className == 'no-msg' && activeTab == 'whole'"
      class="flex-c launch"
      @click="launch"
    >
      发起会话
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useState } from "@/utils/hooks/useMapper";

const props = defineProps({
  className: {
    type: String,
    default: "",
  },
});

const { activeTab } = useState({
  activeTab: (state) => state.conversation.activeTab,
});

const { commit } = useStore();

function launch() {
  commit("taggleOueSide", "notebook");
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
