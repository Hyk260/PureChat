<template>
  <div class="send-button">
    <span class="tip">{{ placeholderMap[getOperatingSystem()] }}</span>
    <el-button :loading="isSending" :class="{ 'pointer-events-none': disabled }" @click="onSend">
      <template #loading>
        <div class="iconify-icon svg-spinners mr-8"></div>
      </template>
      <span> {{ $t("chat.sending") }} </span>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from "@/stores"
import { getOperatingSystem } from "@/utils/common"

import { placeholderMap } from "../utils/configure"

type Props = {
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits(["sendMessage"])

const chatStore = useChatStore()

const { isSending } = storeToRefs(chatStore)

const onSend = (e: MouseEvent) => {
  emit("sendMessage", e)
}
</script>

<style lang="scss" scoped>
.send-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 10px 10px;
  gap: 8px;
  user-select: none;

  .tip {
    font-size: 12px;
    color: rgb(153, 153, 153);
  }
}
</style>
