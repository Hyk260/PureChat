<template>
  <ElDialog
    v-model="dialog"
    title="选择要转发的联系人"
    width="600px"
    appendToBody
    alignCenter
    :lockScroll="false"
    @close="handleClose"
  >
    <div class="forward-action">
      <div
        v-for="item in getNonBotList"
        :key="item.conversationID"
        :class="{ 'forward-hover': multipleValue?.conversationID === item.conversationID }"
        @click="onClickItem(item)"
      >
        <img :src="fnSvatar(item)" alt="" />
        <div>{{ chatName(item) }}</div>
      </div>
    </div>
    <template #footer>
      <span>
        <ElButton @click="handleCancel">
          {{ $t("common.cancel") }}
        </ElButton>
        <ElButton type="primary" @click="handleConfirm">
          {{ $t("common.confirm") }}
        </ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"

import { getAiAvatarUrl } from "@/ai/getAiAvatarUrl"
import { useChatStore } from "@/stores/modules/chat"
import { chatName } from "@pure/utils"
import { squareUrl } from "@pure/const"

import type { DB_Session } from "@pure/database/schemas"

const emit = defineEmits(["confirm"])

const chatStore = useChatStore()
const { getNonBotList } = storeToRefs(chatStore)

const dialog = ref(false)
const dialogType = ref("")
const multipleValue = ref<DB_Session | null>(null)

const onClickItem = (value: DB_Session) => {
  multipleValue.value = value
}

const fnSvatar = (item: DB_Session) => {
  return item.userProfile?.avatar || getAiAvatarUrl(item.conversationID) || squareUrl
}

const openPopup = (type: string) => {
  dialogType.value = type
  dialog.value = true
}

const setMultipleValue = (value: DB_Session | null = null) => {
  multipleValue.value = value
}

const handleClose = () => {
  setMultipleValue()
  dialog.value = false
}

const handleCancel = () => {
  dialog.value = false
  setMultipleValue()
}

const handleConfirm = () => {
  emit("confirm", { value: multipleValue.value, type: dialogType.value })
  dialog.value = false
  setMultipleValue()
}

defineExpose({
  openPopup,
})
</script>
