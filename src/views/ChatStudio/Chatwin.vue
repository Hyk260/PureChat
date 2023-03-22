<template>
  <section
    class="message-info-view-content"
    v-show="currentConversation"
    :class="[showMsgBox ? '' : 'style-MsgBox']"
    id="svgTop"
  >
    <el-scrollbar
      class="scrollbar-content"
      ref="scrollbarRef"
      @scroll="scrollbar"
      always
    >
      <div class="message-view" ref="messageViewRef">
        <div
          v-for="(item, index) in currentMessageList"
          :key="item.ID"
          :class="{ 'reset-select': !showCheckbox }"
        >
          <LoadMore :index="index" />
          <div class="message-view__item--blank"></div>
          <div class="message-view__item--time-divider" v-if="isTime(item)">
            {{ timeFormat(item.time * 1000, true) }}
          </div>
          <div
            v-if="!isTime(item) && !item.isDeleted"
            class="message-view__item"
            :class="{
              'is-self': ISown(item),
              'is-other': !ISown(item),
              'style-choice': showCheckbox,
            }"
            @click="handleChecked($event, item)"
          >
            <Checkbox :item="item" @click.stop="handleCilck($event, item)" />
            <div
              class="picture"
              v-if="!item.isRevoked && item.type !== 'TIMGroupTipElem'"
            >
              <el-avatar
                :size="36"
                shape="square"
                @click.stop="onclickavatar($event, item)"
                :src="item.avatar || circleUrl"
              >
              </el-avatar>
            </div>
            <div
              :class="msgOne(item)"
              v-contextmenu:contextmenu
              @contextmenu.prevent="ContextMenuEvent($event, item)"
            >
              <name-component :item="item" />
              <div :class="Megtype(item.type)" :id="item.ID">
                <component
                  :key="item.ID"
                  :is="loadMsgComponents(item.type, item)"
                  :message="item"
                >
                </component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <MyPopover />
    <contextmenu ref="contextmenu">
      <contextmenu-item
        v-for="item in RIGHT_CLICK_MENU_LIST"
        :key="item.id"
        @click="ClickMenuItem(item)"
        v-show="isRight"
      >
        {{ item.text }}
      </contextmenu-item>
    </contextmenu>
  </section>
</template>

<script setup>
import {
  h,
  ref,
  watch,
  nextTick,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeUpdate,
  computed,
  onBeforeUnmount,
  toRefs,
  defineAsyncComponent,
} from "vue";
import {
  squareUrl,
  circleUrl,
  MENU_LIST,
  RIGHT_CLICK_MENU_LIST,
} from "./utils/menu";
import { useStore } from "vuex";
import { ElMessageBox } from "element-plus";
import { fncopy, dragControllerDiv } from "./utils/utils";

import { timeFormat } from "@/utils/timeFormat";
import { debounce, delay } from "@/utils/debounce";
import { throttle } from "@/utils/throttle";
import { useEventListener } from "@/utils/hooks/index";
import { useState } from "@/utils/hooks/useMapper";
import { Contextmenu, ContextmenuItem } from "v-contextmenu";
import Checkbox from "./components/Checkbox.vue";
import LoadMore from "./components/LoadMore.vue";
import MyPopover from "@/views/components/MyPopover/index.vue";
import { HISTORY_MESSAGE_COUNT } from "@/store/mutation-types";
import { deleteMsgList, revokeMsg, getMsgList } from "@/api/im-sdk-api";
import emitter from "@/utils/mitt-bus";
import { useWatermark } from "@/utils/hooks/useWatermark";

import TextElemItem from "./ElemItemTypes/TextElemItem.vue";
import TipsElemItem from "./ElemItemTypes/TipsElemItem.vue";
import ImageElemItem from "./ElemItemTypes/ImageElemItem.vue";
import FileElemItem from "./ElemItemTypes/FileElemItem.vue";
import CustomElemItem from "./ElemItemTypes/CustomElemItem.vue";
import groupTipElement from "./ElemItemTypes/groupTipElement.vue";
import GroupSystemNoticeElem from "./ElemItemTypes/GroupSystemNoticeElem.vue";

