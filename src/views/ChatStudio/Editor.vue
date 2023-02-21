<template>
  <div class="Editor-style" id="svgDown" v-if="showMsgBox" v-show="!showCheckbox">
    <!-- <Toolbar
      class="toolbar"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    /> -->
    <!-- 自定义工具栏 -->
    <RichToolbar @setEmoj="setEmoj" />
    <Editor
      class="editor-content"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @customPaste="customPaste"
      @customAlert="customAlert"
      @onChange="onChange"
      @keyup.enter="handleEnter"
      @drop="dropHandler"
    />
    <!-- @ mention弹框 -->
    <mention-modal
      v-if="isShowModal"
      :isOwner="isOwner"
      :memberlist="currentMemberList"
      @hideMentionModal="hideMentionModal"
      @insertMention="insertMention"
    />
    <el-tooltip effect="dark" content="按Enter发送消息,Ctrl+Enter换行" placement="left-start">
      <el-button class="btn-send" @click="handleEnter">发送</el-button>
    </el-tooltip>
  </div>
</template>

<script setup>
import "./utils/custom-menu";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import RichToolbar from "./components/RichToolbar.vue";
import MultiChoiceBox from "./components/MultiChoiceBox.vue";
import { toolbarConfig, editorConfig } from "./utils/configure";
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
import { getImageType } from "@/utils/message-input-utils";
import { empty } from "@/utils";
import { useStore } from "vuex";
import { useState, useGetters } from "@/utils/hooks/useMapper";
import { generateUUID } from "@/utils/index";
import MentionModal from "./components/MentionModal.vue";
import { bytesToSize } from "@/utils/common";
import { fileImgToBase64Url, dataURLtoFile } from "@/utils/message-input-utils";
import { GET_MESSAGE_LIST } from "@/store/mutation-types";
import { SendMessageCd } from "@/api/index";
import {
  CreateTextMsg,
  CreateTextAtMsg,
  CreateFiletMsg,
  CreateImgtMsg,
  sendMsg,
} from "@/api/im-sdk-api";
const editorRef = shallowRef(); // 编辑器实例，必须用 shallowRef
const valueHtml = ref(""); // 内容 HTML
const messages = ref(null); //编辑器内容 对象格式
const mode = "simple"; // 'default' 或 'simple'
// eslint-disable-next-line no-undef
// const emit = defineEmits(["sendMsgCallback"]);

const { state, getters, dispatch, commit } = useStore();
const { isOwner } = useGetters(["isOwner"]);
const {
  currentConversation,
  currentMessageList,
  historyMessageList,
  noMore,
  showMsgBox,
  showCheckbox,
  userInfo,
  userProfile,
  isShowModal,
  currentMemberList,
} = useState({
  currentMemberList: state => state.groupinfo.currentMemberList,
  currentConversation: state => state.conversation.currentConversation,
  currentMessageList: state => state.conversation.currentMessageList,
  historyMessageList: state => state.conversation.historyMessageList,
  noMore: state => state.conversation.noMore,
  userInfo: state => state.data.user,
  userProfile: state => state.user.currentUserProfile,
  showCheckbox: state => state.conversation.showCheckbox,
  showMsgBox: state => state.conversation.showMsgBox,
  isShowModal: state => state.conversation.isShowModal,
});
// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！

  // console.log(editor, "实例");
  // 查看所有工具栏key
  // console.log(editor.getAllMenuKeys());
  // console.log(editor.getConfig());
};
const insertMention = (id, name) => {
  const editor = editorRef.value;
  const mentionNode = {
    type: "mention", // 必须是 'mention'
    value: `${name} `, // 文本
    info: { id }, // 其他信息，自定义
    children: [{ text: "" }], // 必须有一个空 text 作为 children
  };
  editor.restoreSelection(); // 恢复选区
  editor.deleteBackward("character"); // 删除 '@'
  editor.insertNode(mentionNode); // 插入 mention
  editor.move(1); // 移动光标
};
const hideMentionModal = () => {
  commit("SET_MENTION_MODAL", false);
};
const onChange = editor => {
  const content = editor.children;
  messages.value = content;
  // console.log(messages.value, "编辑器内容");
};

