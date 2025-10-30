<template>
  <ElDialog v-model="dialog" title="添加成员" width="600px" align-center>
    <div class="forward-action">
      <div
        v-for="item in chatStore.getNonBotC2CList"
        :key="item.toAccount"
        :class="{ 'forward-hover': memberValue?.toAccount === item.toAccount }"
        @click="onClickItem(item)"
      >
        <img :src="item.userProfile?.avatar || getAiAvatarUrl(item.conversationID) || squareUrl" alt="" />
        <div>{{ chatName(item) }}</div>
      </div>
    </div>
    <template #footer>
      <span>
        <ElButton @click="close"> {{ $t("common.cancel") }} </ElButton>
        <ElButton type="primary" @click="define"> {{ $t("common.confirm") }} </ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { getAiAvatarUrl } from "@/ai/getAiAvatarUrl"
import { useState } from "@/hooks/useState"
import { useChatStore } from "@/stores/index"
import { chatName, squareUrl } from "@/utils/chat/index"

defineOptions({
  name: "AddMemberPopup",
})

const memberValue = ref(null)
const emits = defineEmits(["define"])
const [dialog, setDialog] = useState(false)
const chatStore = useChatStore()

const onClickItem = (value) => {
  memberValue.value = value
}
const openDialog = () => {
  setDialog(true)
}
const close = () => {
  setDialog(false)
}
const define = () => {
  emits("define", memberValue.value)
  setDialog(false)
}

defineExpose({ openDialog })
</script>
