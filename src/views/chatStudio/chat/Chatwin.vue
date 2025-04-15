<template>
  <div
    v-show="currentConversation"
    id="chat-box"
    class="message-info-view-content"
    :class="classMessageInfoView()"
  >
    <el-scrollbar class="h-full" ref="scrollbarRef" @scroll="handleScrollbar">
      <div class="message-view" ref="messageViewRef">
        <div
          v-for="(item, index) in currentMessageList"
          :key="item.ID"
          :class="{ 'reset-select': item.isRevoked }"
        >
          <!-- 加载更多 -->
          <LoadMore :index="index" />
          <!-- 时间 -->
          <div v-if="isTime(item)" class="message-time-divider">
            {{ timeFormat(item.time * 1000, true) }}
          </div>
          <!-- 消息体 -->
          <div
            v-else-if="item.ID && !isTime(item) && !item.isDeleted"
            :id="`choice-${item.ID}`"
            class="message-view-item"
            @click="handleSelect($event, item, 'outside')"
          >
            <TimeDivider v-if="!isGroupChat" :item="item" />
            <div class="message-view-item-content" :class="classMessageViewItem(item)">
              <!-- 多选框 -->
              <Checkbox
                :item="item"
                :isRevoked="item.isRevoked"
                @click.stop="handleSelect($event, item, 'initial')"
              />
              <div v-if="showAvatar(item)" class="picture">
                <el-avatar
                  :size="36"
                  :src="fnAvatar(item)"
                  shape="square"
                  v-contextmenu:contextmenu
                  @error="() => true"
                  @click.stop="onClickAvatar($event, item)"
                  @contextmenu.prevent="handleContextAvatarMenuEvent($event, item)"
                >
                  <div class="h-36 w-36 flex-c bg-[#5cadff]">
                    {{ displayInfo(item.from) }}
                  </div>
                </el-avatar>
              </div>
              <div :class="msgOne(item)">
                <div v-if="isGroupChat" class="message-view-top">
                  <NameComponent :item="item" />
                  <TimeDivider :item="item" :showCheck="showCheckbox" type="group" />
                </div>
                <div class="message-view-body" :class="msgType(item.type)" :id="item.ID">
                  <!-- 消息编辑 -->
                  <MessageEditingBox
                    v-if="chatStore.msgEdit?.ID === item.ID"
                    :self="isSelf(item)"
                    :item="item"
                  />
                  <component
                    v-else
                    :key="item.ID"
                    :is="loadMsgModule(item)"
                    :message="item"
                    :status="item.status"
                    :self="isSelf(item)"
                    v-contextmenu:contextmenu
                    @contextmenu.prevent="handleContextMenuEvent($event, item)"
                  >
                  </component>
                  <!-- 消息发送加载状态 -->
                  <Stateful :item="item" :status="item.status" />
                  <!-- 菜单 -->
                  <MenuList
                    :item="item"
                    :status="item.status"
                    @handleSingleClick="handleSingleClick"
                  />
                </div>
                <AssistantMessage v-if="isAssistant && !isSelf(item)" :item="item" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <!-- 卡片 -->
    <MyPopover />
    <Contextmenu ref="contextmenu" :disabled="!isRight">
      <ContextmenuItem
        v-for="item in contextMenuItems"
        :key="item.id"
        :class="item.class"
        :style="item.style"
        @click="handleRightClick(item)"
      >
        <FontIcon :iconName="item.icon" />
        <span>{{ item.text }}</span>
      </ContextmenuItem>
    </Contextmenu>
  </div>
</template>

