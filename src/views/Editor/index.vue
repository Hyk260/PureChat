# 编辑器
<template>
  <div class="list-container" @contextmenu.prevent>
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
      <el-scrollbar class="scrollbar-list">
        <div
          class="message-item is-active"
          v-for="item in Friends"
          :key="item"
          v-contextmenu:contextmenu
          @contextmenu.prevent="handleContextMenuEvent($event, item)"
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
          <div class="pinned-tag"></div>
        </div>
        <!-- 右键菜单 -->
        <contextmenu ref="contextmenu">
          <contextmenu-item
            v-for="item in convMenuItem"
            :key="item.id"
            @click="handleClickMenuItem(item)"
          >
            {{ item.text }}
          </contextmenu-item>
        </contextmenu>
      </el-scrollbar>
    </div>
    <!-- 聊天框 -->
    <div class="message-right" id="svgBox">
      <header class="message-info-view-header">
        <div class="message-info-views">
          <p>临江仙</p>
        </div>
        <div class="message-info-setup">
          <FontIcon iconName="MoreFilled" />
        </div>
      </header>
      <!-- 聊天窗口 -->
      <section class="message-info-view-content" id="svgTop">
        <el-scrollbar class="scrollbar-content">
          <div class="message-view" ref="messageViewRef">
            <div v-for="(item, index) in currentMessageList" :key="item">
              <!-- 加载更多 -->
              <div
                class="viewref"
                v-if="index === currentMessageList.length - 1"
              >
                <div
                  :class="`showMore no-more ${noMore ? '' : 'loading-more'}`"
                >
                  {{ noMore ? "没有更多了" : "" }}
                </div>
              </div>

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
                  <div class="message-view__text">
                    <div class="message_name">
                      {{ item.message_sender_profile.user_profile_nick_name }}
                    </div>
                    <div class="message">
                      <span
                        class="message-view__item--text text right-menu-item"
                      >
                        <span class="text linkUrl">
                          {{ item.message_elem_array[0].text_elem_content }}
                        </span>
                      </span>
                    </div>
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
      <div class="Editor-style" id="svgDown">
        <Toolbar
          class="toolbar"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
        />
        <Editor
          class="editor-content"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          @onCreated="handleCreated"
          @customPaste="customPaste"
          @keyup.enter="handleEnter"
        />
        <!-- @contextmenu.prevent -->
        <el-tooltip
          class="item"
          effect="dark"
          content="按Enter发送消息,Enter+Shift换行"
          placement="left-start"
          :open-delay="800"
        >
          <div class="btn-send" @click="sendMessage">发送</div>
        </el-tooltip>
      </div>
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
  reactive,
  toRefs,
  computed,
  watch,
  nextTick,
} from "vue";

import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import FontIcon from "@/layout/FontIcon/indx.vue";
import { Search } from "@element-plus/icons-vue";
import { getRoles } from "@/api/roles";
import { getChat } from "@/api/chat";
import {
  generateTemplateElement,
  getMessageElemItem,
} from "@/utils/message-input-utils";
import { timeFormat } from "@/utils/timeFormat";
import { useStore, mapMutations, mapState } from "vuex";
import { Contextmenu, ContextmenuItem } from "v-contextmenu";
import { squareUrl, convMenuItem, RIGHT_CLICK_MENU_LIST } from './utils/menu';

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

const store = useStore();

const valueHtml = ref(""); // 内容 HTML
const appoint = ref("");
const noMore = ref(true);
const Friends = ref([]);
const messageViewRef = ref(null);
const currentMessageList = ref([]);
const contextMenuItemInfo = ref([]);

// console.log(mapMutations)
// const storeMutations = mapMutations(["setCollapse", "updateSettings"])
// console.log(storeMutations)

// const storemapState = mapState({
//   currentMessageList: (state) => state.conversation.currentMessageList,
// })



// const Data = computed(() => { return store.conversationModules });
  

