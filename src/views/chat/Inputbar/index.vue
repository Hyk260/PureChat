<template>
  <div class="toolbar">
    <!-- 表情包 -->
    <ElTooltip
      v-if="!isFullscreenInputActive && !isAssistant"
      :enterable="false"
      :showAfter="500"
      :content="$t('chat.emoji')"
      placement="top"
      :showArrow="false"
      :offset="2"
      transition="slide-fade"
    >
      <ElButton @click="sendEmojiClick">
        <Smile :size="16" />
      </ElButton>
    </ElTooltip>
    <!-- 选模型 -->
    <ElTooltip
      v-if="isAssistant"
      :enterable="false"
      :showAfter="500"
      :content="$t('button.select_model')"
      placement="top"
      :showArrow="false"
      :offset="2"
      transition="slide-fade"
    >
      <ElButton @click="selectModel">
        <Brain :size="16" />
      </ElButton>
    </ElTooltip>
    <!-- 图片 -->
    <ElTooltip
      v-if="!isAssistant"
      :enterable="false"
      :showAfter="500"
      :content="$t('chat.picture')"
      placement="top"
      :showArrow="false"
      :offset="2"
      transition="slide-fade"
    >
      <ElButton @click="sendImageClick">
        <!-- <Image :size="16" /> -->
        <SvgIcon localIcon="image" />
      </ElButton>
    </ElTooltip>
    <!-- 文件 -->
    <ElTooltip
      v-if="!isAssistant"
      :enterable="false"
      :showAfter="500"
      :content="$t('chat.file')"
      placement="top"
      :showArrow="false"
      :offset="2"
      transition="slide-fade"
    >
      <ElButton @click="sendFileClick">
        <!-- <FolderOpen :size="16" /> -->
        <!-- <FileUp :size="16" /> -->
        <!-- <FolderClosed :size="16" /> -->
        <SvgIcon localIcon="folder" />
      </ElButton>
    </ElTooltip>
    <!-- 截图 -->
    <ElTooltip
      v-if="IS_ELECTRON"
      :enterable="false"
      :showAfter="500"
      :content="$t('chat.screenshot')"
      placement="top"
      :showArrow="false"
      :offset="2"
      transition="slide-fade"
    >
      <ElButton v-show="!isAssistant" @click="clickCscreenshot">
        <Scissors class="rotate-270" :size="16" />
      </ElButton>
    </ElTooltip>
    <!-- 模型配置 -->
    <ElTooltip
      v-if="isAssistant"
      :enterable="false"
      :showAfter="500"
      :content="$t('chat.configuration')"
      placement="top"
      :showArrow="false"
      :offset="2"
      transition="slide-fade"
    >
      <ElButton @click="openRobotBox">
        <SlidersHorizontal :size="16" />
      </ElButton>
    </ElTooltip>
    <!-- 附件 -->
    <ElTooltip
      v-if="IS_ELECTRON"
      :enterable="false"
      :showAfter="500"
      :content="$t('chat.upload_document')"
      placement="top"
      :showArrow="false"
      :offset="2"
      transition="slide-fade"
    >
      <ElButton v-show="isAssistant" @click="sendAnnexClick">
        <Paperclip :size="16" />
      </ElButton>
    </ElTooltip>
    <!-- 联网 -->
    <ElTooltip
      v-if="IS_LOCAL_MODE"
      :enterable="false"
      :showAfter="500"
      :content="$t('chat.web_search')"
      placement="top"
      :showArrow="false"
      :offset="2"
      transition="slide-fade"
    >
      <ElButton
        v-show="isWebSearchModel"
        :style="{
          color: enableWebSearch ? 'var(--el-button-hover-text-color)' : '',
        }"
        @click="onEnableWebSearch"
      >
        <Globe :size="16" />
      </ElButton>
    </ElTooltip>
    <!-- 清空消息 -->
    <ElTooltip
      content="清空消息"
      placement="top"
      :showArrow="false"
      :enterable="false"
      :showAfter="500"
      :offset="2"
      transition="slide-fade"
    >
      <div>
        <ElPopover ref="popoverRef" placement="top" trigger="click" width="250">
          <div class="flex-c gap-5 mb-10">
            <CircleAlert :size="15" color="#F56C6C" />
            <p>确定要清除当前会话所有消息吗?</p>
          </div>
          <div class="flex">
            <ElButton class="ml-auto" size="small" @click="handleCancel">
              {{ $t("common.cancel") }}
            </ElButton>
            <ElButton size="small" type="primary" @click="cleanTopicShortcut">
              {{ $t("common.confirm") }}
            </ElButton>
          </div>
          <template #reference>
            <ElButton>
              <BrushCleaning :size="16" />
            </ElButton>
          </template>
        </ElPopover>
      </div>
    </ElTooltip>
    <!-- 插件 -->
    <ElTooltip v-if="false" content="选择插件" placement="top">
      <ElButton @click="openPluginBox">
        <Blocks :size="16" />
      </ElButton>
    </ElTooltip>
    <!-- 自定义消息 -->
    <ElTooltip v-if="false" content="BugPlay" placement="top" :showArrow="false" :offset="2" transition="slide-fade">
      <ElButton @click="customMessage">
        <BugPlay :size="16" />
      </ElButton>
    </ElTooltip>
    <!-- 滚动到底部 -->
    <ElTooltip
      v-if="showBottomBtn"
      :enterable="false"
      :showAfter="500"
      :content="$t('chat.scrollToTheBottom')"
      placement="top"
      :showArrow="false"
      :offset="2"
      transition="slide-fade"
    >
      <ElButton class="animate-chat-slide-in" @click="scrollToBottomBtn">
        <ChevronsDown :size="18" />
      </ElButton>
    </ElTooltip>
    <!-- 全屏 -->
    <ElTooltip
      :enterable="false"
      disabled
      :showAfter="500"
      :content="isFullscreenInputActive ? $t('chat.recover') : $t('chat.launch')"
      placement="top"
      :showArrow="false"
      :offset="2"
      transition="slide-fade"
    >
      <ElButton class="!ml-auto" @click="toggleFullScreenInput">
        <component :is="isFullscreenInputActive ? Minimize2 : Maximize2" :size="16" />
      </ElButton>
    </ElTooltip>
    <RobotModel />
    <RobotPlugin />
    <RobotOptions />
    <EmojiPicker v-if="!isAssistant && flag" @on-close="setFlag(false)" />
  </div>