<script setup>
import {
  ref,
  watch,
  nextTick,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  computed,
} from "vue";
import { storeToRefs } from "pinia";
import { useGroupStore, useAppStore, useChatStore } from "@/stores/index";
import { showConfirmationBox } from "@/utils/message";
import { avatarMenu, menuOptionsList } from "../utils/menu";
import {
  handleCopyMsg,
  loadMsgModule,
  msgOne,
  msgType,
  validateLastMessage,
  isSelf,
} from "../utils/utils";
import { useEventListener } from "@vueuse/core";
import {
  setMessageRead,
  getMessageList,
  revokeMsg,
  translateText,
} from "@/api/im-sdk-api/index";
import { MULTIPLE_CHOICE_MAX } from "@/constants/index";
import { download } from "@/utils/chat/index";
import { getAiAvatarUrl } from "@/ai/utils";
import { getTime } from "@/utils/common";
import { debounce } from "lodash-es";
import { timeFormat } from "@/utils/timeFormat";
import { Contextmenu, ContextmenuItem } from "v-contextmenu";
import emitter from "@/utils/mitt-bus";
import Checkbox from "../components/Checkbox.vue";
import LoadMore from "../components/LoadMore.vue";
import NameComponent from "../components/NameComponent.vue";
import TimeDivider from "../components/TimeDivider.vue";
import Stateful from "../components/Stateful.vue";
import MenuList from "../components/MenuList.vue";
import MyPopover from "@/views/components/MyPopover/index.vue";
import MessageEditingBox from "../components/MessageEditingBox.vue";
import AssistantMessage from "../components/AssistantMessage.vue";

const timeout = ref(false);
const isRight = ref(true);
const contextMenuItems = ref([]);
const menuItemInfo = ref([]);
const scrollbarRef = ref(null);
const messageViewRef = ref(null);

const groupStore = useGroupStore();
const chatStore = useChatStore();
const appStore = useAppStore();

const {
  toAccount,
  isAssistant,
  isGroupChat,
  currentType,
  showCheckbox,
  isChatBoxVisible,
  scrollTopID,
  currentMessageList,
  currentConversation,
} = storeToRefs(chatStore);

useEventListener(window, "focus", () => {
  setMessageRead(currentConversation.value);
});

const updateLoadMore = (id) => {
  nextTick(() => {
    const el = document.getElementById(`choice-${id}`);
    if (!el) {
      console.warn("未找到对应的元素");
      return;
    }
    // chatStore.$patch({ scrollTopID: '' });
    el.scrollIntoView({ block: "start" });
  });
};

const fnAvatar = (item) => {
  if (isSelf(item) && __LOCAL_MODE__) {
    return new URL(`../../../assets/images/avatar.png`, import.meta.url).href;
  } else {
    return item.avatar || getAiAvatarUrl(item.from)
  }
}

const displayInfo = (info) => {
  if (!info) return "unknown";
  return info.slice(0, 2).toUpperCase();
};

const showAvatar = (item) => {
  return (
    !item.isRevoked && item.type !== "TIMGroupTipElem" && item?.payload?.description !== "dithering"
  );
};

const classMessageViewItem = (item) => {
  return [
    isSelf(item) ? "is-self" : "is-other",
    showCheckbox.value && !item.isRevoked && item.type !== "TIMGroupTipElem" ? "style-choice" : "",
  ];
};

const classMessageInfoView = () => {
  return [
    isChatBoxVisible.value ? "" : "style-msg-box",
    chatStore.replyMsgData ? "style-reply" : "",
  ];
};

const handleSelect = (e, item, type = "initial") => {
  // tip消息 撤回消息 抖动消息
  if (
    !showCheckbox.value ||
    item.type == "TIMGroupTipElem" ||
    item.isRevoked ||
    item.payload?.description === "dithering"
  ) {
    return;
  }
  const _el = document.getElementById(`choice-${item.ID}`);
  const el = _el.getElementsByClassName("check-btn")[0];
  if (!el.checked && chatStore.isFwdDataMaxed) {
    appStore.showMessage({ message: `最多只能选择${MULTIPLE_CHOICE_MAX}条`, type: "error" });
    return;
  }
  // 点击input框
  if (type === "initial" && e.target.tagName !== "INPUT") {
    const el = document.getElementById(`choice-${item.ID}`);
    el.parentNode.classList.toggle("style-select");
  }
  // 点击消息框
  if (type !== "initial") {
    _el.parentNode.classList.toggle("style-select");
  }
  // 首次右键打开多选 默认选中当前
  if (type === "choice") {
    el.checked = true;
    chatStore.setForwardData({ type: "set", payload: item });
  } else {
    el.checked = !el.checked;
    let key = el.checked ? "set" : "del";
    chatStore.setForwardData({ type: key, payload: item });
  }
};

