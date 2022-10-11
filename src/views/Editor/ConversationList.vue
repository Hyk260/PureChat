<template>
  <el-scrollbar class="scrollbar-list">
    <!-- <transition-group name="fade-transform">
    </transition-group> -->
    <div class="no-msg"  v-if="conversationList.length == 0">
      <img src="@/assets/images/wushuju.png" alt="" />     
      <p>
        <span>暂无会话。</span>
      </p>                      
    </div>
    <div
      class="message-item"
      v-for="item in conversationList"
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
      <!-- 头像 :value="100" :max="99" value="new" is-dot-->
      <el-badge
        :hidden="item.unreadCount == 0"
        :value="item.unreadCount"
        :max="9"
      >
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
            <span v-if="item.type === TIM.TYPES.CONV_C2C">
              {{ item.userProfile.userID }}
            </span>
            <span v-else-if="item.type === TIM.TYPES.CONV_GROUP">
              {{ item.groupProfile.name }}
            </span>
            <span v-else-if="item.type === TIM.TYPES.CONV_SYSTEM">
              系统通知
            </span>
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
        <!-- 消息免打扰 -->
        <template v-if="false">
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
import {
  generateTemplateElement,
  getMessageElemItem,
  getImageType,
} from "@/utils/message-input-utils";
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
import { useState } from "@/utils/hooks/useMapper";
import { GET_MESSAGE_LIST } from "@/store/mutation-types";
import { addTimeDivider } from "@/utils/addTimeDivider";
import TIM from "tim-js-sdk";
import tim from "@/utils/im-sdk/tim";

const contextMenuItemInfo = ref([]);

onMounted(() => {});

const { state, getters, dispatch, commit } = useStore();
const { Selected, UserInfo, currentMessageList, conversationList } = useState({
  UserInfo: (state) => state.data.user,
  Selected: (state) => state.conversation.currentConversation,
  currentMessageList: (state) => state.conversation.currentMessageList,
  conversationList: (state) => state.conversation.conversationList,
});

const fnNews = (data) => {
  const { type, lastMessage } = data
  const { messageForShow, fromAccount } = lastMessage
  const { username } = UserInfo.value
  if(type == 'GROUP' && username !== fromAccount){
    return `${fromAccount}: ${messageForShow}`
  }
  return messageForShow
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
  contextMenuItemInfo.value = item;
  // 会话
  RIGHT_CLICK_CHAT_LIST.map((t) => {
    if (t.id == "pinged") {
      t.text = item.isPinned ? "取消置顶" : "会话置顶";
    }
  });
};
//
const dropHandler = (e, item) => {};
const dragenterHandler = (e) => {};
const dragleaveHandler = (e) => {};

// 会话点击
const handleConvListClick = (data) => {
  commit("SET_CONVERSATION", {
    type: "UPDATE_CURRENT_SELECTED_CONVERSATION",
    payload: data,
  });
  dispatch("GET_MESSAGE_LIST", data);
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
const disableRecMsg = (data, off) => {
  console.log(TIM.TYPES.MSG_REMIND_ACPT_NOT_NOTE);
  console.log(data);
  const { type, toAccount, messageRemindType } = data;
  // 系统消息
  if (type == "@TIM#SYSTEM") return;
  if (messageRemindType == "") return;
  return;
  // eslint-disable-next-line prettier/prettier
  tim.setMessageRemindType({
      groupID: toAccount,
      messageRemindType,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
// 删除会话
const removeConv = (data) => {
  console.log(data);
  let promise = tim.deleteMessage();
  promise
    .then(function (imResponse) {
      // 删除消息成功
    })
    .catch(function (imError) {
      // 删除消息失败
      console.warn("deleteMessage error:", imError);
    });
};
// 置顶
const pingConv = (data) => {
  console.log(data);
  const { conversationID, isPinned } = data;
  tim.pinConversation({
    conversationID,
    isPinned: !isPinned,
  });
};
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
.no-msg{
  color: rgba(0,0,0,0.45);
  text-align: center;
  font-size: 14px;
  margin-top: 50%;
  transform: translate(0px, 50%);
  img{
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
    border: 8px solid #f28078;
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
    }
  }
}
</style>
