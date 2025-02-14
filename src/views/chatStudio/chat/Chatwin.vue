<template>
  <div
    v-show="currentConv"
    id="chat-box"
    class="message-info-view-content"
    :class="classMessageInfoView()"
  >
    <el-scrollbar class="h-full" ref="scrollbarRef" @scroll="scrollbar">
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
            :id="`choice${item.ID}`"
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
              <div class="picture" v-if="showAvatar(item)">
                <el-avatar
                  shape="square"
                  :size="36"
                  :src="item.avatar || getAiAvatarUrl(item.from) || squareUrl"
                  v-contextmenu:contextmenu
                  @error="() => true"
                  @click.stop="onClickAvatar($event, item)"
                  @contextmenu.prevent="handleContextAvatarMenuEvent($event, item)"
                >
                  <img :src="emptyUrl" />
                </el-avatar>
              </div>
              <div :class="msgOne(item)">
                <div class="message-view-top" v-if="isGroupChat">
                  <NameComponent :item="item" />
                  <TimeDivider :item="item" :showCheck="showCheckbox" type="group" />
                </div>
                <div class="message-view-body" :class="msgType(item.type)" :id="item.ID">
                  <!-- 消息编辑 -->
                  <MessageEditingBox
                    v-if="messageEdit?.ID === item.ID"
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
                    @handlSingleClick="handlSingleClick"
                  />
                </div>
                <div class="message-view-bottom" v-if="!isSelf(item) && isRobot(toAccount)">
                  {{ handleCustomData(item, "messageAbstract") }}
                </div>
                <div class="message-view-question" v-if="!isSelf(item) && isRobot(toAccount)">
                  <div
                    v-for="(item, i) in handleCustomData(item, 'recQuestion') || []"
                    :key="i"
                    @click="handleQuestion(item)"
                  >
                    <span class="question"> {{ item }} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <!-- 卡片 -->
    <MyPopover />
    <contextmenu ref="contextmenu" :disabled="!isRight">
      <contextmenu-item
        v-for="item in contextMenuItems"
        :key="item.id"
        :class="item.class"
        :style="item.style"
        @click="handlRightClick(item)"
      >
        <FontIcon :iconName="item.icon" />
        <span>{{ item.text }}</span>
      </contextmenu-item>
    </contextmenu>
  </div>
</template>

<script setup>
import {
  nextTick,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  useTemplateRef,
  watch,
} from "vue";
import { showConfirmationBox } from "@/utils/message";
import { useStore } from "vuex";
import { avatarMenu, menuOptionsList, emptyUrl, squareUrl } from "../utils/menu";
import {
  handleCopyMsg,
  loadMsgModule,
  msgOne,
  msgType,
  sendChatMessage,
  validatelastMessage,
  isSelf,
} from "../utils/utils";
import { deleteMessage, getMessageList, revokeMsg, translateText } from "@/api/im-sdk-api/index";
import { MULTIPLE_CHOICE_MAX } from "@/constants/index";
import { download, isRobot } from "@/utils/chat/index";
import { useGetters, useState } from "@/utils/hooks/useMapper";
import emitter from "@/utils/mitt-bus";
import MyPopover from "@/views/components/MyPopover/index.vue";
import { debounce } from "lodash-es";
import { timeFormat } from "@/utils/timeFormat";
import { Contextmenu, ContextmenuItem } from "v-contextmenu";
import Checkbox from "../components/Checkbox.vue";
import LoadMore from "../components/LoadMore.vue";
import NameComponent from "../components/NameComponent.vue";
import TimeDivider from "../components/TimeDivider.vue";
import Stateful from "../components/Stateful.vue";
import MenuList from "../components/MenuList.vue";
import { getAiAvatarUrl } from "@/ai/utils";
import MessageEditingBox from "../components/MessageEditingBox.vue";
import { getTime } from "@/utils/common";

