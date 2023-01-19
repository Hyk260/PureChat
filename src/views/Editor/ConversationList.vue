<template>
  <el-scrollbar class="scrollbar-list">
    <!-- <transition-group name="fade-transform">
    </transition-group> -->
    <div class="no-msg" v-if="tabList.length == 0">
      <img src="@/assets/images/wushuju.png" alt="" />
      <p>
        <span>暂无会话。</span>
      </p>
    </div>
    <div
      draggable="true"
      class="message-item"
      v-for="item in tabList"
      :key="item"
      :class="fnClass(item)"
      @click="handleConvListClick(item)"
      @drop="dropHandler(e, item)"
      @dragenter="dragenterHandler"
      @dragleave="dragleaveHandler"
      v-contextmenu:contextmenu
      @contextmenu.prevent="handleContextMenuEvent($event, item)"
    >
      <!-- 置顶图标 -->
      <div class="pinned-tag" v-if="item.isPinned"></div>
      <!-- 关闭按钮 -->
      <FontIcon
        iconName="close"
        class="close-btn"
        @click.stop="closeMsg(item)"
      />
      <el-badge is-dot :hidden="isShowCount(item) || !isNotify(item)">
        <img
          v-if="item.type == 'C2C'"
          :src="item.userProfile.avatar || squareUrl"
          class="portrait"
          alt="头像"
        />
        <img v-else :src="squareUrl" class="portrait" alt="头像" />
      </el-badge>
      <!-- 消息 -->
      <div class="message-item-right">
        <div class="message-item-right-top">
          <div class="message-chat-name">
            <span v-if="item.type === 'C2C'">
              {{ item.userProfile.userID }}
            </span>
            <span v-else-if="item.type === 'GROUP'">
              {{ item.groupProfile.name }}
            </span>
            <span v-else-if="item.type === '@TIM#SYSTEM'"> 系统通知 </span>
          </div>
          <div class="message-time">
            {{ timeFormat(item.lastMessage.lastTime * 1000) }}
          </div>
        </div>
        <div class="message-item-right-bottom">
          <span>
            {{ fnNews(item) }}
          </span>
        </div>
        <!-- 未读消息红点 -->
        <template v-if="!isShowCount(item) && !isNotify(item)">
          <el-badge :value="item.unreadCount" :max="9" />
        </template>
        <!-- 消息免打扰 -->
        <template v-if="isNotify(item)">
          <svg-icon iconClass="DontDisturb" class="dont" />
        </template>
      </div>
    </div>
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getImageType } from "@/utils/message-input-utils";
import {
  squareUrl,
  RIGHT_CLICK_CHAT_LIST,
  RIGHT_CLICK_MENU_LIST,
} from "./utils/menu";
import { debounce } from "@/utils/debounce";
import { getRoles } from "@/api/roles";
import { generateUUID } from "@/utils/index";
import FontIcon from "@/layout/FontIcon/indx.vue";
import { Contextmenu, ContextmenuItem } from "v-contextmenu";
import { timeFormat } from "@/utils/timeFormat";
import { useStore } from "vuex";
import { useState, useGetters } from "@/utils/hooks/useMapper";
import { GET_MESSAGE_LIST } from "@/store/mutation-types";
import { addTimeDivider } from "@/utils/addTimeDivider";
import { TIMpingConv, setMessageRemindType } from "@/api/im-sdk-api";

const contextMenuItemInfo = ref([]);
// eslint-disable-next-line no-undef
// const emit = defineEmits(["convChange"]);

const { state, getters, dispatch, commit } = useStore();
const { tabList } = useGetters(["tabList"]);
const { Selected, UserInfo, currentMessageList, conversationList } = useState({
  UserInfo: (state) => state.data.user,
  Selected: (state) => state.conversation.currentConversation,
  currentMessageList: (state) => state.conversation.currentMessageList,
  conversationList: (state) => state.conversation.conversationList,
});