</template>

<script setup lang="ts">
import {
  Blocks,
  Brain,
  BrushCleaning,
  BugPlay,
  ChevronsDown,
  // FileUp,
  // FolderOpen,
  // FolderClosed,
  CircleAlert,
  Globe,
  // ImageUp,
  // Image,
  Maximize2,
  Minimize2,
  Paperclip,
  Scissors,
  SlidersHorizontal,
  Smile,
} from "lucide-vue-next"

import { audioExts, documentExts, imageExts, textExts, videoExts } from "@shared/config"
import { storeToRefs } from "pinia"

import { useState } from "@/hooks/useState"
import { createCustomMessage } from "@/service/im-sdk-api"
import WebSearchService from "@/service/WebSearchService"
import { useChatStore, useRobotStore, useWebSearchStore } from "@/stores"
import { createFileInput } from "@/utils/common"
import { showConfirmationBox } from "@/utils/message"
import emitter, { emitUpdateScrollImmediate } from "@/utils/mitt-bus"

import EmojiPicker from "./EmojiPicker.vue"
import RobotModel from "./RobotModel.vue"
import RobotOptions from "./RobotOptions.vue"
import RobotPlugin from "./RobotPlugin.vue"

defineOptions({
  name: "Inputbar",
})

const popoverRef = useTemplateRef("popoverRef")

const supportExts = [
  ...textExts,
  // ...documentExts
]
const fileExts = [...textExts, ...documentExts, ...imageExts, ...audioExts, ...videoExts]

const [flag, setFlag] = useState(false)
const [showBottomBtn, setShowBottomBtn] = useState(false)

const robotStore = useRobotStore()
const chatStore = useChatStore()
const webSearchStore = useWebSearchStore()

const { toAccount, isAssistant, currentType, isFullscreenInputActive } = storeToRefs(chatStore)
const { modelProvider, enableWebSearch, isWebSearchModel } = storeToRefs(robotStore)

function handleCancel() {
  popoverRef.value?.hide()
}

const cleanTopicShortcut = () => {
  handleCancel()
  chatStore.deleteHistoryMessage()
}

const onEnableWebSearch = async () => {
  const isWebSearchEnabled = WebSearchService.isWebSearchEnabled()
  if (!isWebSearchEnabled) {
    const result = await showConfirmationBox({
      tip: "开启网络搜索",
      message: "需要先在设置中检查网络搜索连通性",
      iconType: "warning",
      confirmText: "去设置",
      // center: true,
    })
    if (result === "cancel") return
    emitter.emit("openSetup", { flag: true, id: "webSearch" })
  } else {
    webSearchStore.updateCheckProviders(modelProvider.value)
  }
}

const sendEmojiClick = () => {
  setFlag(true)
}
function openRobotBox() {
  emitter.emit("onRobotBox")
}
function openPluginBox() {
  emitter.emit("onPluginBox")
}
function selectModel() {
  emitter.emit("openModeList", true)
}

const sendImageClick = () => {
  createFileInput({
    accept: imageExts,
    onChange: sendImage,
  })
}

const sendAnnexClick = () => {
  createFileInput({
    accept: supportExts,
    onChange: sendFile,
  })
}

const sendFileClick = () => {
  createFileInput({
    accept: fileExts,
    onChange: sendFile,
  })
}

const clickCscreenshot = () => {}

const toggleFullScreenInput = () => {
  chatStore.$patch((state) => {
    state.isFullscreenInputActive = !state.isFullscreenInputActive
  })
}

function customMessage() {
  const message = createCustomMessage({
    to: toAccount.value,
    type: currentType.value,
    customType: "loading",
  })
  chatStore.sendSessionMessage({ message })
}

function sendImage(files: FileList) {
  if (!files) return
  emitter.emit("handleToolbar", {
    key: "setPicture",
    data: { files: files[0] },
  })
}

function sendFile(files: FileList) {
  if (!files) return
  emitter.emit("handleToolbar", {
    key: "setParseFile",
    data: { files: files[0] },
  })
}

const scrollToBottomBtn = () => {
  emitUpdateScrollImmediate()
}

onMounted(() => {
  emitter.on("handleToBottom", (state) => {
    setShowBottomBtn(!state)
  })
})

onUnmounted(() => {
  emitter.off("handleToBottom")
})
</script>

<style lang="scss" scoped>
.toolbar {
  height: 40px;
  padding: 0 5px;
  display: flex;
  position: relative;

  :deep(.el-button) {
    font-size: 16px;
    width: 40px;
    height: 40px;
    padding: 4px;
    border-radius: 50%;
    border: none;
    background-color: unset;
    margin-left: 0;
    &:hover {
      color: var(--el-color-info-dark-3);
    }
  }
}
</style>
