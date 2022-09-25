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
import { tree } from "@/utils/ToTree";
import { useRouter } from "vue-router";
import storage from "storejs";
import { useStore } from "vuex";
import { debounce } from "@/utils/debounce";
import { GET_MESSAGE_LIST } from "@/store/mutation-types";

const locale = zhCn;
const table = storage.get("userdata");
const { state, dispatch, commit } = useStore();

const { currentConversation, userInfo } = useState({
  currentConversation: (state) => state.conversation.currentConversation,
  userInfo: (state) => state.data.user,
});

onMounted(() => {
  if (!table?.Routingtable) return;
  tree(table.Routingtable);
  table.Routingtable.forEach((item) => {
    useRouter().addRoute(item);
  });

  // window.onresize = () => {
  //   debounce?.(() => {
  //     fnresize();
  //   }, 300);
  // };
  // "https://unpkg.com/ace-builds/src-noconflict/ace.js"
  // let data = 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.js'
  // loader.loadScript(data).then(() => {});
  initListener();
});

const fnresize = () => {
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
  let nick = state.data?.user?.username;
  let isSDKReady = state.user.isSDKReady;
  nextTick(() => {
    setTimeout(() => {
      if (!isSDKReady) dispatch("TIM_LOG_IN", nick);
    }, 300);
  });
  // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
  tim.on(TIM.EVENT.SDK_READY, onReadyStateUpdate);
  // SDK NOT READT
  tim.on(TIM.EVENT.SDK_NOT_READY, onReadyStateUpdate);
  // 会话列表更新
  tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, onUpdateConversationList);
  // 收到新消息
  tim.on(TIM.EVENT.MESSAGE_RECEIVED, onReceiveMessage);
  // 群组列表更新
  tim.on(TIM.EVENT.GROUP_LIST_UPDATED, onUpdateGroupList);
  // 被踢出
  tim.on(TIM.EVENT.KICKED_OUT, onKickOut);
  // SDK内部出错
  tim.on(TIM.EVENT.ERROR, onError);
}

function onUpdateConversationList(event) {
  console.log(event.data, "会话列表更新");
  commit("SET_CONVERSATION", {
    type: "REPLACE_CONV_LIST",
    payload: event.data,
  });
  if (!currentConversation.value) {
    let data = event.data?.[0];
    if (data && data.type !== "@TIM#SYSTEM") {
      // dispatch("GET_MESSAGE_LIST", data);
    }
  }
}

function onReceiveMessage(event) {
  const { data, name } = event;
  const { toAccount } = currentConversation.value;
  console.log(event.data, "收到新消息");
  // console.log(currentConversation.value)
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
  console.log(data, "群组列表更新");
}

function onKickOut(event) {
  let message = kickedOutReason(event.data.type);
  console.log(message);
  commit("toggleIsLogin", false);
  commit("reset");
  commit("LOG_OUT");
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
/** width app-wrapper类容器宽度
 * 0 < width <= 760 隐藏侧边栏
 * 760 < width <= 990 折叠侧边栏
 * width > 990 展开侧边栏
 */
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
