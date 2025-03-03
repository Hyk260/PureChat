<template>
  <el-scrollbar class="scrollbar-list">
    <EmptyMessage className="no-msg" v-if="tabList.length == 0" />
    <div
      v-for="item in searchForData"
      class="message-item"
      :key="item.conversationID"
      :id="`message_${item.conversationID}`"
      :class="fnClass(item)"
      v-contextmenu:contextmenu
      @click="handleConvListClick(item)"
      @drop="handleDrop($event, item, handleConvListClick)"
      @dragover="handleDragOver($event)"
      @dragenter="handleDragEnter($event, item)"
      @dragleave="handleDragLeave($event, item)"
      @contextmenu.prevent="handleContextMenuEvent($event, item)"
    >
      <!-- 置顶图标 -->
      <div class="pinned-tag" v-show="item.isPinned && !arrowRight"></div>
      <!-- 头像 -->
      <el-badge is-dot :hidden="isShowCount(item) || !isNotify(item)">
        <UserAvatar
          words="3"
          shape="square"
          :convId="item.conversationID"
          :type="item.type === 'C2C' ? 'single' : 'group'"
          :nickName="chatName(item)"
          :url="item.type === 'C2C' ? item.userProfile.avatar : item?.groupProfile?.avatar"
        />
      </el-badge>
      <!-- 消息 -->
      <div class="message-item-right">
        <div class="message-item-right-top flex-bc">
          <div class="message-chat-name flex">
            <span class="name-title">{{ chatName(item) }}</span>
            <Label :item="item" :userID="item.userProfile?.userID" />
          </div>
          <div class="message-time" v-if="item.lastMessage?.lastTime">
            {{ timeFormat(item.lastMessage.lastTime * 1000) }}
          </div>
        </div>
        <div class="message-item-right-bottom">
          <CustomMention v-if="isMention(item) || isdraft(item)" :item="item" />
          <span v-else>{{ formatNewsMessage(item) }}</span>
        </div>
        <!-- 未读消息红点 -->
        <el-badge
          v-show="!isShowCount(item) && !isNotify(item) && item.type !== '@TIM#SYSTEM'"
          :value="item.unreadCount"
          :max="99"
        />
        <!-- 消息免打扰 -->
        <svg-icon v-show="isNotify(item)" local-icon="DontDisturb" class="dont" />
      </div>
    </div>
    <!-- 右键菜单 -->
    <contextmenu ref="contextmenu" :disabled="!isRight">
      <contextmenu-item
        v-for="item in contextMenuItems"
        :key="item.id"
        :class="item.class"
        :style="item.style"
        @click="handleClickMenuItem(item)"
      >
        <FontIcon v-if="item.icon" :iconName="item.icon" />
        <svg-icon v-else :local-icon="item.svgIcon" class="menu-svg" />
        <span> {{ item.text }}</span>
      </contextmenu-item>
    </contextmenu>
  </el-scrollbar>
</template>

<script setup>
import { h, ref, watch, computed } from "vue";
import { chatSessionListData } from "../utils/menu";
import { pinConversation, setMessageRead } from "@/api/im-sdk-api/index";
import { useGetters, useState } from "@/utils/hooks/useMapper";
import emitter from "@/utils/mitt-bus";
import { timeFormat } from "@/utils/timeFormat";
import { Contextmenu, ContextmenuItem } from "v-contextmenu";
import { useStore } from "vuex";
import EmptyMessage from "../components/EmptyMessage.vue";
import Label from "../components/Label.vue";
import { chatName, html2Escape, formatContent } from "../utils/utils";
import { useHandlerDrop } from "@/utils/hooks/useHandlerDrop";
import { useUserStore } from "@/stores/modules/user";
import { localStg } from "@/utils/storage";
import { useGroupStore } from "@/stores/modules/group";

const { handleDragEnter, handleDragLeave, handleDragOver, handleDrop } = useHandlerDrop();

const isRight = ref(true);
const contextMenuItems = ref([]);
const contextMenuItemInfo = ref([]);

const groupStore = useGroupStore();
const userStore = useUserStore();
const { dispatch, commit } = useStore();
const { tabList } = useGetters(["tabList"]);
const { activeTab, chat, sessionDraftMap, postponeUnread, arrowRight, filterConversationList } =
  useState({
    sessionDraftMap: (state) => state.conversation.sessionDraftMap,
    arrowRight: (state) => state.conversation.arrowRight,
    activeTab: (state) => state.conversation.activeTab,
    filterConversationList: (state) => state.conversation.filterConversationList,
    conversationList: (state) => state.conversation.conversationList,
    chat: (state) => state.conversation.currentConversation,
    postponeUnread: (state) => state.conversation.postponeUnread,
  });