const isTime = (item) => {
  return item?.isTimeDivider && item.time !== undefined;
};

const onClickAvatar = (e, item) => {
  if (isSelf(item) || showCheckbox.value) return;
  const { conversationID: id } = item || {};
  if (id === "@TIM#SYSTEM") return;
  emitter.emit("setPopoverStatus", { status: true, seat: e, cardData: item });
};

// 检查滚动条是否到达页面底部
const isScrolledToBottom = (lower = 1) => {
  try {
    const { scrollTop, clientHeight, scrollHeight } = scrollbarRef.value?.wrapRef;
    const height = scrollTop + clientHeight;
    const isBot = scrollHeight - height < lower;
    if (isBot) console.log("isScrolledToBottom: 到底部");
    return isBot;
  } catch (e) {
    return false;
  }
};

const loadMoreMessages = (scrollTop) => {
  // console.log("loadMoreMessages: ", scrollTop);
  const offsetTopScreen = messageViewRef.value?.children?.[0];
  const top = offsetTopScreen?.getBoundingClientRect().top;
  const canLoadData = top >= 36;
  if (canLoadData) getMoreMsg();
  emitter.emit("handleToBottom", isScrolledToBottom());
};

const debouncedFunc = debounce(loadMoreMessages, 300);

const handleScrollbar = (data) => {
  // console.log("scrollTop:", data);
  debouncedFunc(data?.scrollTop);
};

const updateScrollBarHeight = (type) => {
  if (type) {
    console.log("scrollBar:", type);
  }
  if (type === "instantly") {
    scrollbarRef.value?.scrollTo(0, messageViewRef.value?.scrollHeight);
  } else {
    nextTick(() => {
      scrollbarRef.value?.scrollTo(0, messageViewRef.value?.scrollHeight);
    });
  }
};

const updateScrollbar = () => {
  nextTick(() => {
    scrollbarRef.value.update();
  });
};

const getMoreMsg = async () => {
  try {
    const { conversationID: sessionId } = currentConversation.value;
    const msglist = currentMessageList.value;
    const nextMsg = validateLastMessage(msglist);
    console.log("nextMsg:", nextMsg);

    if (nextMsg?.type === "TIMCustomElem") {
      console.log("nextMsg:text", nextMsg?.payload?.data);
    } else if (nextMsg?.type === "TIMTextElem") {
      console.log("nextMsg:text", nextMsg?.payload?.text);
      console.log("nextMsg:ID", nextMsg?.ID);
      const el = document.getElementById(`choice-${nextMsg?.ID}`);
      console.log("nextMsg:el", el);
    }

    const result = await getMessageList({
      conversationID: sessionId,
      nextReqMessageID: nextMsg.ID,
    });

    console.log("getMessageList:", result);
    const { isCompleted, messageList, nextReqMessageID } = result;
    if (!messageList.length && isCompleted) {
      console.log("[chat] 没有更多消息了 getMoreMsg:");
      chatStore.$patch({ noMore: true });
    } else if (messageList.length) {
      chatStore.loadMoreMessages({ sessionId, messages: messageList, msgId: messageList[0].ID });
      chatStore.$patch({ scrollTopID: nextMsg?.ID });
    } else {
      chatStore.$patch({ noMore: true });
    }
  } catch (e) {
    chatStore.$patch({ noMore: true });
  }
};

const handleContextAvatarMenuEvent = (event, item) => {
  const { flow } = item;
  const type = currentType.value;
  // 单人 & 自己发送的消息 & 系统消息
  if (type === "C2C" || flow === "out" || item.type === "TIMGroupSystemNoticeElem") {
    isRight.value = false;
    return;
  }
  isRight.value = true;
  menuItemInfo.value = item;
  contextMenuItems.value = avatarMenu;
};

