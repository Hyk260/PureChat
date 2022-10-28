<!-- eslint-disable no-undef -->
<template>
  <section
    class="message-info-view-content"
    :class="[showMsgBox ? '' : 'style-MsgBox']"
    id="svgTop"
  >
    <el-scrollbar
      class="scrollbar-content"
      ref="scrollbarRef"
      @scroll="scroll"
      always
    >
      <div class="message-view" ref="messageViewRef">
        <div v-for="(item, index) in currentMessageList" :key="item.ID">
          <!-- 加载更多 -->
          <LoadMore
            :noMore="noMore"
            v-if="index === currentMessageList.length - 1"
          />
          <div class="message-view__item--blank"></div>
          <!-- 时间 -->
          <div
            class="message-view__item--time-divider"
            v-if="item.isTimeDivider"
          >
            {{ timeFormat(item.time * 1000, true) }}
          </div>
          <!-- 消息 is-self is-other-->
          <div
            v-if="!item.isTimeDivider && !item.isDeleted"
            class="message-view__item"
            :class="ISown(item) ? 'is-self' : 'is-other'"
            :id="item.ID"
          >
            <!-- 头像 -->
            <div class="picture" v-if="!item.isRevoked">
              <el-avatar
                :size="36"
                shape="square"
                :src="item.avatar || circleUrl"
              >
              </el-avatar>
            </div>
            <!-- 内容 -->
            <div
              :class="msgOne(item)"
              v-contextmenu:contextmenu
              @contextmenu.prevent="ContextMenuEvent($event, item)"
            >
              <div class="message_name">
                <span v-if="item.from == '@TIM#SYSTEM'"> 系统 </span>
                <span v-else>
                  {{ item.from }}
                </span>
              </div>
              <div :class="Megtype(item.type)">
                <component
                  :is="loadMsgComponents(item.type, item)"
                  :message="item"
                >
                </component>
              </div>
            </div>
          </div>
        </div>
        <!-- 右键菜单 -->
        <contextmenu ref="contextmenu">
          <contextmenu-item
            v-for="item in RIGHT_CLICK_MENU_LIST"
            :key="item.id"
            @click="ClickMenuItem(item)"
          >
            {{ item.text }}
          </contextmenu-item>
        </contextmenu>
      </div>
    </el-scrollbar>
  </section>
</template>

<script setup>
import {
  ref,
  watch,
  nextTick,
  onMounted,
  onUpdated,
  onBeforeUpdate,
  computed,
  onBeforeUnmount,
} from "vue";
import {
  squareUrl,
  circleUrl,
  MENU_LIST,
  RIGHT_CLICK_MENU_LIST,
} from "./utils/menu";
import { useStore } from "vuex";
import { fncopy, dragControllerDiv } from "./utils/utils";
import { timeFormat } from "@/utils/timeFormat";
import { debounce, delay } from "@/utils/debounce";
import { throttle } from "@/utils/throttle";
import { useState } from "@/utils/hooks/useMapper";
import { Contextmenu, ContextmenuItem } from "v-contextmenu";
import TextElemItem from "./components/TextElemItem";
import TipsElemItem from "./components/TipsElemItem";
import ImageElemItem from "./components/ImageElemItem";
import LoadMore from "./components/LoadMore.vue";
import { HISTORY_MESSAGE_COUNT } from "@/store/mutation-types";
import { deleteMsgList, revokeMsg, getMsgList } from "@/api/im-sdk-api";

const max = ref(0);
const MenuItemInfo = ref([]);
const scrollbarRef = ref(null);
const messageViewRef = ref(null);
const { state, dispatch, commit } = useStore();
const {
  noMore,
  userInfo,
  showMsgBox,
  needScrollDown,
  currentMessageList,
  currentConversation,
} = useState({
  userInfo: (state) => state.data.user,
  noMore: (state) => state.conversation.noMore,
  showMsgBox: (state) => state.conversation.showMsgBox,
  needScrollDown: (state) => state.conversation.needScrollDown,
  currentMessageList: (state) => state.conversation.currentMessageList,
  currentConversation: (state) => state.conversation.currentConversation,
});

const UpdataScrollInto = () => {
  nextTick(() => {
    // console.log(messageViewRef.value);
    // console.log(messageViewRef.value.firstElementChild);
    // messageViewRef.value.firstElementChild?.scrollIntoView();
    // setTimeout(() => {
    // max.value = messageViewRef.value.clientHeight - 380;
    // scrollbarRef.value.setScrollTop(max.value);
    messageViewRef.value.firstElementChild?.scrollIntoView();
    // }, 10);
  });
};
const updateLoadMore = (newValue) => {
  nextTick(() => {
    const ViewRef = messageViewRef.value;
    if (newValue > 0) {
      console.log(ViewRef?.children?.[newValue - 1]);
      ViewRef?.children?.[newValue - 1]?.scrollIntoView({
        block: "start",
      });
      // ({ behavior: 'smooth', block: 'center' })
    } else {
      console.log(ViewRef?.children?.[newValue]);
      ViewRef?.children?.[newValue]?.scrollIntoViewIfNeeded();
    }
  });
};
watch(
  currentMessageList,
  (data) => {
    // console.log(data, "needScrollDown");
    // updateLoadMore(data);
    UpdataScrollInto();
  },
  {
    deep: true, //深度监听
    immediate: true,
  }
);
watch(
  needScrollDown,
  (data) => {
    console.log(data, "needScrollDown");
    // updateLoadMore(data);
  },
  {
    deep: true, //深度监听
    immediate: true,
  }
);

