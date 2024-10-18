<template>
  <section
    class="message-info-view-content"
    v-show="currentConversation"
    :class="{ 'style-msg-box': !isChatBoxVisible, 'style-reply': currentReplyMsg }"
    id="chat-box"
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
          <div v-if="isTime(item)" class="message-view__item--time-divider">
            {{ timeFormat(item.time * 1000, true) }}
          </div>
          <!-- 消息体 -->
          <div
            v-else-if="item.ID && !isTime(item) && !item.isDeleted"
            class="message-view__item"
            :class="[
              isSelf(item) ? 'is-self' : 'is-other',
              showCheckbox && !item.isRevoked ? 'style-choice' : '',
            ]"
            @click="handleSelect($event, item, 'outside')"
            :id="`choice${item.ID}`"
          >
            <!-- 多选框 -->
            <Checkbox
              :item="item"
              :isRevoked="item.isRevoked"
              @click.stop="handleSelect($event, item, 'initial')"
            />
            <div class="picture select-none" v-if="showAvatar(item)">
              <el-avatar
                :size="36"
                shape="square"
                @click.stop="onClickAvatar($event, item)"
                :src="item.avatar || fnAvatar(item.from) || squareUrl"
                @error="() => true"
                v-contextmenu:contextmenu
                @contextmenu.prevent="handleContextAvatarMenuEvent($event, item)"
              >
                <img :src="emptyUrl" />
              </el-avatar>
            </div>
            <div
              :class="msgOne(item)"
              v-contextmenu:contextmenu
              @contextmenu.prevent="handleContextMenuEvent($event, item)"
            >
              <NameComponent :item="item" />
              <div :class="msgType(item.type)" :id="item.ID">
                <component
                  :key="item.ID"
                  :is="loadMsgModule(item)"
                  :message="item"
                  :status="item.status"
                  :self="isSelf(item)"
                >
                </component>
              </div>
            </div>
            <!-- 消息发送加载状态 -->
            <Stateful :item="item" :status="item.status" :isown="isSelf(item)" />
          </div>
        </div>
      </div>
    </el-scrollbar>
    <!-- 卡片 -->
    <MyPopover />
    <contextmenu ref="contextmenu" :disabled="!isRight">
      <contextmenu-item
        v-for="item in RIGHT_CLICK_MENU_LIST"
        :key="item.id"
        @click="handlRightClick(item)"
      >
        <p :class="['item']">{{ item.text }}</p>
      </contextmenu-item>
    </contextmenu>
  </section>
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
  watch,
  watchEffect,
} from "vue";
import { showConfirmationBox } from "@/utils/message";
import { useStore } from "vuex";
import { AVATAR_LIST, MENU_LIST, RIGHT_CLICK_MENU_LIST, emptyUrl, squareUrl } from "../utils/menu";
import {
  handleCopyMsg,
  loadMsgModule,
  msgOne,
  msgType,
  validatelastMessage,
  isSelf,
} from "../utils/utils";

import { deleteMessage, getMessageList, revokeMsg, translateText } from "@/api/im-sdk-api/index";
import { HISTORY_MESSAGE_COUNT, MULTIPLE_CHOICE_MAX } from "@/constants/index";
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
import Stateful from "../components/Stateful.vue";
import { fnAvatar } from "@/ai/utils";

const timeout = ref(false);
const isRight = ref(true);
const MenuItemInfo = ref([]);
const scrollbarRef = ref(null);
const messageViewRef = ref(null);
const { dispatch, commit } = useStore();
const { isOwner, toAccount, currentType } = useGetters(["isOwner", "toAccount", "currentType"]);
const {
  noMore,
  isChatBoxVisible,
  forwardData,
  showCheckbox,
  needScrollDown,
  currentReplyMsg,
  currentMessageList,
  currentConversation,
} = useState({
  noMore: (state) => state.conversation.noMore,
  isChatBoxVisible: (state) => state.conversation.isChatBoxVisible,
  forwardData: (state) => state.conversation.forwardData,
  showCheckbox: (state) => state.conversation.showCheckbox,
  needScrollDown: (state) => state.conversation.needScrollDown,
  currentReplyMsg: (state) => state.conversation.currentReplyMsg,
  currentMessageList: (state) => state.conversation.currentMessageList,
  currentConversation: (state) => state.conversation.currentConversation,
});

const updateLoadMore = (value) => {
  nextTick(() => {
    const elRef = messageViewRef.value?.children?.[value - 1];
    if (!elRef) return;
    console.log("messageViewRef:", elRef);
    console.log("updateLoadMore:", value);
    value > 0 ? elRef.scrollIntoView({ block: "start" }) : elRef.scrollIntoViewIfNeeded();
  });
};

