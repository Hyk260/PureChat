<template>
  <div class="toolbar">
    <!-- 表情包 -->
    <el-tooltip :content="$t('chat.emoji')" placement="top">
      <el-button v-show="!isFullscreenInputActive && !isAssistant" @click="sendEmojiClick">
        <SvgIcon local-icon="iconxiaolian" />
      </el-button>
    </el-tooltip>
    <!-- 选模型 -->
    <el-tooltip :content="$t('button.select_model')" placement="top">
      <el-button v-show="isAssistant" @click="selectModel">
        <SvgIcon local-icon="model" />
      </el-button>
    </el-tooltip>
    <!-- 图片 -->
    <el-tooltip :content="$t('chat.picture')" placement="top">
      <el-button v-show="!isAssistant" @click="sendImageClick">
        <SvgIcon local-icon="icontupian" />
      </el-button>
    </el-tooltip>
    <!-- 文件 -->
    <el-tooltip :content="$t('chat.file')" placement="top">
      <el-button v-show="!isAssistant" @click="sendFileClick">
        <SvgIcon local-icon="iconwenjianjia" />
      </el-button>
    </el-tooltip>
    <!-- 截图 -->
    <el-tooltip v-if="IS_ELECTRON" :content="$t('chat.screenshot')" placement="top">
      <el-button v-show="!isAssistant" @click="clickCscreenshot">
        <SvgIcon local-icon="iconjietu" />
      </el-button>
    </el-tooltip>
    <!-- 模型配置 -->
    <el-tooltip :content="$t('chat.configuration')" placement="top">
      <el-button v-show="isAssistant" @click="openRobotBox">
        <SvgIcon local-icon="robot" />
      </el-button>
    </el-tooltip>
    <!-- 附件 -->
    <el-tooltip v-if="IS_ELECTRON" :content="$t('chat.upload_document')" placement="top">
      <el-button v-show="isAssistant" @click="sendAnnexClick">
        <SvgIcon local-icon="paperClip" />
      </el-button>
    </el-tooltip>
    <!-- 联网 -->
    <el-tooltip v-if="IS_LOCAL_MODE" :content="$t('chat.web_search')" placement="top">
      <el-button
        v-show="isWebSearchModel"
        :style="{
          color: enableWebSearch ? 'var(--el-button-hover-text-color)' : '',
        }"
        @click="onEnableWebSearch"
      >
        <SvgIcon local-icon="internet" />
      </el-button>
    </el-tooltip>
    <!-- 清空消息 -->
    <el-tooltip content="清空消息" placement="top">
      <div>
        <el-popover ref="popoverRef" placement="top" trigger="click" width="250">
          <div class="flex-c gap-5 mb-10">
            <el-icon class="text-[#F56C6C]"><Warning /></el-icon>
            <p>确定要清除当前会话所有消息吗?</p>
          </div>
          <div class="flex">
            <el-button class="ml-auto" size="small" @click="handleCancel">
              {{ $t("common.cancel") }}
            </el-button>
            <el-button size="small" type="primary" @click="cleanTopicShortcut">
              {{ $t("common.confirm") }}
            </el-button>
          </div>
          <template #reference>
            <el-button>
              <el-icon class="cursor-pointer"><Delete /></el-icon>
            </el-button>
          </template>
        </el-popover>
      </div>
    </el-tooltip>
    <!-- 插件 -->
    <el-tooltip v-if="false" content="选择插件" placement="top">
      <el-button @click="openPluginBox">
        <SvgIcon local-icon="plugin" />
      </el-button>
    </el-tooltip>
    <!-- 滚动到底部 -->
    <el-tooltip :content="$t('chat.scrollToTheBottom')" placement="top">
      <el-button v-show="showBottomBtn" class="chat-top animate-chat-slide-in" @click="scrollToBottomBtn">
        <el-icon class="svg-left"><DArrowLeft /></el-icon>
      </el-button>
    </el-tooltip>
    <!-- 自定义消息 -->
    <el-button v-if="false" @click="customMessage">
      <el-icon><Sunny /></el-icon>
    </el-button>
    <!-- 全屏 -->
    <el-tooltip :content="isFullscreenInputActive ? $t('chat.recover') : $t('chat.launch')" placement="top">
      <el-button class="!ml-auto" @click="toggleFullScreenInput">
        <SvgIcon :local-icon="isFullscreenInputActive ? 'narrow' : 'enlarge'" />
      </el-button>
    </el-tooltip>
    <RobotModel />
    <RobotPlugin />
    <RobotOptions />
    <EmojiPicker v-show="!isAssistant && flag" @on-close="setFlag(false)" />
  </div>
</template>

<script setup lang="ts">
import { DArrowLeft, Delete, Sunny, Warning } from "@element-plus/icons-vue"

import { audioExts, documentExts, imageExts, textExts, videoExts } from "@shared/config"
import { storeToRefs } from "pinia"

import { useState } from "@/hooks/useState"
import { createCustomMessage } from "@/service/im-sdk-api"
import WebSearchService from "@/service/WebSearchService"
import { useChatStore, useRobotStore, useWebSearchStore } from "@/stores"
import { createFileInput } from "@/utils/common"
import { showConfirmationBox } from "@/utils/message"
import emitter from "@/utils/mitt-bus"

import EmojiPicker from "./EmojiPicker.vue"
import RobotModel from "./RobotModel.vue"
import RobotOptions from "./RobotOptions.vue"
import RobotPlugin from "./RobotPlugin.vue"

defineOptions({
  name: "Inputbar",
})

const popoverRef = ref(null)

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

function sendImage(files) {
  if (!files) return
  emitter.emit("handleToolbar", {
    key: "setPicture",
    data: { files: files[0] },
  })
}

function sendFile(files) {
  if (!files) return
  emitter.emit("handleToolbar", {
    key: "setParseFile",
    data: { files: files[0] },
  })
}

const scrollToBottomBtn = () => {
  emitter.emit("updateScroll")
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
  .svg-icon {
    cursor: pointer;
  }
  .chat-top {
    .svg-left {
      transform: rotate(-90deg);
    }

    .el-icon {
      cursor: pointer;
    }
  }
}
</style>