const isRight = ref(true);
const MenuItemInfo = ref([]);
const scrollbarRef = ref(null);
const messageViewRef = ref(null);
// const cardData = ref(null);
const watermarkText = ref("pure-admin");
const { state, dispatch, commit } = useStore();
const { setWatermark, clear } = useWatermark();
const {
  noMore,
  userInfo,
  showMsgBox,
  forwardData,
  showCheckbox,
  needScrollDown,
  currentMessageList,
  currentConversation,
} = useState({
  userInfo: (state) => state.data.user,
  noMore: (state) => state.conversation.noMore,
  showMsgBox: (state) => state.conversation.showMsgBox,
  forwardData: (state) => state.conversation.forwardData,
  showCheckbox: (state) => state.conversation.showCheckbox,
  needScrollDown: (state) => state.conversation.needScrollDown,
  currentMessageList: (state) => state.conversation.currentMessageList,
  currentConversation: (state) => state.conversation.currentConversation,
});

const NameComponent = (props) => {
  const { item } = props;
  // 撤回消息 群提示消息 不显示
  const { isRevoked, type, from, nick, conversationType } = item;
  const show = isRevoked || type == "TIMGroupTipElem";
  // 系统消息
  const isSystem = from == "@TIM#SYSTEM";
  // 非单聊消息
  const isGroup = conversationType !== "C2C";
  // type 元素的类型
  // propsOrChildren 数据对象, 这里主要表示(props, attrs, dom props, class 和 style)
  // children 子节点
  return h(
    "div",
    {
      style: { display: show ? "none" : "" },
      class: "message_name",
    },
    [
      isSystem ? h("span", { class: "isSystem" }, "系统") : null,
      isGroup ? h("span", { class: "isGroup" }, nick) : null,
    ]
  );
};

const updateLoadMore = (newValue) => {
  nextTick(() => {
    const ViewRef = messageViewRef.value;
    const elRef = ViewRef?.children?.[newValue - 1];
    if (newValue > 0) {
      // console.log(elRef);
      elRef?.scrollIntoView({
        block: "start",
      });
    } else {
      // console.log(elRef);
      elRef?.scrollIntoViewIfNeeded();
    }
  });
};
// 多选框
const handleCilck = (e, item) => {
  // 处理触发两次bug
  if (e.target.tagName == "INPUT") return;
  const el = document.getElementById(`${item.ID}`);
  el.parentNode.classList.toggle("style-select");
};

const handleChecked = (e, item) => {
  if (!showCheckbox.value) return;
  if (item.type == "TIMGroupTipElem") return;
  if (item.isRevoked) return;
  const _el = document.getElementById(`${item.ID}`);
  const el = _el.getElementsByTagName("input")[0];
  _el.parentNode.classList.toggle("style-select");
  if (el.checked) {
    el.checked = false;
    commit("SET_FORWARD_DATA", {
      type: "del",
      payload: item,
    });
  } else {
    el.checked = true;
    commit("SET_FORWARD_DATA", {
      type: "set",
      payload: item,
    });
  }
};

const isTime = (item) => {
  return item?.isTimeDivider;
};
const ISown = (item) => {
  return item.from == userInfo.value.username;
};

const onclickavatar = (e, item) => {
  const isSelf = ISown(item);
  if (isSelf) return;
  // cardData.value = item;
  commit("setPopoverStatus", {
    status: true,
    seat: e,
    cardData: item,
  });
};

const loadMoreFn = () => {
  if (!noMore.value) {
    const current = currentMessageList.value?.length - 1;
    // 第一条消息 加载更多 节点
    const offsetTopScreen = messageViewRef.value?.children?.[current];
    const top = offsetTopScreen?.getBoundingClientRect().top;
    const canLoadData = top > 50; //滚动到顶部
    canLoadData && getMoreMsg();
  }
};
const debouncedFunc = debounce(loadMoreFn, 250); //防抖处理
const scrollbar = ({ scrollLeft, scrollTop }) => {
  debouncedFunc();
};

const updateScrollBarHeight = () => {
  nextTick(() => {
    // messageViewRef.value?.firstElementChild?.scrollIntoView();
    const ViewRef = messageViewRef.value;
    scrollbarRef.value?.scrollTo(0, ViewRef?.scrollHeight);
  });
};

const updateScrollbar = () => {
  scrollbarRef.value.update();
};

