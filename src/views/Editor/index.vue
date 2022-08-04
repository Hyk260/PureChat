# 编辑器
<template>
  <div class="list-container">
    <!-- 聊天列表 -->
    <div class="message-left">
      <!-- 搜索框 -->
      <Search />
      <div :class="['scroll-container', networkStatus ? 'style-net' : '']">
        <!-- 连接已断开 -->
        <networklink :show="networkStatus" />
        <!-- 会话列表 -->
        <ConversationList />
      </div>
    </div>
    <!-- 聊天框 -->
    <div class="message-right" id="svgBox">
      <Header />
      <!-- 聊天窗口 -->
      <section class="message-info-view-content" id="svgTop">
        <el-scrollbar class="scrollbar-content" ref="scrollbarRef">
          <div class="message-view" ref="messageViewRef">
            <div
              v-for="(item, index) in currentMessageList"
              :key="item.message_msg_id"
            >
              <!-- 加载更多 -->
              <LoadMore
                :noMore="noMore"
                v-if="index === currentMessageList.length - 1"
              />
              <div class="message-view__item--blank"></div>
              <!-- 时间 -->
              <div class="message-view__item--time-divider" v-if="false">
                {{ timeFormat(item.updateTime, true) }}
              </div>
              <!-- 消息 is-self is-other-->
              <div
                class="message-view__item"
                :class="item.message_is_from_self ? 'is-self' : 'is-other'"
              >
                <div class="picture">
                  <el-avatar :size="36" shape="square" :src="squareUrl" />
                </div>
                <!-- 内容 -->
                <div
                  class="message-view__item--index"
                  v-contextmenu:contextmenus
                  @contextmenu.prevent="ContextMenuEvent($event, item)"
                >
                  <!-- 文本 -->
                  <div :class="Megtype(item)">
                    <component :is="TextElemItem" :message="item"> </component>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右键菜单 -->
            <contextmenu ref="contextmenus">
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
      <div id="svgResize" @mouseover="dragControllerDiv"></div>
      <!-- 编辑器 -->
      <Editor />
    </div>
  </div>
</template>

<script setup>
import "v-contextmenu/dist/themes/default.css";
import {
  onBeforeUnmount,
  ref,
  onMounted,
  onUpdated,
  reactive,
  toRefs,
  computed,
  watch,
  nextTick,
} from "vue";
import { copyFile } from "fs";
import { useStore } from "vuex";
import { Contextmenu, ContextmenuItem } from "v-contextmenu";

import { getChat, getMsgList } from "@/api/chat";

import {
  squareUrl,
  RIGHT_CLICK_CHAT_LIST,
  RIGHT_CLICK_MENU_LIST,
} from "./utils/menu";

import { debounce } from "@/utils/debounce";
import { timeFormat } from "@/utils/timeFormat";
import { useState } from "@/utils/hooks/useMapper";
import {
  dragControllerDiv,
  loadMsgComponents,
  Megtype,
  fncopy,
} from "./utils/utils";

import Editor from "./Editor.vue";
import Motion from "@/utils/motion";

import Search from "./components/Search.vue";
import LoadMore from "./components/LoadMore.vue";
import FontIcon from "@/layout/FontIcon/indx.vue";
import TextElemItem from "./components/TextElemItem";
import Header from "./components/Header.vue";
import networklink from "./components/networklink.vue";
import ConversationList from "./ConversationList.vue";

const MenuList = ref([]);
const Friends = ref([]);
const messageViewRef = ref(null);
const scrollbarRef = ref(null);
const contextMenuItemInfo = ref([]);
const MenuItemInfo = ref([]);

const { state, getters, dispatch, commit } = useStore();
const {
  currentMessageList,
  historyMessageList,
  noMore,
  userInfo,
  networkStatus,
  currentConversation,
} = useState({
  currentMessageList: (state) => state.conversation.currentMessageList,
  historyMessageList: (state) => state.conversation.historyMessageList,
  currentConversation: (state) => state.conversation.currentConversation,
  noMore: (state) => state.conversation.noMore,
  userInfo: (state) => state.data,
  networkStatus: (state) => state.conversation.networkStatus,
});

const handleClick = (tab, event) => {
  console.log(tab, event);
};

