<template>
  <header v-if="currentConversation" class="message-header">
    <div class="message-info">
      <p v-if="currentType">
        <!-- 单聊 -->
        <span v-if="isC2C" class="chat-type single" @click="openUser">
          <span class="nick">{{ nickName }}</span>
          <CustomLabel v-if="isAssistant" :model="robotStore.model" :user-i-d="currentConversation?.conversationID" />
          <!-- ai-prompt -->
          <div v-if="isShowPromptTitle" class="cursor-pointer ml-5 ai-prompt-title" @click="openPrompt">
            {{ getPromptTitle }}
          </div>
          <!-- ai-tools -->
          <!-- <template v-if="isAssistant && botTools && isShowBotTools">
            <div v-for="item in botTools" :key="item.id" class="ml-5 ai-prompt-title">
              <ToyBrick class="function-call" />
              <span>{{ item.meta.title }}</span>
            </div>
          </template> -->
          <el-tooltip
            v-if="isAssistant"
            :show-arrow="false"
            :content="`助手将只记住最后${botMessageCount}条消息`"
            placement="bottom"
          >
            <div v-if="isAssistant" class="history ai-prompt-title">
              <History :size="16" />
              <span>{{ botMessageCount }}</span>
            </div>
          </el-tooltip>
        </span>
        <!-- 群聊 -->
        <span v-else-if="isGroup" class="chat-type group" @click="openSetup">
          <span class="nickname"> {{ groupName }} </span>
          <CustomLabel :item="currentConversation" />
        </span>
        <!-- 系统通知 -->
        <span v-else-if="isSystem" class="chat-type system"> 系统通知 </span>
      </p>
    </div>
    <div class="action-buttons flex gap-10">
      <!-- <div class="message-info-add" v-show="currentConversation.type === 'GROUP' && false" title="添加成员">
        <SvgIcon local-icon="tianjia" class="icon-hover" />
      </div> -->
      <div v-if="isC2C || isGroupChat" class="action-btn share" title="分享对话" @click="openShare">
        <Share2 class="cursor-pointer icon-hover" :size="17" />
      </div>
      <div v-if="isGroupChat" class="action-btn setup" title="群详情" @click="openSetup">
        <Ellipsis class="cursor-pointer icon-hover" :size="17" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Ellipsis, History, Share2 } from "lucide-vue-next"

import { storeToRefs } from "pinia"

import CustomLabel from "@/components/Chat/CustomLabel.vue"
import { useChatStore, useRobotStore } from "@/stores"
import emitter from "@/utils/mitt-bus"

defineOptions({
  name: "ChatHeader",
})

const chatStore = useChatStore()
const robotStore = useRobotStore()

const { isAssistant, isGroupChat, currentType, currentConversation } = storeToRefs(chatStore)
const { getPromptTitle, botMessageCount, isShowPromptTitle } = storeToRefs(robotStore)

const isC2C = computed(() => currentType.value === "C2C")
const isGroup = computed(() => currentType.value === "GROUP")
const isSystem = computed(() => currentType.value === "@TIM#SYSTEM")

const nickName = computed(() => {
  if (!currentConversation.value) return ""
  const { userProfile } = currentConversation.value
  return userProfile?.nick || userProfile?.userID || userProfile?.remark || ""
})

const groupName = computed(() => {
  if (!currentConversation.value?.groupProfile) return ""
  const { name, groupID, memberCount } = currentConversation.value.groupProfile
  const count = memberCount ? `(${memberCount})` : ""
  return `${name || groupID} ${count}`
})

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
.message-header {
  height: 60px;
  min-height: 60px;
  padding: 0 16px;
  width: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-body-bg);
  border-bottom: 1px solid var(--color-border-default);
  .message-info {
    .chat-type {
      max-width: 500px;
      display: flex;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &.group {
        cursor: pointer;
      }

      .nickname {
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
  }
  .action-buttons {
    .action-btn {
      transition: all 0.2s ease;
    }
  }
}
</style>