const validatelastMessage = (msglist) => {
  let msg = null;
  for (let i = msglist.length - 1; i > -1; i--) {
    if (msglist[i].ID) {
      msg = msglist[i];
      break;
    }
  }
  return msg;
};

const getMoreMsg = async () => {
  try {
    // 获取指定会话的消息列表
    const Conv = currentConversation.value;
    const msglist = currentMessageList.value;
    const { conversationID, toAccount } = Conv;
    const msg = validatelastMessage(msglist);
    const { ID } = msg;
    const result = await getMsgList({
      conversationID: conversationID,
      nextReqMessageID: ID,
    });
    // console.log(result, "getMsgList");
    const { isCompleted, messageList, nextReqMessageID } = result;
    let noMore = true;
    let Loadmore = messageList.length < HISTORY_MESSAGE_COUNT;
    if (messageList.length > 0) noMore = Loadmore;
    const Response = messageList;
    const payload = {
      convId: conversationID,
      messages: Response,
    };
    commit("SET_HISTORYMESSAGE", {
      type: "ADD_MORE_MESSAGE",
      payload,
    });
    commit("SET_CONVERSATION", {
      type: "UPDATE_SCROLL_DOWN",
      payload: msglist.length,
    });
    if (isCompleted || messageList.length == 0) {
      console.log("没有更多消息了！！！");
      commit("SET_HISTORYMESSAGE", {
        type: "UPDATE_NOMORE",
        payload: noMore,
      });
      return;
    }
  } catch (e) {
    // 解析报错 关闭加载动画
    commit("SET_HISTORYMESSAGE", {
      type: "UPDATE_NOMORE",
      payload: true,
    });
    // console.log(e, "err更多消息");
  }
};

// 动态组件
const loadMsgComponents = (elem_type, item) => {
  // console.log(elem_type, item);
  let resp = "";
  const CompMap = {
    TextElemItem: TextElemItem,
    TipsElemItem: TipsElemItem,
    ImageElemItem: ImageElemItem,
    FileElemItem: FileElemItem,
    CustomElemItem: CustomElemItem,
    groupTipElement: groupTipElement,
    GroupSystemNoticeElem: GroupSystemNoticeElem,
  };
  // 撤回消息
  if (item.isRevoked) {
    resp = "TipsElemItem";
    return CompMap[resp];
  }
  switch (elem_type) {
    case "TIMTextElem": // 文本消息
      resp = "TextElemItem";
      break;
    case "TIMImageElem": // 图片消息
      resp = "ImageElemItem";
      break;
    case "TIMFileElem": // 文件消息
      resp = "FileElemItem";
      break;
    case "TIMGroupTipElem": // 群消息提示
      resp = "groupTipElement";
      break;
    case "TIMGroupSystemNoticeElem": // 系统通知
      resp = "GroupSystemNoticeElem";
      break;
    case "TIMCustomElem": // 自定义消息
      resp = "CustomElemItem";
      break;
    default:
      resp = "";
      break;
  }
  // console.log(resp);
  return CompMap[resp];
};
// 动态class
const Megtype = (elem_type) => {
  // console.log(elem_type);
  let resp = "";
  switch (elem_type) {
    case "TIMTextElem":
      resp = "message-view__text"; // 文本
      break;
    case "TIMGroupTipElem":
      resp = "message-view__tips-elem"; // 群消息提示
      break;
    case "TIMImageElem":
      resp = "message-view__img"; // 图片消息
      break;
    case "TIMFileElem":
      resp = "message-view__file"; // 文件消息
      break;
    case "TIMGroupSystemNoticeElem":
      resp = "message-view__system"; // 系统通知
      break;
    case "TIMCustomElem":
      resp = "message-view__text message-view__custom"; // 自定义消息
      break;
    default:
      resp = "";
      break;
  }
  return resp;
};

const msgOne = (item) => {
  const { isRevoked, type } = item;
  if (isRevoked) {
    return "message-view__tips-elem";
  } else if (type == "TIMGroupTipElem") {
    return "message-view__tips-elem";
  } else {
    return "message-view__item--index";
  }
};

