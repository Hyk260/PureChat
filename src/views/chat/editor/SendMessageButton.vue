<template>
  <div class="send-button">
    <span class="tip">{{ placeholderMap[getOperatingSystem()] }}</span>
    <ElButton v-if="false" :disabled="disabled" circle @click="handleTranslate">
      <div v-if="translateDing" class="iconify-icon svg-spinners"></div>
      <Languages v-else :size="15" />
    </ElButton>
    <ElButton v-if="false" :disabled="disabled" circle @click="handlePolish">
      <div v-if="polishDing" class="iconify-icon svg-spinners"></div>
      <WandSparkles :size="15" />
    </ElButton>
    <ElButton v-if="true && IS_DEV && IS_LOCAL_MODE" @click="handleAddTopic">
      <MessageCirclePlus :size="15" />
    </ElButton>
    <ElButton :loading="isSending" :class="{ 'pointer-events-none': disabled }" @click="onSend">
      <template #loading>
        <div class="iconify-icon svg-spinners mr-8"></div>
      </template>
      <span>
        <Send v-if="false" :size="15" />
        {{ $t("chat.send") }}
      </span>
    </ElButton>
    <ElButton v-if="isSending && IS_DEV" class="!ml-0" @click="onPause">
      <CirclePause class="mr-8" :size="14" />
      <span> {{ $t("chat.pause") }} </span>
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { CirclePause, Languages, Send, WandSparkles, MessageCirclePlus } from "lucide-vue-next"
import { useMessageOperations } from "@/hooks/useMessageOperations"
import { useChatStore, useTopicStore } from "@/stores"
import { getOperatingSystem } from "@/utils/common"

import { placeholderMap } from "@/utils/wangEditor/editor-config"

type Props = {
  disabled?: boolean
}

interface Emits {
  (e: "sendMessage", value: MouseEvent): void
}

const translateDing = ref(false)
const polishDing = ref(false)

withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<Emits>()

const topicStore = useTopicStore()
const chatStore = useChatStore()

const { pauseMessages } = useMessageOperations()

const { isSending } = storeToRefs(chatStore)

const handleAddTopic = () => {
  topicStore.addTopic("默认话题")
}

const onSend = (e: MouseEvent) => {
  emit("sendMessage", e)
}

const onPause = async () => {
  pauseMessages()
}

const handleTranslate = () => {
  translateDing.value = true
  setTimeout(() => {
    translateDing.value = false
  }, 2000)
}

const handlePolish = () => {}
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
  :deep(.el-button) {
    margin-left: 0;
  }

  .tip {
    font-size: 12px;
    color: rgb(153, 153, 153);
  }
}
</style>
