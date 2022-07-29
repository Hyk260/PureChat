# 编辑器
<template>
  <div class="list-container">
    <!-- 聊天列表 -->
    <div class="message-left">
      <div class="header-bar">
        <!-- 搜索 -->
        <div class="header-search">
          <el-input
            placeholder="搜索"
            v-model="appoint"
            :prefix-icon="Search"
            class="text-input"
            clearable
          >
          </el-input>
        </div>
      </div>
      <div class="scroll-container">
        <el-scrollbar class="scrollbar-list">
          <!-- 连接已断开 -->
          <networklink />
          <transition-group name="fade-transform">
            <div
              class="message-item"
              v-for="item in Friends"
              :key="item"
              :class="fnClass(item)"
              v-contextmenu:contextmenu
              @contextmenu.prevent="handleContextMenuEvent($event, item)"
              @click="handleConvListClick(item)"
            >
              <!-- 头像 -->
              <el-avatar
                class="portrait"
                shape="square"
                size="small"
                :src="squareUrl"
              />
              <!-- 消息 -->
              <div class="message-item-right">
                <div class="message-item-right-top">
                  <div class="message-chat-name">
                    {{ item.roleName }}
                  </div>
                  <div class="message-Time">
                    {{ timeFormat(item.updateTime) }}
                  </div>
                </div>
                <span class="message-item-right-bottom"> 消息 </span>
                <svg-icon iconClass="DontDisturb" class="dont" />
              </div>
              <!-- 置顶图标 -->
              <div class="pinned-tag" v-if="item && item.pinned"></div>
            </div>
          </transition-group>
          <!-- 右键菜单 -->
          <contextmenu ref="contextmenu">
            <contextmenu-item
              v-for="item in RIGHT_CLICK_CHAT_LIST"
              :key="item.id"
              @click="handleClickMenuItem(item)"
            >
              {{ item.text }}
            </contextmenu-item>
          </contextmenu>
        </el-scrollbar>
        <!-- <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="User" name="first">
            
          </el-tab-pane>
          <el-tab-pane label="Config" name="second"> Config </el-tab-pane>
          <el-tab-pane label="Role" name="third"> Role </el-tab-pane>
        </el-tabs> -->
      </div>
    </div>
    <!-- 聊天框 -->
    <div class="message-right" id="svgBox">
      <header class="message-info-view-header">
        <div class="message-info-views" v-if="currentSelectedConversation">
          <p>{{ currentSelectedConversation.roleName }}</p>
        </div>
        <div class="message-info-setup">
          <FontIcon iconName="MoreFilled" />
        </div>
      </header>
      <!-- 聊天窗口 -->
      <section class="message-info-view-content" id="svgTop">
        <el-scrollbar class="scrollbar-content" ref="scrollbarRef">
          <div class="message-view" ref="messageViewRef">
            <div v-for="(item, index) in currentMessageList" :key="item">
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
                  <div :class="msgOne(item)">
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
import "@wangeditor/editor/dist/css/style.css";
import "v-contextmenu/dist/themes/default.css";
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  onUpdated,
  reactive,
  toRefs,
  computed,
  watch,
  nextTick,
} from "vue";
import FontIcon from "@/layout/FontIcon/indx.vue";
import { Search } from "@element-plus/icons-vue";
import { getRoles } from "@/api/roles";
import { getChat } from "@/api/chat";
import { dragControllerDiv } from "./utils/utils";
import { timeFormat } from "@/utils/timeFormat";
import { useStore, mapMutations, mapState } from "vuex";
import { Contextmenu, ContextmenuItem } from "v-contextmenu";
import {
  squareUrl,
  RIGHT_CLICK_CHAT_LIST,
  RIGHT_CLICK_MENU_LIST,
} from "./utils/menu";
import { useState } from "@/utils/hooks/useMapper";
import { debounce } from "@/utils/debounce";
import { copyFile } from "fs";
import networklink from "./components/networklink.vue";
import LoadMore from "./components/LoadMore.vue";
import TextElemItem from "./components/TextElemItem";
import Editor from "./Editor.vue";
import Motion from "@/utils/motion";

const appoint = ref("");
const MenuList = ref([]);
const Friends = ref([]);
const messageViewRef = ref(null);
const scrollbarRef = ref(null);
const contextMenuItemInfo = ref([]);
const MenuItemInfo = ref([]);
const activeName = ref("first");

const { state, getters, dispatch, commit } = useStore();
const {
  currentMessageList,
  historyMessageList,
  noMore,
  userInfo,
  currentSelectedConversation,
} = useState({
  currentMessageList: (state) => state.conversation.currentMessageList,
  historyMessageList: (state) => state.conversation.historyMessageList,
  currentSelectedConversation: (state) =>
    state.conversation.currentSelectedConversation,
  noMore: (state) => state.conversation.noMore,
  userInfo: (state) => state.data,
});

const handleClick = (tab, event) => {
  console.log(tab, event);
};

onMounted(() => {
  getRolesList();
  getChatList();
});

