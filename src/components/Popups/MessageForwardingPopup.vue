<template>
  <el-dialog
    v-model="dialog"
    title="选择要转发的联系人"
    width="600px"
    align-center
    :lock-scroll="false"
    :before-close="handleClose"
  >
    <div class="forward-action">
      <div
        v-for="item in getNonBotList"
        :key="item.toAccount"
        :class="{ 'forward-hover': multipleValue?.toAccount === item.toAccount }"
        @click="onClickItem(item)"
      >
        <img :src="fnSvatar(item)" alt="" />
        <div>{{ chatName(item) }}</div>
      </div>
    </div>
    <template #footer>
      <span>
        <el-button @click="handleCancel()">
          {{ $t("common.cancel") }}
        </el-button>
        <el-button type="primary" @click="handleConfirm()">
          {{ $t("common.confirm") }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { ref } from "vue"

import { getAiAvatarUrl } from "@/ai/utils"
import { useChatStore } from "@/stores/modules/chat"
import { chatName, squareUrl } from "@/utils/chat"

const emit = defineEmits(["confirm"])

const chatStore = useChatStore()
const { getNonBotList } = storeToRefs(chatStore)

const dialog = ref(false)
const multipleValue = ref(null)
const dialogType = ref("")

const onClickItem = (value) => {
  multipleValue.value = value
}

const fnSvatar = (item) => {
  return item.userProfile?.avatar || getAiAvatarUrl(item.conversationID) || squareUrl
}

const openPopup = (type) => {
  dialogType.value = type
  dialog.value = true
}

const setMultipleValue = (value = null) => {
  multipleValue.value = value
}

const handleClose = (done) => {
  setMultipleValue()
  done()
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