const customAlert = (s, t) => {
  console.log(s, t);
  switch (t) {
    case "success":
      console.log("success");
      break;
    case "info":
      console.log("info");
      break;
    case "warning":
      console.log("warning");
      break;
    case "error":
      console.log("error");
      break;
    default:
      console.log("default");
      break;
  }
};
// 粘贴事件
const customPaste = (editor, event, callback) => {
  // console.log(editor,"编辑器实例");
  console.log("ClipboardEvent 粘贴事件对象", event);
  // const html = event.clipboardData.getData("text/html"); // 获取粘贴的 html
  const text = event.clipboardData.getData("text/plain"); // 获取粘贴的纯文本
  // const rtf = event.clipboardData.getData("text/rtf"); // 获取 rtf 数据（如从 word wsp 复制粘贴）
  // console.log(html);
  console.log(text);
  // console.log(rtf);

  if (event?.clipboardData?.items) {
    const items = event.clipboardData.items;
    // console.log(items);
    for (let [key, value] of Object.entries(items)) {
      console.log(key, value);
      const { kind, type } = value;
      // console.log(kind, type)
      if (kind === "file") {
        // DataTransferItemList 转换成 File
        let pasteFile = value?.getAsFile?.();
        if (type.match("^image/")) {
          parsepicture(pasteFile);
        } else {
          parsefile(pasteFile);
        }
      }
      if (kind === "string") {
        value.getAsString(str => {
          parsetext(str, editor);
        });
      }
    }
  }

  // 自定义插入内容
  editor.insertText(text);

  // 返回 false ，阻止默认粘贴行为
  event.preventDefault();
  callback(false); // 返回值（注意，vue 事件的返回值，不能用 return）

  // 返回 true ，继续默认的粘贴行为
  // callback(true)
};
// 拖拽事件
const dropHandler = e => {
  const files = e.dataTransfer.files || [];
  console.log(e);

  console.log(files);
};
// 插入文件
const parsefile = async file => {
  console.log(file, "文件");
  try {
    const { size } = file;
    const fileSize = bytesToSize(size);
    const base64Url = await fileImgToBase64Url(file);
    console.log(base64Url);
    console.log(fileSize);
  } catch (error) {
    console.log(error);
  }
};
const parsetext = item => {
  console.log(item);
};
const setEmoj = (data, item) => {
  const node = { text: item };
  editorRef.value.insertNode(node);
};
// 插入图片
const parsepicture = async file => {
  console.log(file, "图片");
  const base64Url = await fileImgToBase64Url(file);
  let path = file?.path;
  if (path == undefined) {
    console.log(base64Url);
    // const el = `<img src=${base64Url} class="uuid" style="max-width: 200px;"/>`;
    // valueHtml.value = el;
    const ImageElement = {
      type: "image",
      class: "img",
      src: base64Url,
      alt: "",
      href: "",
      style: { width: "30%" },
      children: [{ text: "" }],
    };
    editorRef.value.insertNode(ImageElement);
  }
};
// 回车
const handleEnter = () => {
  const editor = editorRef.value;
  // 判断当前编辑器内容是否为空
  let isEmpty = editor.isEmpty();
  // 纯文本内容
  const text = editor.getText();
  // 所有图片
  const imageall = editor.getElemsByType("image");
  console.log(text);
  if ((!isEmpty && !empty(text)) || imageall.length > 0) {
    sendMessage();
  } else {
    const { aitStr } = sendMsgBefore();
    if (aitStr) {
      sendMessage();
    } else {
      console.log("请输入内容");
      clearInputInfo();
    }
  }
  // const HtmlText = editorRef.value.getHtml(); // 非格式化的 html
  // console.log(text)
  // console.log(isEmpty);
  // console.log(HtmlText);
  // console.log(empty(text))
};
// 清空输入框
const clearInputInfo = () => {
  editorRef.value.clear();
};

