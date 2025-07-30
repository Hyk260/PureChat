<template>
  <el-scrollbar class="scrollbar-list">
    <EmptyMessage v-if="conversationList.length === 0" class-name="no-msg" />
    <div
      v-for="item in searchForData"
      v-if="!isEnableVirtualList"
      :id="`message_${item.conversationID}`"
      :key="item.conversationID"
      v-contextmenu:contextmenu
      class="message-item flex-bc"
      :class="fnClass(item)"
      @click="handleConversationListClick(item)"
      @drop="handleDrop($event, item, handleConversationListClick)"
      @dragover="handleDragOver($event)"
      @dragenter="handleDragEnter($event, item)"
      @dragleave="handleDragLeave($event, item)"
      @contextmenu.prevent="handleContextMenuEvent($event, item)"
    >
      <!-- 置顶图标 -->
      <div v-show="item.isPinned" class="pinned-tag"></div>
      <!-- 头像 -->
      <el-badge class="avatar" is-dot :hidden="isShowCount(item) || !isNotify(item)">
        <UserAvatar
          words="3"
          shape="square"
          :session-id="item.conversationID"
          :type="item.type === 'C2C' ? 'single' : 'group'"
          :nick-name="chatName(item)"
          :url="item.type === 'C2C' ? item.userProfile?.avatar : item?.groupProfile?.avatar"
        />
      </el-badge>
      <!-- 消息 -->
      <div class="message-item-right">
        <div class="message-item-right-top flex-bc">
          <div class="message-chat-name flex">
            <span class="name-title truncate">{{ chatName(item) }}</span>
            <Label :item="item" :user-i-d="item.userProfile?.userID" />
          </div>
          <div v-if="item.lastMessage?.lastTime" class="message-time">
            {{ timeFormat(item.lastMessage.lastTime * 1000) }}
          </div>
        </div>
        <div class="message-item-right-bottom truncate">
          <CustomMention v-if="isMention(item) || isDraft(item)" :item="item" />
          <span v-else>{{ formatNewsMessage(item) }}</span>
        </div>
        <!-- 未读消息红点 -->
        <el-badge
          v-show="!isShowCount(item) && !isNotify(item) && item.type !== '@TIM#SYSTEM'"
          :value="item.unreadCount"
          :max="99"
        />
        <!-- 消息免打扰 -->
        <BellOff v-show="isNotify(item)" :size="15" class="dont" />
      </div>
    </div>
    <VirtualList v-else />
    <!-- 右键菜单 -->
    <Contextmenu ref="contextmenu" :disabled="!isRight">
      <ContextmenuItem
        v-for="item in contextMenuItems"
        :key="item.id"
        :class="item.class"
        :style="item.style"
        @click="handleClickMenuItem(item)"
      >
        <el-icon v-if="item.icon" :class="menuItem?.class">
          <component :is="item.icon" />
        </el-icon>
        <SvgIcon v-else :local-icon="item.svgIcon" class="menu-svg" />
        <span> {{ item.text }}</span>
      </ContextmenuItem>
    </Contextmenu>
  </el-scrollbar>
</template>

<script setup>
import { h, ref, computed } from "vue";
import { BellOff } from 'lucide-vue-next';
import { storeToRefs } from "pinia";
import { isObject } from "lodash-es";
import { chatSessionListData } from "../utils/menu";
import { pinConversation } from "@/service/im-sdk-api/index";
import { timeFormat } from "@/utils/timeFormat";
import { Contextmenu, ContextmenuItem } from "v-contextmenu";
import { chatName, formatContent } from "@/utils/chat/index";
import { encodeHTML } from "@/utils/common";
import { useHandlerDrop } from "@/utils/hooks/useHandlerDrop";
import { setMessageRemindType } from "@/service/im-sdk-api/index";
import { useGroupStore, useUserStore, useChatStore } from "@/stores/index";
import EmptyMessage from "../components/EmptyMessage.vue";
import VirtualList from "./VirtualList.vue";
import Label from "../components/Label.vue";
import emitter from "@/utils/mitt-bus";