const handleContextMenuEvent = (event, item) => {
  const { isRevoked, time, type, payload } = item;
  const isFile = type === "TIMFileElem";
  const isRelay = type === "TIMRelayElem";
  const isCustom = type === "TIMCustomElem";
  // 撤回消息 系统类型消息 提示类型消息 多选状态 自定义消息
  if (
    isRevoked ||
    showCheckbox.value ||
    type === "TIMGroupSystemNoticeElem" ||
    type === "TIMGroupTipElem" ||
    payload?.description === "dithering"
  ) {
    isRight.value = false;
    return;
  }
  console.log("handleContextMenuEvent:", item);
  const relinquish = getTime() - time < 120; // 两分钟内可撤回
  timeout.value = false;
  isRight.value = true;
  menuItemInfo.value = item;
  contextMenuItems.value = menuOptionsList;
  // 对方消息
  if (!isSelf(item)) {
    contextMenuItems.value = menuOptionsList.filter((t) => t.id !== "revoke");
  }
  // 超过撤回时间
  if (!relinquish) {
    timeout.value = true;
    contextMenuItems.value = menuOptionsList.filter((t) => t.id !== "revoke");
  }
  // 群主 & 群聊 & 不限制2分钟撤回时间
  if (groupStore.isOwner && currentType.value === "GROUP") {
    contextMenuItems.value = menuOptionsList;
  }
  // 合并消息
  if (isRelay) {
    contextMenuItems.value = contextMenuItems.value.filter((t) => t.id !== "copy");
  }
  // 非文件消息
  if (!isFile) {
    contextMenuItems.value = contextMenuItems.value.filter((t) => t.id !== "saveAs");
  } else {
    contextMenuItems.value = contextMenuItems.value.filter((t) => t.id !== "copy");
  }
  // 机器人消息过滤 撤回 回复
  if (isAssistant.value) {
    contextMenuItems.value = contextMenuItems.value.filter(
      (t) => t.id !== "reply" && t.id !== "revoke"
    );
  }
  if (isCustom) {
    contextMenuItems.value = contextMenuItems.value.filter((t) => t.id === "delete");
  }
};

const handleRightClick = (data) => {
  const info = menuItemInfo.value;
  const { id, text } = data || {};
  switch (id) {
    case "send": // 发起会话
      handleSendMessage(info);
      break;
    case "ait": // @对方
      handleAt(info);
      break;
    case "copy": // 复制
      handleCopyMsg(info);
      break;
    case "translate": // 翻译
      handleTranslate(info);
      break;
    case "revoke": // 撤回
      handleRevokeMsg(info);
      break;
    case "forward": // 转发
      handleForward(info);
      break;
    case "saveAs": // 另存为
      handleSave(info);
      break;
    case "reply": // 回复
      handleReplyMsg(info);
      break;
    case "multiSelect": // 多选
      handleMultiSelectMsg(info);
      break;
    case "delete": // 删除
      handleDeleteMsg(info);
      break;
  }
};

const handleSingleClick = ({ item, id }) => {
  menuItemInfo.value = item;
  handleRightClick({ id });
};

const handleAt = (data) => {
  const { from, nick, conversationType: type } = data;
  if (type === "C2C") return;
  emitter.emit("handleAt", { id: from, name: nick });
};

const handleSendMessage = (data) => {
  chatStore.addConversation({ sessionId: `C2C${data.from}` });
};

// 另存为
const handleSave = ({ payload }) => {
  download(payload.fileUrl, payload.fileName);
};