const sendMsgBefore = () => {
  let aitStr = "";
  let aitlist = [];
  let newmsg = [];
  let str = valueHtml.value;
  let content = messages.value[0].children;
  const editor = editorRef.value;
  const text = editorRef.value.getText(); // 纯文本内容
  // const HtmlText = editorRef.value.getHtml(); // 非格式化的 html
  // const innHTML = HtmlText.replace(/<(?!img).*?>/g, "");
  const image = editor.getElemsByType("image"); // 所有图片
  // console.log(text);
  if (str.includes("mention")) {
    aitStr = str.replace(/<[^>]+>/g, "");
    aitStr = aitStr.replace(/&nbsp;/gi, "");
    newmsg = content.filter(t => t.type == "mention");
    newmsg.map(t => aitlist.push(t.info.id));
    aitlist = Array.from(new Set(aitlist));
  }
  // console.log(HtmlText);
  // console.log(innHTML);
  // console.log(aitStr);
  return { text, image, aitStr, aitlist };
};
// 发送消息
const sendMessage = async () => {
  let flag = true;
  let TextMsg = null;
  let ImgtMsg = false;
  const { type, conversationID, toAccount } = currentConversation.value;
  const { text, aitStr, image, aitlist } = sendMsgBefore();
  // console.log(image);
  ImgtMsg = image.length > 0 ? true : false;
  // return;
  // 图片消息
  if (ImgtMsg) {
    let file = dataURLtoFile(image[0].src, "test.png");
    TextMsg = await CreateImgtMsg({
      convId: toAccount,
      convType: type, //"C2C"
      image: file,
    });
    flag = false;
  }
  if (aitStr) {
    // @消息
    TextMsg = await CreateTextAtMsg({
      convId: toAccount,
      convType: type,
      textMsg: aitStr,
      atUserList: aitlist,
    });
  } else if (flag) {
    // 文本消息
    TextMsg = await CreateTextMsg({
      convId: toAccount,
      convType: type, //"C2C"
      textMsg: text,
    });
  }
  // 发送消息
  let { code, data } = await sendMsg(TextMsg);
  console.log(data, "sendMsg");
  if (code == 0) {
    // SendMessageCd({
    //   sender: data.message.from,
    //   receiver: toAccount,
    //   message: text,
    // });
    clearInputInfo();
    commit("SET_HISTORYMESSAGE", {
      type: "UPDATE_MESSAGES",
      payload: {
        convId: "",
        message: data.message,
      },
    });
    commit("updataScroll");
  } else {
    console.log(data);
  }
};
</script>

<style lang="scss" scoped>
.Editor-style {
  height: 206px;
  .toolbar {
    // 表情包
    :deep(.w-e-bar-item) {
      // 自定义滚动条
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(222, 223, 225);
      }
      ::-webkit-scrollbar-track {
        border-radius: 0;
      }
      // 弹框位置
      .w-e-drop-panel {
        top: -207px;
        height: 200px;
        overflow: overlay;
        padding: 10px 14px 10px 10px;
        margin: 0;
      }
    }
    :deep(.w-e-bar-item .w-e-panel-content-emotion li) {
      width: 30px;
      height: 30px;
      font-size: 18px;
      line-height: 30px;
      text-align: center;
    }
  }
  .editor-content {
    height: calc(100% - 40px) !important;
    overflow-y: hidden;
    :deep(.w-e-text-container p) {
      margin: 0;
    }
    :deep(.w-e-text-placeholder) {
      top: 2px;
    }
  }
}
.btn-send {
  position: absolute;
  bottom: 8px;
  right: 16px;
}
</style>