// console.log(Data)

// 模拟 ajax 异步获取内容
onMounted(() => {
  getRolesList();
  getChatList();
  // setTimeout(() => {
  //     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  // }, 1500)
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

const getRolesList = async () => {
  let { code, result } = await getRoles();
  if (code === 200) {
    Friends.value = result;
  }
};

const getChatList = async () => {
  let { code, result } = await getChat();
  if (code === 200) {
    currentMessageList.value = result;
  }
};

// 工具栏配置
const toolbarConfig = {
  /* 显示哪些菜单，如何排序、分组 */
  toolbarKeys: [
    "emotion", //表情
    "uploadImage",
    // {
    //   key: "group-more-style", // 必填，要以 group 开头
    //   title: "更多样式", // 必填
    //   iconSvg: "<svg>....</svg>", // 可选
    //   menuKeys: ["through", "code", "clearStyle"], // 下级菜单 key ，必填
    // },
  ],
  // insertKeys: {
  //   index: 2, // 插入的位置，基于当前的 toolbarKeys
  //   keys: ["menu-key1", "menu-key2"],
  // },
  /* 隐藏哪些菜单 */
  excludeKeys: [],
};

// 编辑器配置
const editorConfig = {
  placeholder: "请输入内容...",
  /* 菜单配置 */
  MENU_CONF: {},
};
const ContextMenuEvent = () => {

}
const ClickMenuItem = () => {

}
// 右键菜单
const handleContextMenuEvent = (e, item) => {
  contextMenuItemInfo.value = item;
};

const handleClickMenuItem = (item) => {
  const Info = contextMenuItemInfo.value;
  switch (item.id) {
    case "pinged": // 置顶
      pingConv(Info, true);
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
  Friends.value = Info.filter(t=>{
    return t.id != conv.id
  })
};
// 置顶
const pingConv = () => {};

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！

  // 查看所有工具栏key
  console.log(editor.getAllMenuKeys());
  console.log(editor.getConfig());
};
// 回车
const handleEnter = () => {
  sendMessage();
};
const sendMsgBefore = () => {
  const text = editorRef.value.getText();
  const content = getMessageElemItem("text", { text: text }); //文本
  console.log(content);
  return { content };
};
// 发送消息
const sendMessage = async () => {
  const { content } = sendMsgBefore();
  // const result = await sendMsg({})
  const message = content;
  const messageId = "123";
  const userProfile = {
    user_profile_nick_name: "临江仙",
  };
  const conv_id = 123;
  const conv_type = 2;
  const templateElement = await generateTemplateElement(
    conv_id,
    conv_type,
    userProfile,
    messageId,
    message,
    {}
  );
  console.log(templateElement);

  currentMessageList.value.unshift(templateElement);

  clearInputInfo();
  // 更新消息
  store.commit("SET_HISTORYMESSAGE", {
    type: "UPDATE_MESSAGES",
    payload: {
      convId: "123",
      message: templateElement,
    },
  });
};
const clearInputInfo = () => {
  editorRef.value.clear();
};
// 粘贴事件
const customPaste = (editor, event, callback) => {
  console.log(editor);
  console.log("ClipboardEvent 粘贴事件对象", event);
  // const html = event.clipboardData.getData("text/html"); // 获取粘贴的 html
  const text = event.clipboardData.getData("text/plain"); // 获取粘贴的纯文本
  // const rtf = event.clipboardData.getData("text/rtf"); // 获取 rtf 数据（如从 word wsp 复制粘贴）
  // // console.log(html);
  console.log(text);
  // console.log(rtf);

  if (event.clipboardData && event.clipboardData.items) {
    const items = event.clipboardData.items;
    console.log(items);
    // for (const { index, key } of items) {
    //   console.log(key);
    // }
  }

  // 自定义插入内容
  editor.insertText(text);

  // 返回 false ，阻止默认粘贴行为
  event.preventDefault();
  callback(false); // 返回值（注意，vue 事件的返回值，不能用 return）

  // 返回 true ，继续默认的粘贴行为
  // callback(true)
};

const dragControllerDiv = () => {
  let svgResize = document.getElementById("svgResize"); // 滑块
  let svgTop = document.getElementById("svgTop"); //聊天框
  let svgDown = document.getElementById("svgDown"); //编辑器
  let svgBox = document.getElementById("svgBox");
  // 按下鼠标执行
  svgResize.onmousedown = (e) => {
    let startY = e.clientY; //鼠标按下 起始Y
    console.log(startY);
    svgResize.top = svgResize.offsetTop;
    // 事件会在鼠标指针移到指定的对象时发生。
    document.onmousemove = function (e) {
      let endY = e.clientY; //鼠标移动 结束得y
      //移动距离 = 原来高度+（结束y-开始y）
      let moveLen = svgResize.top + (endY - startY);
      // 最大移动距离 = 整个盒子高度 - 现在高度
      let maxT = svgBox.clientHeight - svgResize.offsetHeight;
      // 控制移动最小
      if (moveLen < 200) moveLen = 200;
      // 控制移动最大
      if (moveLen > maxT - 200) moveLen = maxT - 200;
      console.log(moveLen);
      svgResize.style.top = moveLen;
      svgTop.style.height = moveLen - 60 + "px";
      svgDown.style.height = svgBox.clientHeight - moveLen - 5 + "px";
    };
    // 鼠标按键被松开时执行
    document.onmouseup = (evt) => {
      document.onmousemove = null;
      document.onmouseup = null;
      svgResize.releaseCapture && svgResize.releaseCapture();
    };
    svgResize.setCapture && svgResize.setCapture();
    return false;
  };
};

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<style lang="scss" scoped>
.Editor-style {
  height: 206px;
  .toolbar {
    // border-bottom: 1px solid #ccc
    // 表情
    ::v-deep .w-e-bar-item .w-e-drop-panel {
      top: -292px;
      margin: 0;
    }
  }
  .editor-content {
    // height: 500px;
    height: calc(100% - 40px) !important;
    overflow-y: hidden;
    ::v-deep .w-e-text-container p {
      margin: 0;
    }
    ::v-deep .w-e-text-placeholder {
      top: 2px;
    }
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
.scrollbar-list {
  background: #fff;
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
.btn-send {
  cursor: pointer;
  position: absolute;
  bottom: 8px;
  right: 16px;
  padding: 6px 6px 4px 4px;
  line-height: 20px;
  width: 60px;
  background-color: #f44336;
  color: #fff;
  border: 1px solid #e7e7e7;
  font-size: 14px;
  border-radius: 3px;
  text-align: center;
}
#svgResize {
  position: relative;
  height: 5px;
  // border-bottom: 1px solid rgba(0, 0, 0, 0.09);
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
.viewref {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 100%;
  overflow: hidden;
  .showMore {
    padding-top: 12px;
    text-align: center;
    color: #00f;
    font-size: 12px;
    line-height: 20px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.45);
  }
}
.loading-more {
  width: 32px;
  height: 32px;
  line-height: 32px;
  background: url("../../assets/images/loading.png");
  animation: load 1.1s infinite linear;
  background-size: 32px;
}

@keyframes load {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
.message-view__item {
  display: flex;
  flex-direction: row;
  margin-top: 12px;
}
.message-view__text {
}
.message-view__item--index {
  .message_name {
    margin-bottom: 5px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }
}

.message-view__item {
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
  .message {
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
  .message {
    background: #c2e8ff;
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

  // .message-view__item--text {
  //   max-width: 360px;
  //   width: fit-content;
  //   padding: 10px 14px;
  //   box-sizing: border-box;
  //   background: #c2e8ff;
  //   border-radius: 3px;
  // }
}
</style>
