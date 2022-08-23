<template>
  <el-scrollbar class="scrollbar-list">
    <transition-group name="fade-transform">
      <div
        class="message-item"
        v-for="item in Friends"
        :key="item"
        :class="fnClass(item)"
        @click="handleConvListClick(item)"
        @drop="(e) => dropHandler(e, item)"
        @dragenter="dragenterHandler"
        @dragleave="dragleaveHandler"
        v-contextmenu:contextmenu
        @contextmenu.prevent="handleContextMenuEvent($event, item)"
      >
        <!-- 置顶图标 -->
        <div class="pinned-tag" v-if="item && item.pinned"></div>
        <!-- 关闭按钮 -->
        <FontIcon
          iconName="close"
          class="close-btn"
          @click.stop="closeMsg(item)"
        />
        <!-- 头像 -->
        <img :src="squareUrl" class="portrait" alt="" />
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
          <span class="message-item-right-bottom"> 
            {{currentMessageList[0].message_sender_profile.user_profile_nick_name}}:
            {{currentMessageList[0].message_elem_array[0].text_elem_content}}
          </span>
          <!-- 消息免打扰 -->
          <svg-icon
            v-if="item.conv_recv_opt == 2"
            iconClass="DontDisturb"
            class="dont"
          />
        </div>
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
</template>

<script setup>
import "v-contextmenu/dist/themes/default.css";
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
import { debounce } from '@/utils/debounce';
import { getRoles } from "@/api/roles";
import { generateUUID } from "@/utils/index";
import FontIcon from "@/layout/FontIcon/indx.vue";
import { Contextmenu, ContextmenuItem } from "v-contextmenu";
import { timeFormat } from "@/utils/timeFormat";
import { useStore } from "vuex";
import { useState } from "@/utils/hooks/useMapper";
import socket from "@/utils/socket";

const contextMenuItemInfo = ref([]);
const Friends = ref([]);
// {
//   conv_active_time: 0000,
//   conv_id: "@",
//   conv_is_has_draft: false,
//   conv_is_has_lastmsg: true,
//   conv_is_pinned: true,
//   conv_last_msg: {},
//   conv_profile: {},
//   conv_recv_opt: 0,
//   conv_show_name: "群聊",
//   conv_type: 2,
//   conv_unread_num: 0
// }
const userdata = {
  id: "5346d441-bc35-4948-960e-c2d0c2b94a67",
  roleName: "群聊",
  info: "运营用户",
  createTime: 1621480197410,
  updateTime: 1652077470543,
  isDefaultRole: true,
  pinned: true,
  conv_recv_opt: 2,
};

onMounted(() => {
  getRolesList();
});

const { state, getters, dispatch, commit } = useStore();
const { Selected, UserInfo, currentMessageList } = useState({
  UserInfo: (state) => state.data.user,
  Selected: (state) => state.conversation.currentConversation,
  currentMessageList: (state) => state.conversation.currentMessageList,
});

const getRolesList = async () => {
  let { code, result } = await getRoles();
  if (code === 200) {
    // Friends.value = result;
    console.log(result);
    Friends.value = [userdata];
  }
};

// 显示在线人员
socket.on("disUser", (usersInfo) => {
  console.log(usersInfo,'在线人员');
  console.log(currentMessageList.value)
});
// 系统消息
socket.on("system", async (user) => {
  var data = new Date().toTimeString().substr(0, 8);
  let states = user.status == 6 ? "进入" : "离开"
  console.log(`${data} ${user.name}  ${states}了聊天室`)
  if(UserInfo.value.username == user.name) return
  let message = {
    "elem_type": 5,
    "tips_elem_group_info_array": [
      {
        "tips_info_flag": 1,
        "tips_info_value": user.name
      }
    ],
    "group_tips_elem_tip_type": user.status
  }
  const messageId = generateUUID();
  const userProfile = {
    user_profile_nick_name: "系统",
  };
  const conv_id = "window";
  const conv_type = 2;
  const templateElement = await generateTemplateElement(
    conv_id, // 会话ID
    conv_type, // 消息类型 1 2
    userProfile, // 发送方数据
    messageId, // UUID
    message,
    {}
  );
  debounce(() => {
    commit("SET_HISTORYMESSAGE", {
      type: "UPDATE_MESSAGES",
      payload: {
        convId: conv_id,
        message: templateElement,
      },
    });
  },500)
});
// 接受消息
socket.on("receiveMsg", (data) => {
  console.log(data,"接受消息")
  const { message_sender_profile } = data
  const { user_profile_nick_name } = message_sender_profile
  if (UserInfo.value.username == user_profile_nick_name) return
  commit("SET_HISTORYMESSAGE", {
    type: "UPDATE_MESSAGES",
    payload: {
      convId: '',
      message: data,
    },
  });
})


const fnClass = (item) => {
  let current = Selected.value;
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
};
const closeMsg = (conv) => {
  const Info = Friends.value;
  Friends.value = Info.filter((t) => {
    return t.id != conv.id;
  });
};
// 消息列表 右键菜单
const handleContextMenuEvent = (e, item) => {
  contextMenuItemInfo.value = item;
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
//
const dropHandler = (e, item) => {

}
const dragenterHandler = (e) => {

}
const dragleaveHandler = (e) => {

}
// 会话点击
const handleConvListClick = (data) => {
  commit("SET_CONVERSATION", {
    type: "UPDATE_CURRENT_SELECTED_CONVERSATION",
    payload: data,
  });
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
  // ::v-deep .el-scrollbar__wrap{
  //   overflow-x: hidden;
  // }
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
</style>