onMounted(() => {
  Monitorscrollbar();
  getChatList();
});

onUpdated(() => {
  // Monitorscrollbar();
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", scrollbar);
});

watch(
  () => currentMessageList.value,
  () => {
    nextTick(() => {
      messageViewRef.value.firstElementChild?.scrollIntoView();
    });
  },
  {
    deep: true, //深度监听
  }
);

const Monitorscrollbar = () => {
  // console.log(scrollbarRef.value.wrap$);
  scrollbarRef.value.wrap$.addEventListener("scroll", scrollbar);
};

const scrollbar = (e) => {
  // 会话是否大于50条 ? 显示loading : 没有更多
  debounce(() => {
    // if (!this.noMore) {}
    const current = currentMessageList.value.length - 1;
    // 第一条消息 加载更多 节点
    const offsetTopScreen = messageViewRef.value?.children?.[current];
    const top = offsetTopScreen?.getBoundingClientRect().top;
    const canLoadData = top > 50; //滚动到顶部
    canLoadData && getMoreMsg();
  }); //防抖处理
};

const getMoreMsg = async () => {
  try {
    // 获取指定会话的消息列表
    const Response = await getMsgList({
      conv_id: 123,
      conv_type: 2,
      msg_id: 123,
    });
    console.log(Response);
    if (Response?.length === 0) {
      console.log("没有更多消息了！！！");
      commit("SET_HISTORYMESSAGE", {
        type: "UPDATE_NOMORE",
        payload: true,
      });
      return;
    }
  } catch (e) {
    // 解析报错 关闭加载动画
    commit("SET_HISTORYMESSAGE", {
      type: "UPDATE_NOMORE",
      payload: true,
    });
  }
  console.log("更多消息");
};

const getChatList = async () => {
  let { code, result } = await getChat();
  if (code === 200) {
    commit("SET_HISTORYMESSAGE", {
      type: "RECIVE_MESSAGE",
      payload: {
        convId: "123",
        message: result,
      },
    });
  }
};

const ContextMenuEvent = (event, item) => {
  MenuItemInfo.value = item;
};
const ClickMenuItem = (item) => {
  const info = MenuItemInfo.value;
  switch (item.id) {
    case "revoke": // 撤回
      break;
    case "delete": // 删除
      break;
    case "copy": // 复制
      fncopy(info);
      break;
    case "folder": // 另存为
      break;
  }
};

// 消息免打扰
const disableRecMsg = () => {};
// 删除会话
const removeConv = (conv) => {
  const Info = Friends.value;
  Friends.value = Info.filter((t) => {
    return t.id != conv.id;
  });
};
</script>

<style lang="scss" scoped>
.list-container {
  width: 100%;
  height: 100%;
  display: flex;
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

.message-left {
  width: 280px;
}
.message-right {
  background: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.09);
  width: calc(100% - 280px);
  height: 100%;
  position: relative;
  overflow: hidden;
}

.message-info-view-content {
  height: calc(100% - 70px - 206px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}

.scroll-container {
  height: calc(100% - 60px);
  position: relative;
  ::v-deep .is-active {
    background: #f0f2f5;
    // background: #00000008;
  }
  ::v-deep .is-actives {
    background: rgba(0, 0, 0, 0.03);
  }
}
.style-net {
  height: calc(100% - 60px - 34px);
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

#svgResize {
  position: relative;
  height: 5px;
  width: 100%;
  cursor: s-resize;
  // cursor: row-resize;
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
  padding: 0 16px 16px 16px;
  box-sizing: border-box;

  .message-view-item {
    flex: 1;
  }
}

.message-view__item {
  display: flex;
  flex-direction: row;
  margin-top: 12px;
}
.message-view__item--index {
  ::v-deep .message_name {
    margin-bottom: 5px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }
}

.message {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 10px 14px;
  max-width: 360px;
  padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 3px;
}
.is-other {
  ::v-deep .message {
    background: #f0f2f5;
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
  ::v-deep .message {
    background: #c2e8ff;
  }
  .picture {
    margin-right: 0;
    margin-left: 8px;
    width: 36px;
    height: 36px;
  }
  ::v-deep .message_name {
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
</style>