const showAvatar = (item) => {
  return (
    !item.isRevoked && item.type !== "TIMGroupTipElem" && item?.payload?.description !== "dithering"
  );
};

const getElementById = (ID) => {
  return document.getElementById(`choice${ID}`);
};

const setSelect = (el) => {
  el.classList.toggle("style-select");
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
  const _el = getElementById(item.ID);
  const el = _el.getElementsByClassName("check-btn")[0];
  if (!el.checked && forwardData.value.size >= MULTIPLE_CHOICE_MAX) {
    commit("showMessage", {
      message: `最多只能选择${MULTIPLE_CHOICE_MAX}条`,
      type: "error",
    });
    return;
  }
  setSelect(_el.parentNode);
  // 点击input框
  if (type == "initial" && e.target.tagName !== "INPUT") {
    const el = getElementById(item.ID);
    setSelect(el.parentNode);
  }
  // 首次右键打开多选 默认选中当前
  if (type == "choice") {
    el.checked = true;
    commit("setForwardData", {
      type: "set",
      payload: item,
    });
  } else {
    el.checked = !el.checked;
    commit("setForwardData", {
      type: el.checked ? "set" : "del",
      payload: item,
    });
  }
};

const isTime = (item) => {
  return item?.isTimeDivider && item.time !== undefined;
};

const onClickAvatar = (e, item) => {
  const self = isSelf(item);
  if (self || showCheckbox.value) return;
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
    const { conversationID: convId } = currentConversation.value;
    const msglist = currentMessageList.value;
    const nextMsgId = validatelastMessage(msglist).ID
    console.log("nextMsgId:", nextMsgId);

    const result = await getMessageList({
      conversationID: convId,
      nextReqMessageID: nextMsgId,
    });

    console.log("getMessageList:", result)
    const { isCompleted, messageList, nextReqMessageID } = result;

    if (isCompleted || !messageList.length) {
      console.log("[chat] 没有更多消息了 getMoreMsg:");
      commit("setConversationValue", { key: "noMore", value: true });
    } else {
      commit("SET_HISTORYMESSAGE", {
        type: "ADD_MORE_MESSAGE",
        payload: { convId, messages: messageList },
      });
      commit("setConversationValue", { key: "needScrollDown", value: msglist.length });
    }
  } catch (e) {
    // 解析报错 关闭加载动画
    commit("setConversationValue", { key: "noMore", value: true });
  }
};

