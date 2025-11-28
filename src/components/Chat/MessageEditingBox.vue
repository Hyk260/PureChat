<template>
  <div class="edit" :class="containerClass">
    <ElInput
      ref="textInputRef"
      v-model="inputText"
      resize="none"
      :autosize="{ minRows: 1, maxRows: 20 }"
      class="min-w-500"
      type="textarea"
      @keydown="handleKeydown"
    />
    <div class="flex justify-end">
      <ElButton size="small" @click="handleCancel">
        {{ $t("common.cancel") }}
      </ElButton>
      <ElButton size="small" :disabled="isConfirmDisabled" type="primary" @click="handleConfirm">
        {{ $t("common.confirm") }}
      </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElInput } from "element-plus"
import { DB_Message } from "@/database/schemas/message"
import { modifyMessage } from "@/service/im-sdk-api"
import { useChatStore } from "@/stores"
// import { scrollToMessage } from "@/utils/chat"

defineOptions({
  name: "MessageEditingBox",
})

interface Props {
  item: DB_Message
}

const props = defineProps<Props>()

const chatStore = useChatStore()

const textInputRef = useTemplateRef("textInputRef")
const inputText = ref(props.item.payload?.text || "")

const containerClass = computed(() => {
  return props.item.flow === "in" ? "mr-44" : "ml-44"
})

const isConfirmDisabled = computed(() => {
  return !inputText.value.trim() || inputText.value === props.item.payload?.text
})

function handleCancel() {
  chatStore.setMsgEdit(null)
  // scrollToMessage(props.item.ID, 10)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.ctrlKey && event.key === "Enter") {
    handleConfirm()
  } else if (event.key === "Escape") {
    handleCancel()
  }
}

function handleConfirm() {
  if (isConfirmDisabled.value) return

  const params = {
    ...props.item,
    payload: {
      ...props.item.payload,
      text: inputText.value.trim(),
    },
  }

  if (props.item.type === "TIMTextElem") modifyMessage(params)
  handleCancel()
}

onMounted(() => {
  nextTick(() => {
    if (textInputRef.value) {
      textInputRef.value.focus()
      // 将光标移动到文本末尾
      const textarea = textInputRef.value.$el.querySelector("textarea")
      if (textarea) {
        textarea.setSelectionRange(textarea.value.length, textarea.value.length)
      }
    }
  })
})
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
  // :deep(.el-textarea__inner) {
  //   border: none;
  //   box-shadow: none;
  // }
}
</style>
