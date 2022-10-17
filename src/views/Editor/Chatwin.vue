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
            <div class="picture">
              <!-- <Portrait :size="36"  :shape="'square'" /> -->
              <el-avatar
                :size="36"
                shape="square"
                :src="item.avatar || circleUrl"
              >
              </el-avatar>
            </div>
            <!-- 内容 -->
            <div
              class="message-view__item--index"
              v-contextmenu:contextmenu
              @contextmenu.prevent="ContextMenuEvent($event, item)"
            >
              <!-- 文本 :class="Megtype(item)" -->
              <div class="message-view__text">
                <component :is="TextElemItem" :message="item"> </component>
              </div>
            </div>
          </div>
          <!-- tips提示 -->
          <!-- <div v-else class="message-view__item tips">
            <TipsElemItem :msgRow="item.message_elem_array[0]" />
          </div> -->
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
  computed,
  onBeforeUnmount,
} from "vue";
import {
  fncopy,
  Megtype,
  dragControllerDiv,
  loadMsgComponents,
} from "./utils/utils";
import { useStore } from "vuex";
import { timeFormat } from "@/utils/timeFormat";
import { debounce, delay } from "@/utils/debounce";
import { throttle } from "@/utils/throttle";
import { useState } from "@/utils/hooks/useMapper";
import { squareUrl, circleUrl, RIGHT_CLICK_MENU_LIST } from "./utils/menu";
import { Contextmenu, ContextmenuItem } from "v-contextmenu";
import TextElemItem from "./components/TextElemItem";
import LoadMore from "./components/LoadMore.vue";
import TipsElemItem from "./components/TipsElemItem.vue";
// import { getChat, getMsgList } from "@/api/chat";
import { deleteMsgList } from "@/api/im-sdk-api";

const MenuItemInfo = ref([]);
const scrollbarRef = ref(null);
const messageViewRef = ref(null);

const { state, dispatch, commit } = useStore();
const { currentMessageList, noMore, userInfo, showMsgBox } = useState({
  userInfo: (state) => state.data.user,
  noMore: (state) => state.conversation.noMore,
  showMsgBox: (state) => state.conversation.showMsgBox,
  currentMessageList: (state) => state.conversation.currentMessageList,
});

watch(
  () => currentMessageList.value,
  () => {
    nextTick(() => {
      UpdataScrollInto();
    });
  },
  {
    deep: true, //深度监听
  }
);

onMounted(() => {
  Monitorscrollbar();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", scrollbar);
});

const ISown = (item) => {
  return item.from == userInfo.value.username;
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

const UpdateScrollbar = () => {
  scrollbarRef.value.update();
};
const UpdataScrollInto = () => {
  messageViewRef.value.firstElementChild?.scrollIntoView();
  // console.log(messageViewRef.value);
  // console.log(messageViewRef.value.firstElementChild);
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
  // console.log(scrollbarRef.value.wrap$);
  scrollbarRef.value.wrap$.addEventListener("scroll", scrollbar);
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
      // commit("SET_HISTORYMESSAGE", {
      //   type: "UPDATE_NOMORE",
      //   payload: true,
      // });
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

const ContextMenuEvent = (event, item) => {
  MenuItemInfo.value = item;
};

const ClickMenuItem = (data) => {
  const Info = MenuItemInfo.value;
  const { id, text } = data;
  console.log(data);
  //
  switch (id) {
    case "copy":
      fncopy(Info);
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
    const { conversationID } = data;
    commit("SET_HISTORYMESSAGE", {
      type: "DELETE_MESSAGE",
      payload: {
        convId: conversationID,
        message: data,
      },
    });
  }
};

// eslint-disable-next-line no-undef
defineExpose({ UpdateScrollbar, UpdataScrollInto });
</script>

<style lang="scss" scoped>
$other-msg-color: #f0f2f5;
$self-msg-color: #c2e8ff;
.message-view__item--text {
  font-size: 12px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.05);
  vertical-align: middle;
  word-wrap: normal;
  word-break: break-all;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 5px;
  padding: 4px 6px;
  line-height: 16px;
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

.message {
  width: fit-content;
  padding: 10px 14px;
  max-width: 360px;
  padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 3px;
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
  :deep(.message_name) {
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
