<template>
  <header v-if="currentConversation" class="message-header">
    <div class="message-info">
      <p v-if="currentType">
        <!-- 单聊 -->
        <span v-if="isC2C" class="chat-type single" @click="openUser">
          <span class="nick">{{ nickName }}</span>
          <!-- Model -->
          <ModelTag v-if="isAssistant" :model="robotStore.model?.id || ''" />
          <!-- Prompt -->
          <ElTag v-if="isShowPromptTitle" type="primary" size="small" class="cursor-pointer ml-5" @click="openPrompt">
            {{ getPromptTitle }}
          </ElTag>
          <!-- Tools -->
          <!-- <template v-if="isAssistant && botTools && isShowBotTools">
            <div v-for="item in botTools" :key="item.id" class="ml-5 ai-prompt-title">
              <ToyBrick class="function-call" />
              <span>{{ item.meta.title }}</span>
            </div>
          </template> -->
          <!-- History -->
          <ElTooltip
            v-if="isAssistant"
            :showArrow="false"
            :content="`助手将只记住最后${botMessageCount}条消息`"
            placement="bottom"
          >
            <ElTag v-if="isAssistant" class="history ml-5" type="warning" size="small">
              <History :size="14" />
              <span class="ml-2 align-middle">{{ botMessageCount }}</span>
            </ElTag>
          </ElTooltip>
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
    <div class="action-buttons flex gap-4">
      <ElTooltip :showArrow="false" content="邀请加群" placement="bottom">
        <ElButton v-if="isGroupChat && false" class="action-btn message-info-add" title="添加成员">
          <MessageCirclePlus :size="18" />
        </ElButton>
      </ElTooltip>

      <ElTooltip :showArrow="false" content="分享" placement="bottom">
        <ElButton v-if="isC2C || isGroupChat" class="action-btn share" @click="openShare">
          <Share :size="18" />
        </ElButton>
      </ElTooltip>

      <ElTooltip v-if="IS_DEV && IS_LOCAL_MODE" :showArrow="false" content="显示/隐藏话题面板" placement="bottom">
        <ElButton class="action-btn panel" @click="portalStore.togglePortal">
          <PanelRightClose v-if="showPortal" :size="18" />
          <PanelLeftClose v-else :size="18" />
        </ElButton>
      </ElTooltip>

      <ElTooltip :showArrow="false" content="群详情" placement="bottom">
        <ElButton v-if="isGroupChat" class="action-btn setup" @click="openSetup">
          <Menu :size="18" />
        </ElButton>
      </ElTooltip>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Menu, MessageCirclePlus, PanelRightClose, PanelLeftClose, History, Share2 as Share } from "lucide-vue-next"
import { storeToRefs } from "pinia"

import { useChatStore, useRobotStore, usePortalStore } from "@/stores"
import ModelTag from "@/components/Features/ModelTag"
import CustomLabel from "@/components/Chat/CustomLabel.vue"
import emitter from "@/utils/mitt-bus"

defineOptions({
  name: "ChatHeader",
})

const chatStore = useChatStore()
const robotStore = useRobotStore()
const portalStore = usePortalStore()

const { isMultiSelectMode, isAssistant, isGroupChat, currentType, currentConversation } = storeToRefs(chatStore)
const { getPromptTitle, botMessageCount, isShowPromptTitle } = storeToRefs(robotStore)
const { showPortal } = storeToRefs(portalStore)

const isC2C = computed(() => currentType.value === "C2C")
const isGroup = computed(() => currentType.value === "GROUP")
const isSystem = computed(() => currentType.value === "@TIM#SYSTEM")

const nickName = computed(() => {
  if (!currentConversation.value) return ""
  const { userProfile } = currentConversation.value
  return userProfile?.nick || userProfile?.userID || ""
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
  chatStore.toggleMultiSelectMode(!isMultiSelectMode.value)
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
  .history {
    margin-left: 5px;
  }
  .action-buttons {
    :deep(.el-button) {
      font-size: 16px;
      width: 32px;
      height: 32px;
      padding: 0px;
      border-radius: 50%;
      border: none;
      background-color: unset;
      margin-left: 0;
      &:hover {
        color: var(--el-color-info-dark-3);
      }
    }
  }
}
</style>
