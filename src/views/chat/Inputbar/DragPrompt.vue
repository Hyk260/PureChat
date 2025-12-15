<template>
  <div>
    <div v-for="(item, i) in promptItems" :key="item.id" class="prompt-item">
      <!-- <GripVertical v-if="promptItems.length > 1" class="drag-icon" />
        <ElSelect class="prompt-select" v-model="item.role">
          <ElOption v-for="item in ROLES" :key="item" :label="item" :value="item" />
        </ElSelect> -->
      <div class="flex gap-5">
        <ElButton class="avatar relative size-32 p-0" @click="setShowEmojiPickerFlag(true)">
          <div class="group">
            <span class="text-22"> {{ item.meta.avatar }} </span>
            <ElIcon class="avatar-close-icon" @click.stop="handleClearAvatar(i)">
              <CircleX />
            </ElIcon>
          </div>
          <EmojiMart
            v-if="showEmojiPickerFlag"
            class="emoji-picker"
            @onClose="setShowEmojiPickerFlag(false)"
            @emojiSelected="(emoji) => handleEmojiSelect(emoji, i)"
          />
        </ElButton>
        <ElInput
          ref="inputTitleRef"
          v-model="item.meta.title"
          maxlength="30"
          placeholder="title"
          clearable
          @input="savePromptData"
        />
      </div>
      <div class="prompt-content">
        <ElInput
          v-model="item.prompt[0]!.content"
          :autosize="{ minRows: 2, maxRows: 6 }"
          type="textarea"
          placeholder="prompt"
          @blur="savePromptData"
        />
        <ElButton v-if="false" class="flex-c w-31 h-31" @click="onClose(i)">
          <ElIcon><CircleX /></ElIcon>
        </ElButton>
      </div>
    </div>
    <div v-if="false">
      <ElButton class="w-full" @click="addPrompt">
        <ElIcon><CirclePlus /></ElIcon>
      </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElInput } from "element-plus"
import { CirclePlus, CircleX } from "lucide-vue-next"

import { cloneDeep, isEmpty } from "lodash-es"
import { storeToRefs } from "pinia"

import EmojiMart from "@/components/EmojiMart/index.vue"
import { prompt } from "@/ai/constant"
// import { ROLES } from "@/ai/constant";
import { useState } from "@/hooks/useState"
import { useRobotStore } from "@/stores/modules/robot"
import { nanoid } from "@/utils/uuid"

import type { Prompt } from "@/types/llm"

defineOptions({
  name: "DragPrompt",
})

const MAX_PROMPTS = 1

const promptItems = ref<Prompt[]>([])
const inputTitleRef = useTemplateRef("inputTitleRef")

const robotStore = useRobotStore()

const [showEmojiPickerFlag, setShowEmojiPickerFlag] = useState(false)

const { promptStore, modelProvider } = storeToRefs(robotStore)

function initPromptData() {
  const _promptStore = promptStore.value?.[modelProvider.value] || []
  if (isEmpty(_promptStore)) {
    promptItems.value = cloneDeep(prompt)
    promptItems.value.map((item) => (item.ID = nanoid()))
  } else {
    promptItems.value = cloneDeep(_promptStore)
  }
}

function handleClearAvatar(i: number) {
  promptItems.value[i]!.meta.avatar = ""
  savePromptData()
}

function savePromptData() {
  robotStore.setPromptStore(promptItems.value, modelProvider.value)
  robotStore.setPromptConfig(promptItems.value[0] || null)
}

function handleEmojiSelect(emoji: any, i: number) {
  promptItems.value[i]!.meta.avatar = emoji.native
  savePromptData()
}

function onClose(i: number) {
  promptItems.value.splice(i, 1)
  robotStore.setPromptConfig(null)
  robotStore.setPromptStore([], modelProvider.value)
}

function addPrompt() {
  if (promptItems.value.length >= MAX_PROMPTS) return
  const newPrompt = cloneDeep(prompt)
  newPrompt.map((t) => (t.id = nanoid()))
  promptItems.value = newPrompt
}

function promptTitleFocus() {
  nextTick(() => {
    inputTitleRef.value?.[0]?.focus()
  })
}

onMounted(() => {
  initPromptData()
})

defineExpose({ promptTitleFocus })
</script>

<style lang="scss" scoped>
.prompt-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  .avatar {
    min-width: 32px;
  }
  .prompt-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .prompt-select {
    width: 125px;
  }
  .drag-icon {
    cursor: grab;
  }
  .group {
    width: 100%;
    height: 100%;
    &:hover .avatar-close-icon {
      opacity: 1;
    }
  }
  .avatar-close-icon {
    position: absolute;
    z-index: 10;
    top: -0.5rem;
    right: -0.5rem;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .emoji-picker {
    position: absolute;
    z-index: 20;
    top: 2.3rem;
    left: 0;
  }
}
</style>
