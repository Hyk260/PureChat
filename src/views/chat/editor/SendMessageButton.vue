<template>
  <div class="send-button">
    <span class="tip">{{ placeholderMap[getOperatingSystem()] }}</span>
    <el-button :loading="isSending" :class="{ 'pointer-events-none': disabled }" @click="onSend">
      <template #loading>
        <div class="iconify-icon svg-spinners mr-8"></div>
      </template>
      <span> {{ $t("chat.send") }} </span>
    </el-button>
    <el-button v-if="isSending && isDev" class="!ml-0" @click="onPause">
      <CirclePause class="mr-8" :size="14" />
      <span> {{ $t("chat.pause") }} </span>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { CirclePause } from "lucide-vue-next"

import { useMessageOperations } from "@/hooks/useMessageOperations"
import { useChatStore } from "@/stores"
import { getOperatingSystem } from "@/utils/common"

import { placeholderMap } from "../utils/configure"

const { DEV: isDev } = import.meta.env

type Props = {
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits(["sendMessage"])

const chatStore = useChatStore()
const { pauseMessages } = useMessageOperations()

const { isSending } = storeToRefs(chatStore)

const onSend = (e: MouseEvent) => {
  emit("sendMessage", e)
}

const onPause = async () => {
  pauseMessages()
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