const isConfirm = ref(true);
const timeout = ref(false);
const isRight = ref(true);
const contextMenuItems = ref([]);
const menuItemInfo = ref([]);
const scrollbarRef = ref(null);
const messageViewRef = ref(null);
const { dispatch, commit } = useStore();
const { isOwner, toAccount, isGroupChat, currentType } = useGetters([
  "isOwner",
  "toAccount",
  "isGroupChat",
  "currentType",
]);
const {
  messageEdit,
  isChatBoxVisible,
  forwardData,
  showCheckbox,
  needScrollDown,
  currentReplyMsg,
  currentMessageList,
  currentConv,
} = useState({
  messageEdit: (state) => state.conversation.messageEdit,
  isChatBoxVisible: (state) => state.conversation.isChatBoxVisible,
  forwardData: (state) => state.conversation.forwardData,
  showCheckbox: (state) => state.conversation.showCheckbox,
  needScrollDown: (state) => state.conversation.needScrollDown,
  currentReplyMsg: (state) => state.conversation.currentReplyMsg,
  currentMessageList: (state) => state.conversation.currentMessageList,
  currentConv: (state) => state.conversation.currentConversation,
});

const updateLoadMore = (item) => {
  nextTick(() => {
    const elRef = messageViewRef.value?.children?.[item - 1];
    if (!elRef) return;
    console.log("messageViewRef:", elRef);
    console.log("updateLoadMore:", item);
    item > 0 ? elRef.scrollIntoView({ block: "start" }) : elRef.scrollIntoViewIfNeeded();
  });
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
    currentReplyMsg.value ? "style-reply" : "",
  ];
};