onUpdated(() => {
  scrollbarRef.value.wrap$.addEventListener("scroll", scrollbar);
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
// 会话点击
const handleConvListClick = (data) => {
  commit("SET_CONVERSATION", {
    type: "UPDATE_CURRENT_SELECTED_CONVERSATION",
    payload: data,
  });
};
const fnClass = (item) => {
  let current = currentSelectedConversation.value;
  let select = item?.id == current?.id;
  if (item?.pinned && select) {
    return "is-active";
  }
  if (item?.pinned) {
    return "is-actives";
  }
  if (select) {
    return "is-active";
  }
  // return item?.pinned || select ? "is-active" : "";
};
const msgOne = (item) => {
  const { message_elem_array } = item || {};
  const { elem_type } = message_elem_array[0];
  let resp = null;
  switch (elem_type) {
    case 0:
      resp = "message-view__text";
      break;
  }
  return resp;
};
const loadMsgComponents = (item) => {
  const { message_elem_array } = item || {};
  const { elem_type } = message_elem_array[0];
  let resp = null;
  switch (elem_type) {
    case 0:
      resp = "TextElemItem"; // 文本消息
      break;
    case 1:
      resp = "pic-elem-item"; //图片消息
      break;
    case 4:
      resp = "file-elem"; // 文件消息
      break;
    case 6:
      resp = "emoji-elem"; // 表情消息
      break;
  }
  console.log(resp);
  return resp;
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
const getMoreMsg = () => {
  console.log("更多消息");
};
const getRolesList = async () => {
  let { code, result } = await getRoles();
  if (code === 200) {
    Friends.value = result;
  }
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
const fncopy = (data) => {
  let { message_elem_array } = data || {};
  let { elem_type, text_elem_content: elem_content } = message_elem_array[0];
  // 文本
  if (elem_type === 0) {
  }
};
// 消息列表 右键菜单
const handleContextMenuEvent = (e, item) => {
  contextMenuItemInfo.value = item;
  console.log(item);
  // 会话定值
  if (item?.pinned) {
    RIGHT_CLICK_CHAT_LIST.map((t) => {
      if (t.id == "pinged") {
        t.text = "取消置顶";
      }
    });
  } else {
    RIGHT_CLICK_CHAT_LIST.map((t) => {
      if (t.id == "pinged") {
        t.text = "会话置顶";
      }
    });
  }
};

const handleClickMenuItem = (item) => {
  const Info = contextMenuItemInfo.value;
  switch (item.id) {
    case "pinged": // 置顶
      pingConv(Info);
      break;
    case "unpinged": // 取消置顶
      pingConv(Info, false);
      break;
    case "remove": // 删除会话
      removeConv(Info);
      break;
    case "disable": // 消息免打扰
      disableRecMsg(Info, true);
      break;
    case "undisable": // 取消消息免打扰
      disableRecMsg(Info, false);
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
// 置顶
const pingConv = (data) => {
  console.log(data);
  let { id } = data;
  let off = null;
  if (data?.pinned) {
    off = false;
  } else {
    off = true;
  }
  console.log(off);
  Friends.value.map((t) => {
    if (t.id == id) {
      t.pinned = off;
    }
  });
  console.log(Friends.value);
};
</script>

<style lang="scss" scoped>
.abc-enter,
.abc-leave-to {
  opacity: 0;
  /* //设置元素的不透明级别： */
  transform: translateY(80px);
  /* // 开始和结束位置在Y轴的80px处 */
}
.abc-enter-active,
.abc-leave-active {
  transition: all 0.6s ease;
  /* // 从Y轴的80px处渐渐移动到上面 */
}


.demo-tabs {
  height: 100%;
  ::v-deep .el-tabs__header {
    margin: 0;
  }
  & > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
    // height: calc(100% - 40px);
  }
}

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
.message-info-view-header {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .message-info-views {
  }
}
.message-info-view-content {
  height: calc(100% - 70px - 206px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}
.header-bar {
  background: #fff;
  height: 60px;
  padding: 14px;
}
.scroll-container {
  height: calc(100% - 60px);
  position: relative;
  .is-active {
    background: #f0f2f5;
    // background: #00000008;
  }
  .is-actives {
    background: rgba(0, 0, 0, 0.03);
  }
}
.scrollbar-list {
  background: #fff;
  height: 100%;
  // height: calc(100% - 40px);
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
.message-item {
  padding: 12px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  &:hover {
    background: #f0f2f5;
  }
  .pinned-tag {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    border: 8px solid #f28078;
    border-right-color: transparent;
    border-bottom-color: transparent;
  }
  .portrait {
    width: 40px;
    height: 40px;
  }
  .message-item-right {
    width: 200px;
    margin-left: 11px;
    height: 44px;
    position: relative;
    .dont {
      position: absolute;
      right: 0;
      color: rgb(29 33 41 / 30%);
    }
    .message-item-right-top {
      display: flex;
      justify-content: space-between;
      padding-bottom: 7px;
      width: 100%;
      .message-chat-name {
        font-size: 14px;
        display: block;
        text-overflow: ellipsis;
        word-wrap: break-word;
        overflow: hidden;
        max-height: 18px;
        line-height: 18px;
        color: rgba(0, 0, 0, 0.85);
        max-width: 140px;
      }
      .message-Time {
        font-size: 10px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .message-item-right-bottom {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.45);
      overflow: hidden;
      text-overflow: ellipsis;
      pointer-events: none;
    }
  }
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