onMounted(() => {
  Monitorscrollbar();
});
onUpdated(() => {
  // console.log(needScrollDown.value, "onUpdated_needScrollDown");
  // updateLoadMore(needScrollDown.value);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", scrollbar);
});

const ISown = (item) => {
  return item.from == userInfo.value.username;
};

const scrollbar = (e) => {
  debounce(() => {
    if (!noMore.value) {
      const current = currentMessageList.value?.length - 1;
      // 第一条消息 加载更多 节点
      const offsetTopScreen = messageViewRef.value?.children?.[current];
      const top = offsetTopScreen?.getBoundingClientRect().top;
      const canLoadData = top > 50; //滚动到顶部
      canLoadData && getMoreMsg();
    }
  }); //防抖处理
};

const UpdateScrollbar = () => {
  scrollbarRef.value.update();
};

const scroll = async ({ scrollTop }) => {
  // throttle(() => {
  //   const maxScroll = messageViewRef.value?.clientHeight - 401;
  //   let client = maxScroll / 2;
  //   console.log(scrollTop);
  //   console.log(client,maxScroll);
  //   let off = scrollTop < client;
  //   console.log(off);
  // }, 500);
};

const Monitorscrollbar = () => {
  scrollbarRef.value.wrap$.addEventListener("scroll", scrollbar);
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
    console.log(ID);
    const result = await getMsgList({
      conversationID: conversationID,
      nextReqMessageID: ID,
    });
    console.log(result, "getMsgList");
    const { isCompleted, messageList, nextReqMessageID } = result;
    let noMore = true;
    let Loadmore = messageList.length < HISTORY_MESSAGE_COUNT;
    if (messageList.length > 0) noMore = Loadmore;
    const Response = messageList;
    const payload = {
      convId: toAccount,
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
    console.log(e, "err更多消息");
  }
};

// 动态组件
const loadMsgComponents = (elem_type, item) => {
  // console.log(elem_type);
  let resp = null;
  let CompMap = {
    TextElemItem: TextElemItem,
    TipsElemItem: TipsElemItem,
    ImageElemItem: ImageElemItem,
  };
  // 撤回消息
  if (item.isRevoked) {
    resp = "TipsElemItem";
    return CompMap[resp];
  }
  switch (elem_type) {
    case "TIMTextElem":
      resp = "TextElemItem"; // 文本消息
      break;
    case "TIMImageElem":
      resp = "ImageElemItem"; // 图片消息
      break;
    default:
      resp = "TextElemItem";
      break;
  }
  // console.log(resp);
  return CompMap[resp];
};
// 动态class
const Megtype = (elem_type) => {
  let resp = "";
  switch (elem_type) {
    case "TIMTextElem":
      resp = "message-view__text"; // 文本
      break;
    case "TIMGroupTipElem":
      resp = "group-tips-elem-item"; // 系统提示
      break;
    case "TIMImageElem":
      resp = "message-view__img"; // 图片消息
      break;
    default:
      resp = "";
      break;
  }
  return resp;
};

const msgOne = (item) => {
  const { isRevoked } = item;
  if (isRevoked) {
    return "group-tips-elem-item";
  } else {
    return "message-view__item--index";
  }
};

const ContextMenuEvent = (event, item) => {
  console.log(item, "currentMessageList");
  const nowtime = parseInt(new Date().getTime() / 1000);
  const { time } = item;
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
    case "copy":
      fncopy(Info);
      break;
    case "revoke":
      revokes(Info);
      break;
    case "delete":
      fndelete(Info);
      break;
  }
};
//删除消息
const fndelete = async (data) => {
  let { code } = await deleteMsgList(data);
  if (code == 0) {
    const { conversationID, toAccount, to } = data;
    commit("SET_HISTORYMESSAGE", {
      type: "DELETE_MESSAGE",
      payload: {
        convId: to,
        message: data,
      },
    });
  }
};
// 撤回消息
const revokes = (data) => {
  revokeMsg(data);
};
// eslint-disable-next-line no-undef
defineExpose({ UpdateScrollbar, UpdataScrollInto });
</script>

<style lang="scss" scoped>
$other-msg-color: #f0f2f5;
$self-msg-color: #c2e8ff;

.message_name {
  margin-bottom: 5px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}
.group-tips-elem-item {
  margin: auto;
}
.message-info-view-content {
  height: calc(100% - 70px - 206px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}
.style-MsgBox {
  height: calc(100% - 60px);
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

  .message-view-item {
    flex: 1;
  }
  .tips {
    justify-content: center;
  }
}

.message-view__item {
  display: flex;
  flex-direction: row;
  margin-top: 12px;
}
.is-other {
  :deep(.message) {
    background: $other-msg-color;
  }
  .picture {
    margin-left: 0;
    margin-right: 8px;
  }
  .message-view__img {
    margin-bottom: 5px;
    width: fit-content;
  }

  .message-view__file {
    margin-bottom: 5px;
  }

  .message-view__text {
    width: fit-content;
    margin-bottom: 5px;
  }
}
.is-self {
  flex-direction: row-reverse;
  display: flex;
  :deep(.message) {
    background: $self-msg-color;
  }
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
  }

  .face-url {
    margin-right: 0;
    margin-left: 8px;
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