const searchForData = computed(() => {
  if (filterConversationList.value.length && activeTab.value === "whole") {
    return filterConversationList.value;
  } else {
    return tabList.value;
  }
});

const isdraft = (item) => {
  return (
    item.conversationID !== chat?.value?.conversationID &&
    sessionDraftMap.value.has(item.conversationID)
  );
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

const fnClass = (item) => (item?.conversationID === chat.value?.conversationID ? "is-active" : "");

const formatNewsMessage = (data) => {
  const { type, lastMessage, unreadCount } = data;
  const { messageForShow: rawTip, fromAccount, isRevoked, nick, type: lastType } = lastMessage;
  const { userID } = localStg.get("timProxy")?.userProfile || {};
  const isOther = userID !== fromAccount; // 其他人消息
  const isFound = fromAccount === "@TLS#NOT_FOUND"; // 未知消息
  const isSystem = type === "@TIM#SYSTEM"; //系统消息
  const isGroup = type === "GROUP"; //群聊
  const isCount = unreadCount && isNotify(data); // 未读消息计数
  const MAX_TIP_LENGTH = 46;

  const formatTip = (message) =>
    message.length > MAX_TIP_LENGTH ? `${message.slice(0, MAX_TIP_LENGTH)}...` : message;

  const tip = formatTip(rawTip);
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
  const draft = sessionDraftMap.value.get(ID);
  // 草稿
  if (draft && isdraft(item)) {
    const str = html2Escape(formatContent(draft));
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
  const isStystem = type === "@TIM#SYSTEM";
  // 系统通知屏蔽右键菜单
  if (isStystem) {
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

// 会话点击
const handleConvListClick = (data) => {
  console.log("会话点击 handleConvListClick:", data);
  if (chat.value) {
    const { conversationID: id } = chat.value;
    if (id == data?.conversationID) return;
  }
  commit("setReplyMsg", null);
  commit("setMessageEdit", null);
  commit("setForwardData", { type: "clear", payload: null });
  // 切换会话
  commit("updateSelectedConversation", data);
  // 获取会话列表 read
  dispatch("updateMessageList", data);
  if (data?.type === "GROUP") {
    // 群详情信息
    groupStore.handleGroupProfile(data);
    // 群成员列表
    groupStore.handleGroupMemberList({ groupID: data.groupProfile.groupID });
  }
  emitter.emit("handleInsertDraft", data);
  emitter.emit("updataScroll");
};

const handleClickMenuItem = (item) => {
  const data = contextMenuItemInfo.value;
  if (item.id === "pinged" || item.id === "unpin") {
    pingConv(data); // 置顶 or 取消置顶
  } else if (item.id === "AcceptNotNotify" || item.id === "AcceptAndNotify") {
    disableRecMsg(data); // 消息免打扰 or 允许消息提醒
  } else if (item.id === "remove") {
    removeConv(data); // 删除会话
  } else if (item.id === "clean") {
    console.log("清除消息"); // 清除消息
  }
};
// 消息免打扰
const disableRecMsg = async (data) => {
  const { type, toAccount, messageRemindType: remindType } = data;
  dispatch("setMessageReminderType", { type, toAccount, remindType });
};
// 删除会话
const removeConv = async (data) => {
  const { conversationID: convId } = data;
  dispatch("deleteSession", { convId });
};
const fnPostpone = (data) => {
  if (data !== "whole") return;
  if (postponeUnread.value.size === 0) return;
  [...postponeUnread.value].map((item) => {
    setMessageRead(item);
  });
  commit("setConversationValue", { key: "postponeUnread", value: new Set() });
};
// 置顶
const pingConv = async (data) => {
  await pinConversation(data);
};
watch(activeTab, (data) => {
  fnPostpone(data);
});
</script>

<style lang="scss" scoped>
.scrollbar-list {
  background: var(--color-body-bg);
  height: 100%;
}
.message-item {
  @include flex-center;
  gap: 14px;
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
    height: 44px;
    position: relative;
    .dont {
      position: absolute;
      right: 0;
      top: 26px;
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
          @include text-ellipsis();
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
      @include text-ellipsis;
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