const fnNews = (data) => {
  const { type, lastMessage } = data;
  const { messageForShow, fromAccount } = lastMessage;
  const { username } = UserInfo.value;
  if (type == "GROUP" && username !== fromAccount) {
    return `${fromAccount}: ${messageForShow}`;
  }
  return messageForShow;
};

const isNotify = (item) => {
  return item.messageRemindType == "AcceptNotNotify";
};
const isShowCount = (item) => {
  return item.unreadCount == 0;
};

const fnClass = (item) => {
  let current = Selected.value;
  let select = item?.conversationID == current?.conversationID;
  if (select) {
    return "is-active";
  }
};

const closeMsg = (conv) => {
  console.log(conv);
};
// 消息列表 右键菜单
const handleContextMenuEvent = (e, item) => {
  console.log(item);
  contextMenuItemInfo.value = item;
  // 会话
  RIGHT_CLICK_CHAT_LIST.map((t) => {
    if (t.id == "pinged") {
      t.text = item.isPinned ? "取消置顶" : "会话置顶";
    }
    if (t.id == "disable") {
      let off = item.messageRemindType == "AcceptNotNotify";
      t.text = off ? "关闭消息免打扰" : "消息免打扰";
    }
  });
};

const dropHandler = (e, item) => {
  console.log(e, item);
};
const dragenterHandler = (e) => {};
const dragleaveHandler = (e) => {};

// 会话点击
const handleConvListClick = (data) => {
  // 切换会话
  commit("SET_CONVERSATION", {
    type: "UPDATE_CURRENT_SELECTED_CONVERSATION",
    payload: data,
  });
  // 关闭群窗口
  commit("setgroupDrawer", false);
  // 群详情信息
  commit("setGroupProfile", data);
  // 获取会话列表
  dispatch("GET_MESSAGE_LIST", data);
};

const handleClickMenuItem = (item) => {
  const Info = contextMenuItemInfo.value;
  switch (item.id) {
    case "pinged": // 置顶
      pingConv(Info);
      break;
    case "remove": // 删除会话
      removeConv(Info);
      break;
    case "clean": // 清除消息
      console.log("清除消息");
      break;
    case "disable": // 消息免打扰
      disableRecMsg(Info);
      break;
  }
};
// 消息免打扰
const disableRecMsg = async (data, off) => {
  const { type, toAccount, messageRemindType } = data;
  // 系统消息
  if (type == "@TIM#SYSTEM") return;
  // if (messageRemindType == "") return;
  await setMessageRemindType({
    userID: toAccount,
    RemindType: messageRemindType,
    type,
  });
};
// 删除会话
const removeConv = async (data) => {
  console.log(data);
};
// 置顶
const pingConv = async (data, off) => {
  const { conversationID, isPinned } = data;
  await TIMpingConv({
    conversationID,
    isPinned,
  });
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
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
.no-msg {
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  font-size: 14px;
  margin-top: 50%;
  transform: translate(0px, 50%);
  img {
    width: 160px;
    height: 100px;
  }
}
.close-btn {
  font-size: 12px !important;
  position: absolute;
  left: 1.5px;
  display: none;
  &:hover {
    color: #409eff;
  }
}
.scrollbar-list {
  background: #fff;
  height: 100%;
  // height: calc(100% - 40px);
}
.message-item {
  padding: 12px 12px 12px 16px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  &:hover {
    background: #f0f2f5;
  }
  &:hover .close-btn {
    display: block;
  }
  .pinned-tag {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    border: 8px solid rgb(84, 180, 239);
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
    margin-left: 14px;
    height: 44px;
    position: relative;
    .dont {
      position: absolute;
      right: 0;
      top: 26px;
      color: rgb(29 33 41 / 30%);
    }
    .message-item-right-top {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
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
      .message-time {
        font-size: 10px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .message-item-right-bottom {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.45);
      overflow: hidden;
      pointer-events: none;
      width: 179px;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: relative;
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
</style>