const { handleDragEnter, handleDragLeave, handleDragOver, handleDrop } = useHandlerDrop();

const isEnableVirtualList = ref(false);
const isRight = ref(true);
const contextMenuItems = ref([]);
const contextMenuItemInfo = ref([]);

const groupStore = useGroupStore();
const userStore = useUserStore();
const chatStore = useChatStore();

const { conversationList, searchConversationList, currentSessionId } = storeToRefs(chatStore);

const searchForData = computed(() => {
  if (searchConversationList.value.length) {
    return searchConversationList.value;
  } else {
    return conversationList.value;
  }
});

const isDraft = (item) => {
  const id = item.conversationID;
  return id !== currentSessionId.value && chatStore.chatDraftMap.has(id);
};

const isNotify = (item) => {
  return item.messageRemindType === "AcceptNotNotify";
};

const isShowCount = (item) => {
  return item.unreadCount === 0;
};

const isMention = (item) => {
  return item.groupAtInfoList?.length > 0;
};

const fnClass = (item) => (item?.conversationID === currentSessionId.value ? "is-active" : "");

const formatNewsMessage = (data) => {
  if (!isObject(data)) return "";
  const { type, lastMessage, unreadCount } = data;
  const { messageForShow: rawTip, fromAccount, isRevoked, nick, type: lastType } = lastMessage;
  const isOther = userStore.userProfile?.userID !== fromAccount; // 其他人消息
  const isFound = fromAccount === "@TLS#NOT_FOUND"; // 未知消息
  const isSystem = type === "@TIM#SYSTEM"; //系统消息
  const isGroup = type === "GROUP"; //群聊
  const isCount = unreadCount && isNotify(data); // 未读消息计数
  const MAX_TIP_LENGTH = 46;

  const formatTip = (t) => (t.length > MAX_TIP_LENGTH ? `${t.slice(0, MAX_TIP_LENGTH)}...` : t);

  const tip = formatTip(rawTip || "");
  // 处理撤回消息
  if (isRevoked) {
    return `${isOther ? nick : "你"}撤回了一条消息`;
  }
  // 处理免打扰消息
  if (isCount) {
    const prefix = `[${unreadCount}条] `;
    if (lastType === "TIMGroupTipElem") {
      return `${prefix} ${tip}`;
    }
    const sender = isGroup && isOther ? `${nick || "未知用户"}: ` : "";
    return `${prefix}${sender}${tip}`;
  }
  // 处理未知或系统消息
  if (isFound || isSystem) return tip;
  // 处理群聊消息
  if (isGroup && isOther) {
    if (lastType === "TIMGroupTipElem") {
      return tip;
    } else if (nick) {
      return `${nick}: ${tip}`;
    } else {
      tip;
    }
  }
  // 默认返回消息内容
  return tip;
};
// 定义消息提示元素
const createMessagePrompt = (type = "at") => {
  const messageTypes = { at: "有人@我", draft: "草稿" };
  return `<span style='color:#f44336;'>[${messageTypes[type]}]</span>`;
};

// 定义消息提示元素
const CustomMention = (props) => {
  const { item } = props;
  const { lastMessage, conversationID: ID, unreadCount } = item;
  const { messageForShow, nick: lastNick } = lastMessage;
  const draft = chatStore.chatDraftMap.get(ID);
  // 草稿
  if (draft && isDraft(item)) {
    const str = encodeHTML(formatContent(draft));
    return h("span", { innerHTML: `${createMessagePrompt("draft")} ${str}` });
  }
  // @消息
  const isUnread = unreadCount !== 0; // 消息是否未读
  const mention = `${isUnread ? `${createMessagePrompt("at")}` : ""} ${lastNick}: ${messageForShow}`;
  return h("span", { innerHTML: mention });
};
// 消息列表 右键菜单
const handleContextMenuEvent = (e, item) => {
  const { type } = item;
  const isSystem = type === "@TIM#SYSTEM";
  // 系统通知屏蔽右键菜单
  if (isSystem) {
    isRight.value = false;
    return;
  }
  isRight.value = true;
  contextMenuItemInfo.value = item;
  contextMenuItems.value = chatSessionListData;

  contextMenuItems.value = contextMenuItems.value.filter((t) => {
    if (item.isPinned) {
      return t.id !== "pinged";
    } else {
      return t.id !== "unpin";
    }
  });

  contextMenuItems.value = contextMenuItems.value.filter((t) => {
    if (item.messageRemindType === "AcceptNotNotify") {
      return t.id !== "AcceptNotNotify";
    } else {
      return t.id !== "AcceptAndNotify";
    }
  });
};

