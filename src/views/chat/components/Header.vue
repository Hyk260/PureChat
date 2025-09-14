<template>
  <header v-if="currentConversation" class="message-info-view-header flex-bc">
    <div class="message-info-views">
      <p v-if="currentType">
        <span v-if="chatType('C2C')" class="single" @click="openUser">
          <span class="nick">{{ chatNick("C2C", currentConversation) }}</span>
          <CustomLabel v-if="isAssistant" :model="robotStore.model" :user-i-d="currentConversation?.conversationID" />
          <!-- ai-prompt -->
          <div v-if="isShowPromptTitle" class="cursor-pointer ml-5 ai-prompt-title" @click="openPrompt">
            {{ getPromptTitle }}
          </div>
          <!-- ai-tools -->
          <template v-if="isAssistant && toolsStore.botTools && isShowBotTools">
            <div v-for="item in toolsStore.botTools" :key="item.id" class="ml-5 ai-prompt-title">
              <svg-icon class="function-call" local-icon="functionCall" />
              <span>{{ item.meta.title }}</span>
            </div>
          </template>
          <el-tooltip
            v-if="isAssistant"
            :show-arrow="false"
            :content="`助手将只记住最后${robotStore.getBotMessageCount}条消息`"
            placement="bottom"
          >
            <div v-if="isAssistant" class="history ai-prompt-title">
              <History :size="16" />
              <span>{{ robotStore.getBotMessageCount }}</span>
            </div>
          </el-tooltip>
        </span>
        <span v-else-if="chatType('GROUP')" class="group" @click="openSetup">
          <span class="nick"> {{ chatNick("GROUP", currentConversation) }}</span>
          <CustomLabel :item="currentConversation" />
        </span>
        <span v-else-if="chatType('@TIM#SYSTEM')" class="system"> 系统通知 </span>
      </p>
    </div>
    <div class="flex gap-10">
      <!-- <div class="message-info-add" v-show="currentConversation.type === 'GROUP' && false" title="添加成员">
        <svg-icon local-icon="tianjia" class="icon-hover" />
      </div> -->
      <div class="share" title="分享对话" @click="openShare">
        <Share2 class="cursor-pointer icon-hover" :size="17" />
      </div>
      <div v-show="isGroupChat" class="setup" title="群详情" @click="openSetup">
        <Ellipsis class="cursor-pointer icon-hover" :size="17" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Ellipsis, History, Share2 } from "lucide-vue-next"

import { storeToRefs } from "pinia"

import CustomLabel from "@/components/Chat/CustomLabel.vue"
import { useChatStore, useRobotStore, useToolsStore } from "@/stores"
import emitter from "@/utils/mitt-bus"

const chatStore = useChatStore()
const robotStore = useRobotStore()
const toolsStore = useToolsStore()

const { isAssistant, isGroupChat, currentType, currentConversation } = storeToRefs(chatStore)
const { getPromptTitle, isShowBotTools, isShowPromptTitle } = storeToRefs(robotStore)

const chatType = (type) => {
  return currentType.value === type
}

const chatNick = (type, chat) => {
  if (type === "C2C") {
    return chat.userProfile?.nick || chat.userProfile?.userID || chat?.remark || ""
  } else if (type === "GROUP") {
    const {
      groupProfile: { name, groupID, memberCount },
    } = chat
    const count = memberCount ? `(${memberCount})` : ""
    return `${name || groupID} ${count}`
  }
}

const openPrompt = () => {
  emitter.emit("onRobotBox", { promptFocus: true })
}

const openShare = () => {
  chatStore.toggleMultiSelectMode(true)
}

const openSetup = () => {
  emitter.emit("handleGroupDrawer", true)
}

const openUser = () => {}
</script>

<style lang="scss" scoped>
.message-info-view-header {
  height: 60px;
  min-height: 60px;
  padding: 0 16px;
  width: 100%;
  position: relative;
  z-index: 2;
  background: var(--color-body-bg);
  border-bottom: 1px solid var(--color-border-default);
  .message-info-views {
    .group {
      cursor: pointer;
    }
    .single,
    .group {
      max-width: 500px;
      display: flex;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .nick {
        margin-right: 5px;
      }
    }
  }
  .ai-prompt-title {
    white-space: nowrap;
    background: #fffbe6;
    border: 0.64px solid rgb(255 209 60);
    color: #faad14;
    border-radius: 2px;
    font-size: 12px;
    padding: 0 5px;
    display: inline-block;
    height: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .history {
    margin-left: 5px;
    // border: 0.64px solid rgb(145, 213, 255);
  }
}
</style>
