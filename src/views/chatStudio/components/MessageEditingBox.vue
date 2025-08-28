<template>
  <div class="edit" :class="fnClass">
    <el-input v-model="input" resize="none" :autosize="{ minRows: 1, maxRows: 20 }" class="min-w-500" type="textarea" />
    <div class="flex justify-end">
      <el-button size="small" @click="handleCancel">
        {{ $t("common.cancel") }}
      </el-button>
      <el-button size="small" type="primary" @click="handleConfirm(input)">
        {{ $t("common.confirm") }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType } from "vue"

import { DB_Message } from "@/database/schemas/message"
import { modifyMessage } from "@/service/im-sdk-api"
import { useChatStore } from "@/stores"

const props = defineProps({
  item: {
    type: Object as PropType<DB_Message>,
    default: () => ({}),
  },
})

const chatStore = useChatStore()

const input = ref(props.item.payload.text)

const fnClass = computed(() => {
  return [props.item.flow === "in" ? "mr-44" : "ml-44"]
})

function handleCancel() {
  chatStore.setMsgEdit(null)
}

function handleConfirm(val: string) {
  const params = {
    ...props.item,
    payload: {
      text: val,
    },
  }

  if (props.item.type === "TIMTextElem") modifyMessage(params)
  handleCancel()
}
</script>

<style lang="scss" scoped>
.edit {
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  max-width: 100%;
  width: 100%;
  padding-block: 8px 12px;
  padding-inline: 12px;
  border: 1px solid #e3e3e3;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: background-color 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  :deep(.el-textarea__inner) {
    border: none;
    box-shadow: none;
  }
}
</style>