const handleConversationListClick = (data) => {
  console.log("会话点击 handleConversationListClick:", data);
  if (currentSessionId.value === data?.conversationID) return;
  chatStore.setMsgEdit(null);
  chatStore.setReplyMsgData(null);
  chatStore.setForwardData({ type: "clear" });
  chatStore.updateSelectedConversation(data);
  chatStore.updateMessageList(data);
  if (data?.type === "GROUP") {
    groupStore.handleGroupProfile(data);
    groupStore.handleGroupMemberList({ groupID: data.groupProfile.groupID });
  }
  emitter.emit("handleInsertDraft", {
    sessionId: data?.conversationID,
  });
  emitter.emit("updateScroll");
};

const handleClickMenuItem = (item) => {
  const data = contextMenuItemInfo.value;
  if (item.id === "pinged" || item.id === "unpin") {
    pingConversation(data); // 置顶 or 取消置顶
  } else if (item.id === "AcceptNotNotify" || item.id === "AcceptAndNotify") {
    disableRecMsg(data); // 消息免打扰 or 允许消息提醒
  } else if (item.id === "remove") {
    removeConversation(data); // 删除会话
  } else if (item.id === "clean") {
    console.log("清除消息"); // 清除消息
  }
};
// 消息免打扰
const disableRecMsg = async (data) => {
  await setMessageRemindType(data);
};

const removeConversation = async (data) => {
  chatStore.deleteSession({ sessionId: data.conversationID });
};

const pingConversation = async (data) => {
  await pinConversation(data);
};
</script>

<style lang="scss" scoped>
.scrollbar-list {
  background: var(--color-body-bg);
  height: 100%;
  overflow: hidden;
}
.message-item {
  padding: 12px 12px 12px 16px;
  user-select: none;
  height: 64px;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  color: var(--color-text);
  &:hover {
    background: var(--icon-hover-color);
  }
  .avatar {
    height: 40px;
    min-width: 40px;
  }
  .pinned-tag {
    display: block;
    position: absolute;
    left: 3px;
    top: 3px;
    border-radius: 2px;
    opacity: 0.8;
    border: 6px solid rgb(121.3, 187.1, 255);
    border-right-color: transparent;
    border-bottom-color: transparent;
  }
  .portrait {
    width: 40px;
    height: 40px;
    border-radius: 3px;
  }
  .message-item-right {
    width: 200px;
    min-width: 200px;
    height: 100%;
    position: relative;
    .dont {
      position: absolute;
      right: 0;
      top: 26px;
      font-size: 14px;
      color: var(--color-time-divider);
    }
    .message-item-right-top {
      padding-bottom: 10px;
      width: 100%;
      .message-chat-name {
        font-size: 14px;
        color: var(--color-message-chat-name);
        max-height: 18px;
        line-height: 18px;
        max-width: 140px;
        .name-title {
          padding-right: 5px;
        }
      }
      .message-time {
        font-family: MicrosoftYaHei;
        font-size: 10px;
        color: var(--color-time-divider);
      }
    }
    .message-item-right-bottom {
      font-size: 12px;
      color: var(--color-time-divider);
      width: 179px;
    }
    .svg-icon {
      color: rgba(0, 0, 0, 0.45);
    }
    .el-badge {
      position: absolute;
      right: 0px;
      bottom: -2px;
      sup {
        top: 0;
      }
    }
  }
}
.is-active {
  background: var(--color-message-active) !important;
}
.over-style {
  background: var(--color-message-active) !important;
}
.menu-svg {
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
}
</style>