const handleCustomData = (item, type) => {
  // type messageAbstract
  const data = item.cloudCustomData;
  if (!data) return;
  try {
    const message = JSON.parse(data);
    if (message.messagePrompt) {
      return message.messagePrompt[type];
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
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
  const _el = document.getElementById(`choice${item.ID}`);
  const el = _el.getElementsByClassName("check-btn")[0];
  if (!el.checked && forwardData.value.size >= MULTIPLE_CHOICE_MAX) {
    commit("showMessage", {
      message: `最多只能选择${MULTIPLE_CHOICE_MAX}条`,
      type: "error",
    });
    return;
  }
  // 点击input框
  if (type === "initial" && e.target.tagName !== "INPUT") {
    const el = document.getElementById(`choice${item.ID}`);
    el.parentNode.classList.toggle("style-select");
  }
  // 点击消息框
  if (type !== "initial") {
    _el.parentNode.classList.toggle("style-select");
  }
  // 首次右键打开多选 默认选中当前
  if (type === "choice") {
    el.checked = true;
    commit("setForwardData", { type: "set", payload: item });
  } else {
    el.checked = !el.checked;
    let key = el.checked ? "set" : "del";
    commit("setForwardData", { type: key, payload: item });
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
    // 计算当前可视区域的高度加上滚动条顶部的位置（即实际已加载的内容高度）
    const height = scrollTop + clientHeight;
    // 判断页面是否完全加载，即底部距离小于或等于1个像素
    const isbot = scrollHeight - height < lower;
    // console.log(scrollHeight - height);
    if (isbot) console.log("isScrolledToBottom: 到底部");
    return isbot;
  } catch (e) {
    return false;
  }
};

// 加载更多消息的函数
const loadMoreMessages = () => {
  const current = currentMessageList.value?.length - 1;
  // 第一条消息 加载更多 节点
  const offsetTopScreen = messageViewRef.value?.children?.[current];
  const top = offsetTopScreen?.getBoundingClientRect().top;
  // 滚动到顶部
  const canLoadData = top >= 36;
  if (canLoadData) getMoreMsg();
  emitter.emit("onisbot", isScrolledToBottom());
};

const debouncedFunc = debounce(loadMoreMessages, 300); //防抖处理

const scrollbar = ({ scrollLeft, scrollTop }) => {
  // console.log("scrollLeft:", scrollLeft);
  // console.log("scrollTop:", scrollTop);
  debouncedFunc();
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
    // 获取指定会话的消息列表
    const { conversationID: convId } = currentConv.value;
    const msglist = currentMessageList.value;
    const nextMsgId = validatelastMessage(msglist).ID;
    console.log("nextMsgId:", nextMsgId);

    const result = await getMessageList({
      convId,
      nextReqMessageID: nextMsgId,
    });

    console.log("getMessageList:", result);
    const { isCompleted, messageList, nextReqMessageID } = result;
    if (!messageList.length && isCompleted) {
      console.log("[chat] 没有更多消息了 getMoreMsg:");
      commit("setConversationValue", { key: "noMore", value: true });
    } else if (messageList.length) {
      commit("loadMoreMessages", { convId, messages: messageList, msgId: messageList[0].ID });
      commit("setConversationValue", { key: "needScrollDown", value: msglist.length });
    } else {
      commit("setConversationValue", { key: "noMore", value: true });
    }
  } catch (e) {
    // 解析报错 关闭加载动画
    commit("setConversationValue", { key: "noMore", value: true });
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
  isConfirm.value = false;
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
  if (isOwner.value && currentType.value === "GROUP") {
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
  if (isRobot(toAccount.value)) {
    contextMenuItems.value = contextMenuItems.value.filter(
      (t) => t.id !== "reply" && t.id !== "revoke"
    );
  }
  if (isCustom) {
    contextMenuItems.value = contextMenuItems.value.filter((t) => t.id === "delete");
  }
};

const handlRightClick = (data) => {
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

const handlSingleClick = ({ item, id }) => {
  menuItemInfo.value = item;
  isConfirm.value = true;
  handlRightClick({ id });
};

const handleAt = (data) => {
  const { from, nick, conversationType: type } = data;
  if (type === "C2C") return;
  emitter.emit("handleAt", { id: from, name: nick });
};

const handleSendMessage = (data) => {
  dispatch("addConversation", { convId: `C2C${data.from}` });
};

const handleQuestion = async (item) => {
  const message = await sendChatMessage({
    convId: toAccount.value,
    convType: currentType.value,
    textMsg: item,
  });
  console.log("sendChatMessage:", message);
  dispatch("sendSessionMessage", {
    payload: {
      convId: currentConv.value.conversationID,
      message: message[0],
    },
  });
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
  commit("setReplyMsg", data);
  if (!isSelf(data)) handleAt(data);
  // 重置编辑器高度
  const chatBox = document.getElementById("chat-box"); //聊天框
  const editor = document.getElementById("editor");
  chatBox.style.height = `calc(100% - 60px - 200px)`;
  editor.style.height = `${200}px`;
};
// 删除消息
const handleDeleteMsg = async (data) => {
  try {
    if (isConfirm.value) {
      const message = { message: "确定删除?", iconType: "warning" };
      const result = await showConfirmationBox(message);
      if (result === "cancel") return;
    }
    isConfirm.value = true;
    const { code } = await deleteMessage([data]);
    if (code !== 0) return;
    commit("deleteMessage", { convId: data.conversationID, messageIdArray: [data.ID] });
  } catch (error) {
    console.log(error);
  }
};
// 多选
const handleMultiSelectMsg = (item) => {
  commit("setCheckboxState", true);
  handleSelect(null, item, "choice");
};
const handleRevokeChange = (data, type) => {
  if (data.type !== "TIMTextElem") return;
  commit("setRevokeMsg", { data, type });
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
  emitter.on("updataScroll", (type) => {
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
  emitter.off("updataScroll");
}

watch(
  needScrollDown,
  (data) => {
    updateLoadMore(data);
  },
  {
    deep: true, //深度监听
    immediate: true,
  }
);

watch(currentReplyMsg, () => {
  updateScrollbar();
});

onMounted(() => {
  onEmitter();
});
onUnmounted(() => {
  offEmitter();
});
onUpdated(() => {});
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
  flex-direction: column-reverse;
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
  .message-view-bottom {
    margin-top: 5px;
    font-size: 12px;
    opacity: 0.3;
    white-space: nowrap;
    transition: all 0.6s ease;
    color: #303030;
  }
  .message-view-question {
    font-size: 14px;
    margin-top: 5px;
    & > div {
      width: fit-content;
      padding: 6px 10px;
      margin-bottom: 8px;
      border-radius: 8px;
      font-weight: 400;
      border: 1px solid rgba(6, 7, 8, 0.15);
      color: rgba(6, 7, 9, 0.8);
      &:hover {
        background-color: rgba(6, 7, 9, 0.1);
      }
    }
    .question {
      cursor: pointer;
    }
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