const ContextMenuEvent = (event, item) => {
  const { isRevoked, time, type } = item;
  console.log(item, "右键菜单数据");
  const isTip = type == "TIMGroupTipElem";
  // 撤回消息 提示类型消息
  if (isRevoked || isTip) {
    isRight.value = false;
    return;
  }
  isRight.value = true;
  const nowtime = parseInt(new Date().getTime() / 1000);
  MenuItemInfo.value = item;
  const relinquish = nowtime - time < 120 ? true : false;
  const self = ISown(item);
  RIGHT_CLICK_MENU_LIST.value = MENU_LIST;
  if (!self) {
    RIGHT_CLICK_MENU_LIST.value = MENU_LIST.filter((t) => t.id !== "revoke");
  }
  if (!relinquish) {
    RIGHT_CLICK_MENU_LIST.value = MENU_LIST.filter((t) => t.id !== "revoke");
  }
};

const ClickMenuItem = (data) => {
  const Info = MenuItemInfo.value;
  const { id, text } = data;
  switch (id) {
    case "copy": //复制
      fncopy(Info);
      break;
    case "revoke": //撤回
      revokes(Info);
      break;
    case "multiSelect": //多选
      multiSelect(Info);
      break;
    case "delete": //删除
      fndelete(Info);
      break;
  }
};
// 删除消息
const fndelete = async (data) => {
  try {
    const formEl = await ElMessageBox.confirm("确定删除?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
    if (formEl == "cancel") return;
    const { code } = await deleteMsgList(data);
    if (code !== 0) return;
    const { conversationID, toAccount, to } = data;
    commit("SET_HISTORYMESSAGE", {
      type: "DELETE_MESSAGE",
      payload: {
        convId: conversationID,
        message: data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
// 多选
const multiSelect = (data) => {
  commit("SET_CHEC_BOX", true);
};
// 撤回消息
const revokes = (data) => {
  const { code, message } = revokeMsg(data);
};

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

emitter.on("updataScroll", (e) => {
  updateScrollBarHeight();
});

onMounted(() => {
  nextTick(() => {
    setWatermark(watermarkText.value);
  });
});
onUnmounted(() => {});
onUpdated(() => {});
onBeforeUpdate(() => {});
onBeforeUnmount(() => {
  clear();
});

// eslint-disable-next-line no-undef
defineExpose({ updateScrollbar, updateScrollBarHeight });
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
$other-msg-color: #f0f2f5;
$self-msg-color: #c2e8ff;
.scrollbar-content {
  height: 100%;
}
.message_name {
  margin-bottom: 5px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}
.message-view__tips-elem {
  margin: auto;
  .message_name {
    display: none;
  }
}
.message-info-view-content {
  height: calc(100% - 70px - 206px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}
.style-MsgBox {
  height: calc(100% - 60px) !important;
}

.scrollbar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.message-view__item--time-divider {
  position: relative;
  top: 8px;
  margin: 20px 0;
  max-height: 20px;
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
.message-view {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  overflow-y: overlay;
  overflow-x: hidden;
  padding: 0 16px 30px 16px;
  box-sizing: border-box;
}
.style-select {
  border-radius: 3px;
  background: hsl(220deg 20% 91%);
}
.reset-select {
  border-radius: 3px;
  background: #fff;
}
.style-choice {
  padding-left: 35px;
}
.message-view__item {
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  position: relative;
}
.is-other {
  .picture {
    margin-left: 0;
    margin-right: 8px;
  }
  .message-view__img {
    margin-bottom: 5px;
    width: fit-content;
    :deep(.image_preview) {
      background: $other-msg-color;
    }
  }

  .message-view__file {
    margin-bottom: 5px;
  }

  .message-view__text {
    width: fit-content;
    margin-bottom: 5px;
    :deep(.message-view__item--text) {
      background: $other-msg-color;
    }
  }
  .message-view__system {
    :deep(.message-view__item--text) {
      background: $other-msg-color;
    }
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
  .message_name {
    display: none;
  }
  .message-view__img {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
    align-items: center;
    :deep(.image_preview) {
      background: $self-msg-color;
    }
  }

  .message-view__file {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
    align-items: center;
  }

  .message-view__text {
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    :deep(.message-view__item--text) {
      background: $self-msg-color;
    }
  }
}

.v-contextmenu {
  width: 154px;
  .v-contextmenu-item {
    height: 32px;
    line-height: 32px;
    padding: 0px 16px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
  }
}
</style>