const handleTranslate = (data) => {
  translateText({ textList: data.payload.text });
};
// 转发
const handleForward = (data) => {};
// 回复消息
const handleReplyMsg = (data) => {
  chatStore.$patch({ replyMsgData: data });
  if (!isSelf(data)) handleAt(data);
  // 重置编辑器高度
  const chatBox = document.getElementById("chat-box"); //聊天框
  const editor = document.getElementById("editor");
  chatBox.style.height = `calc(100% - 60px - 200px)`;
  editor.style.height = `${200}px`;
};
// 删除消息
const handleDeleteMsg = (data) => {
  chatStore.deleteMessage({
    sessionId: data.conversationID,
    messageIdArray: [data.ID],
    message: [data],
  });
};
// 多选
const handleMultiSelectMsg = (item) => {
  chatStore.$patch({ showCheckbox: true });
  handleSelect(null, item, "choice");
};
const handleRevokeChange = (data, type) => {
  if (data.type !== "TIMTextElem") return;
  chatStore.updateRevokeMsg({ data, type });
};
// 撤回消息
const handleRevokeMsg = async (data) => {
  if (timeout.value) {
    const result = await showConfirmationBox({ message: "确定撤回这条消息?", iconType: "warning" });
    if (result === "cancel") return;
  }
  const { code, message } = await revokeMsg(data);
  if (code !== 0) return;
  if (message.flow !== "out") return;
  handleRevokeChange(message, "set");
  setTimeout(() => {
    handleRevokeChange(message, "delete");
  }, 60000);
};

function onEmitter() {
  emitter.on("updateScroll", (type) => {
    if (type === "bottom") {
      isScrolledToBottom() && updateScrollBarHeight();
    } else if (type === "robot") {
      isScrolledToBottom(10) && updateScrollBarHeight();
    } else {
      updateScrollBarHeight(type);
    }
  });
}

function offEmitter() {
  emitter.off("updateScroll");
}

watch(
  () => scrollTopID.value,
  (data) => {
    updateLoadMore(data);
  }
);

watch(
  () => chatStore.replyMsgData,
  () => {
    updateScrollbar();
  }
);

onMounted(() => {
  onEmitter();
});
onUnmounted(() => {
  offEmitter();
});
onUpdated(() => {
  updateScrollBarHeight();
});
onBeforeUpdate(() => {});
onBeforeUnmount(() => {});

defineExpose({ updateScrollbar, updateScrollBarHeight });
</script>

<style lang="scss" scoped>
.message-view-tips-elem {
  margin: auto;
  .message-name {
    display: none;
  }
}
.message-view-item-index {
  // max-width: 70%;
  width: 100%;
}
.message-info-view-content {
  height: calc(100% - 60px - 200px);
}
.style-msg-box {
  height: calc(100% - 60px) !important;
}
.style-reply {
  height: calc(100% - 60px - 200px - 60px) !important;
}
.message-time-divider {
  position: relative;
  margin: 10px 0;
  max-height: 20px;
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  color: var(--color-time-divider);
}
.message-view {
  display: flex;
  flex-direction: column;
  // flex-direction: column-reverse;
  min-width: 375px;
  height: 100%;
  padding: 0 16px 16px 16px;
  box-sizing: border-box;
  overflow-y: overlay;
  overflow-x: hidden;
  .picture {
    width: 36px;
    height: 36px;
    user-select: none;
    --el-border-radius-base: 6px;
    --el-text-color-disabled: #ffffff00;
  }
}
.style-select {
  border-radius: 3px;
  background: var(--color-multiple-choice);
}
.reset-select {
  border-radius: 3px;
}
.style-choice {
  padding-left: 35px;
  padding-right: 10px;
}
.message-view-item {
  margin: 10px 0 10px 0;
  &:hover .time-divider {
    visibility: visible;
  }
}
.message-view-item-content {
  position: relative;
  display: flex;
  flex-direction: row;
  transition: all 0.15s ease;
  gap: 8px;
  .message-view-top {
    display: flex;
  }
  .message-view-body {
    display: flex;
    align-items: center;
    gap: 8px;
    &:hover .menubar {
      opacity: 1;
    }
  }
}
// .is-other {}

.is-self {
  flex-direction: row-reverse;
  .message-view-top {
    flex-direction: row-reverse;
  }
  .message-view-body {
    flex-direction: row-reverse;
  }
  .message-view__img,
  .message-view__file,
  .message-view__text {
    align-items: center;
  }
}
</style>
