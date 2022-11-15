<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import TIM from "tim-js-sdk";
import tim from "./utils/im-sdk/tim";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { loader } from "@/utils/loaders";
import { onMounted, nextTick } from "vue";
import { useState } from "@/utils/hooks/useMapper";
import { useStore } from "vuex";
import { debounce } from "@/utils/debounce";
import { GET_MESSAGE_LIST } from "@/store/mutation-types";

const locale = zhCn;
const { state, dispatch, commit } = useStore();

const { currentConversation, userInfo, currentMessageList } = useState({
  currentConversation: (state) => state.conversation.currentConversation,
  currentMessageList: (state) => state.conversation.currentMessageList,
  userInfo: (state) => state.data.user,
});

onMounted(() => {
  commit("updataRoute");
  // window.onresize = () => {
  //   debounce?.(() => {
  //     fnresize();
  //   }, 300);
  // };
  initListener();
});

const fnresize = () => {
  /** width app-wrapper类容器宽度
   * 0 < width <= 760 隐藏侧边栏
   * 760 < width <= 990 折叠侧边栏
   * width > 990 展开侧边栏
   */
  // let dom = document.getElementById("app");
  // let setWidth = dom?.offsetWidth;
  // if (!setWidth) return;
  // if (setWidth <= 760) {
  //   commit("updateSettings", {
  //     key: "sidebar",
  //     value: false,
  //   });
  // } else {
  //   commit("updateSettings", {
  //     key: "sidebar",
  //     value: true,
  //   });
  // }
};

function initListener() {
  dispatch("RE_LOGIN");
  // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
  tim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate);
  // SDK NOT READT
  tim.on(TIM.EVENT.SDK_NOT_READY, onReadyStateUpdate);
  // 会话列表更新
  tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, onUpdateConversationList);
  // 收到新消息
  tim.on(TIM.EVENT.MESSAGE_RECEIVED, onReceiveMessage);
  // 收到消息被撤回的通知
  tim.on(TIM.EVENT.MESSAGE_REVOKED, onMessageRevoked);
  // 群组列表更新
  tim.on(TIM.EVENT.GROUP_LIST_UPDATED, onUpdateGroupList);
  // 被踢出
  tim.on(TIM.EVENT.KICKED_OUT, onKickOut);
  // SDK内部出错
  tim.on(TIM.EVENT.ERROR, onError);
}

function onUpdateConversationList(event) {
  console.log(event, "onUpdateConversationList_会话列表更新");
  const { data } = event;
  commit("SET_CONVERSATION", {
    type: "REPLACE_CONV_LIST",
    payload: data,
  });
  if (!currentConversation.value) {
    if (data?.[0]?.type !== "@TIM#SYSTEM") {
      commit("SET_CONVERSATION", {
        type: "UPDATE_CURRENT_SELECTED_CONVERSATION",
        payload: data[0],
      });
      nextTick(() => {
        setTimeout(() => {
          dispatch("GET_MESSAGE_LIST", data[0]);
        }, 250);
      });
    }
  }
}

function onReceiveMessage(event) {
  const { data, name } = event;
  const { toAccount } = currentConversation.value;
  console.log(event.data, "收到新消息");
  console.log(currentConversation.value);
  // 收到新消息 且 为当前选中会话 更新消息
  if (event.data?.[0].to !== toAccount) return;
  commit("SET_HISTORYMESSAGE", {
    type: "UPDATE_MESSAGES",
    payload: {
      convId: "",
      message: data[0],
    },
  });
}

function onReadyStateUpdate({ name }) {
  const isSDKReady = name === TIM.EVENT.SDK_READY ? true : false;
  commit("toggleIsSDKReady", isSDKReady);
  if (isSDKReady) {
    dispatch("GET_MYPROFILE");
  }
}

function onUpdateGroupList(event) {
  const { data, name } = event;
  // commit('updateGroupList', event.data)
  console.log(event, "onUpdateGroupList_群组列表更新");
}
function onMessageRevoked(event) {
  console.log(event, "onMessageRevoked_撤回消息");
  const { data, name } = event;
  commit("SET_HISTORYMESSAGE", {
    type: "RECALL_MESSAGE",
    payload: {
      convId: data[0].to,
      message: data,
    },
  });
  // event.name - TIM.EVENT.MESSAGE_REVOKED
  // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
}

function onKickOut(event) {
  let message = kickedOutReason(event.data.type);
  console.log(message);
  commit("toggleIsLogin", false);
  commit("reset");
  dispatch("LOG_OUT");
}

function kickedOutReason(type) {
  switch (type) {
    case TIM.TYPES.KICKED_OUT_MULT_ACCOUNT:
      return "由于多实例登录";
    case TIM.TYPES.KICKED_OUT_MULT_DEVICE:
      return "由于多设备登录";
    case TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED:
      return "由于 userSig 过期";
    default:
      return "";
  }
}

function onError(event) {
  console.log(event, "onError");
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
.content-wrap {
  padding: 24px;
  height: calc(100vh - 86px);
}
</style>