const handleContextAvatarMenuEvent = (event, item) => {
  const { flow } = item;
  const type = currentType.value;
  if (type == "C2C" || flow == "out") {
    isRight.value = false;
    return;
  }
  isRight.value = true;
  MenuItemInfo.value = item;
  RIGHT_CLICK_MENU_LIST.value = AVATAR_LIST;
};
const handleContextMenuEvent = (event, item) => {
  const { isRevoked, time, type, payload } = item;
  console.log(item, "右键菜单数据");
  const isTip = type == "TIMGroupTipElem";
  const isFile = type == "TIMFileElem";
  const isRelay = type == "TIMRelayElem";
  const isDithering = payload?.description === "dithering";
  const isCheckStatus = showCheckbox.value; // 多选状态
  // 撤回消息 提示类型消息
  if (isRevoked || isTip || isCheckStatus || isDithering) {
    isRight.value = false;
    return;
  }
  timeout.value = false;
  isRight.value = true;
  const nowtime = parseInt(new Date().getTime() / 1000);
  MenuItemInfo.value = item;
  const relinquish = nowtime - time < 120 ? true : false;
  const self = isSelf(item);
  RIGHT_CLICK_MENU_LIST.value = MENU_LIST;
  // 对方消息
  if (!self) {
    RIGHT_CLICK_MENU_LIST.value = MENU_LIST.filter((t) => t.id !== "revoke");
  }
  // 超过撤回时间
  if (!relinquish) {
    timeout.value = true;
    RIGHT_CLICK_MENU_LIST.value = MENU_LIST.filter((t) => t.id !== "revoke");
  }
  // 群主 & 群聊 & 撤回时间不限制2分钟
  if (isOwner.value && currentType.value === "GROUP") {
    // if (!self)
    RIGHT_CLICK_MENU_LIST.value = MENU_LIST;
  }
  // 合并消息
  if (isRelay) {
    RIGHT_CLICK_MENU_LIST.value = RIGHT_CLICK_MENU_LIST.value.filter((t) => t.id !== "copy");
  }
  // 非文件消息
  if (!isFile) {
    RIGHT_CLICK_MENU_LIST.value = RIGHT_CLICK_MENU_LIST.value.filter((t) => t.id !== "saveAs");
  } else {
    RIGHT_CLICK_MENU_LIST.value = RIGHT_CLICK_MENU_LIST.value.filter((t) => t.id !== "copy");
  }
  // 机器人消息过滤回复
  if (isRobot(toAccount.value)) {
    RIGHT_CLICK_MENU_LIST.value = RIGHT_CLICK_MENU_LIST.value.filter((t) => t.id !== "reply");
  }
};
const handlRightClick = (data) => {
  const info = MenuItemInfo.value;
  const { id, text } = data;
  switch (id) {
    case "send": // 发起会话
      handleSendMessage(info);
      break;
    case "ait": // @对方
      handleAt(info);
      break;
    case "copy": //复制
      handleCopyMsg(info);
      break;
    case "translate": // 翻译
      handleTranslate(info);
      break;
    case "revoke": //撤回
      handleRevokeMsg(info);
      break;
    case "forward": // 转发
      handleForward(info);
      break;
    case "saveAs": //另存为
      handleSave(info);
      break;
    case "reply": // 回复
      handleReplyMsg(info);
      break;
    case "multiSelect": //多选
      handleMultiSelectMsg(info);
      break;
    case "delete": //删除
      handleDeleteMsg(info);
      break;
  }
};
const handleAt = (data) => {
  const { from, nick, conversationType: type } = data;
  if (type === "C2C") return;
  emitter.emit("handleAt", { id: from, name: nick });
};
const handleSendMessage = (data) => {
  dispatch("addConversation", { convId: `C2C${data.from}` });
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
  !isSelf(data) && handleAt(data);
  // 重置编辑器高度
  const chatBox = document.getElementById("chat-box"); //聊天框
  const editor = document.getElementById("editor");
  chatBox.style.height = `calc(100% - 60px - 200px)`;
  editor.style.height = `${200}px`;
};
// 删除消息
const handleDeleteMsg = async (data) => {
  try {
    const message = { message: "确定删除?", iconType: "warning" };
    const result = await showConfirmationBox(message);
    if (result === "cancel") return;
    const { code } = await deleteMessage([data]);
    if (code !== 0) return;
    commit("SET_HISTORYMESSAGE", {
      type: "DELETE_MESSAGE",
      payload: { convId: data.conversationID },
    });
  } catch (error) {
    console.log(error);
  }
};
// 多选
const handleMultiSelectMsg = (item) => {
  commit("setCheckboxState", true);
  handleSelect(null, item, "choice");
};
const handleRevokeChange = (msg, type) => {
  if (msg.type !== "TIMTextElem") return;
  commit("setRevokeMsg", { data: msg, type: type });
};
// 撤回消息
const handleRevokeMsg = async (data) => {
  if (timeout.value) {
    const result = await showConfirmationBox({ message: "确定撤回这条消息?", iconType: "warning" });
    if (result == "cancel") return;
  }
  const { code, message } = await revokeMsg(data);
  if (code !== 0) return;
  if (message.flow !== "out") return;
  handleRevokeChange(message, "set");
  setTimeout(() => {
    handleRevokeChange(message, "delete");
  }, 60000);
};
// watchEffect(() => {});
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
.message-view__tips-elem {
  margin: auto;
  .message-name {
    display: none;
  }
}
.message-view__item--index {
  max-width: 70%;
}
.message-info-view-content {
  height: calc(100% - 60px - 200px);
  // border-bottom: 1px solid var(--color-border-default);
  // transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.style-msg-box {
  height: calc(100% - 60px) !important;
}
.style-reply {
  height: calc(100% - 60px - 200px - 60px) !important;
}
.message-view__item--time-divider {
  user-select: none;
  position: relative;
  top: 8px;
  margin: 20px 0;
  max-height: 20px;
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  color: var(--color-time-divider);
}
.message-view {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  overflow-y: overlay;
  overflow-x: hidden;
  padding: 0 16px 16px 16px;
  box-sizing: border-box;
  .picture {
    --el-border-radius-base: 6px;
    --el-text-color-disabled: #ffffff00;
    cursor: pointer;
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
}
.message-view__item {
  display: flex;
  flex-direction: row;
  margin: 8px 0;
  position: relative;
}
.is-other {
  .picture {
    margin-left: 0;
    margin-right: 8px;
  }
  .message-view__img {
    margin-bottom: 5px;
    width: 100%;
  }

  .message-view__file {
    margin-bottom: 5px;
  }

  .message-view__text {
    width: 100%;
    margin-bottom: 5px;
  }
}
.is-self {
  flex-direction: row-reverse;
  display: flex;
  .picture {
    margin-right: 0;
    margin-left: 8px;
    width: 36px;
    height: 36px;
  }
  .message-name {
    display: none;
  }
  .message-view__img {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .message-view__file {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .message-view__text {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
