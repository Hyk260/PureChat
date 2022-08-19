<template>
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
      @customAlert="customAlert"
      @keyup.enter="handleEnter"
    />
    <el-tooltip
      effect="dark"
      content="按Enter发送消息,Ctrl+Enter换行"
      placement="left-start"
    >
      <el-button class="btn-send" @click="sendMessage">发送</el-button>
    </el-tooltip>
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css";
import "./utils/custom-menu";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
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
import {
  generateTemplateElement,
  getMessageElemItem,
  getImageType,
} from "@/utils/message-input-utils";
import { empty } from '@/utils';
import { useStore } from "vuex";
import { sendMsg } from "@/api/chat";
import { useState } from "@/utils/hooks/useMapper";
import { generateUUID } from "@/utils/index";
import { bytesToSize } from "@/utils/common"
import { fileImgToBase64Url } from "@/utils/message-input-utils";
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();
const valueHtml = ref(""); // 内容 HTML

const { state, getters, dispatch, commit } = useStore();
const { currentMessageList, historyMessageList, noMore, userInfo } = useState({
  currentMessageList: (state) => state.conversation.currentMessageList,
  historyMessageList: (state) => state.conversation.historyMessageList,
  noMore: (state) => state.conversation.noMore,
  userInfo: (state) => state.data,
});

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！

  // 查看所有工具栏key
  // console.log(editor.getAllMenuKeys());
  // console.log(editor.getConfig());
};

const customAlert = (s, t) => {
  console.log(s,t)
  switch (t) {
      case 'success':
          
          break
      case 'info':
          
          break
      case 'warning':
          
          break
      case 'error':
          
          break
      default:
          
          break
  }
}

// 粘贴事件
const customPaste = (editor, event, callback) => {
  console.log(editor);
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
    for (let [key,value] of Object.entries(items)){
      // console.log(key,value)
      const { kind, type } = value;
      // console.log(kind, type)
      if(kind === 'file'){
        // DataTransferItemList 转换成 File
        let pasteFile = value?.getAsFile?.()
        if (type.match('^image/')){
          parsepicture(pasteFile)
        } else {
          parsefile(pasteFile)
        }
      }
      if(kind === 'string'){
        parsetext(value)
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
// 插入文件
const parsefile = async (file) => {
  console.log(file,"文件")
  const { size } = file
  let fileSize = bytesToSize(size)
  const base64Url = await fileImgToBase64Url(file)


  console.log(fileSize)
}
const parsetext = (item) => {

}
// 插入图片
const parsepicture = async (file) => {
  console.log(file,"图片")
  const base64Url = await fileImgToBase64Url(file)
  let path = file?.path
  if(path == undefined){
    console.log(base64Url)
    const el = `<img src=${base64Url} class="uuid" style="max-width: 200px;"/>`
    valueHtml.value = el
  }
}
// 回车
const handleEnter = () => {
  // 判断当前编辑器内容是否为空
  let isEmpty = editorRef.value.isEmpty();
  // 纯文本内容
  const text = editorRef.value.getText(); 
  if (!isEmpty && !empty(text)) {
    sendMessage();
  } else {  
    console.log("请输入内容");
    clearInputInfo();
  } 
  
  const HtmlText = editorRef.value.getHtml(); // 非格式化的 html
  // console.log(text)
  // console.log(isEmpty)
  // console.log(HtmlText)
  // console.log(empty(text))
};
// 清空输入框
const clearInputInfo = () => {
  editorRef.value.clear();
};

const sendMsgBefore = () => {
  const text = editorRef.value.getText(); // 纯文本内容
  const message = getMessageElemItem("text", { text: text }); //文本
  console.log(message)
  return { message };
};
// 发送消息
const sendMessage = async () => {
  const { message } = sendMsgBefore();
  
  const messageId = generateUUID();
  const userProfile = {
    user_profile_nick_name: "临江仙",
  };
  const conv_id = 100002138;
  const conv_type = 2;
  const templateElement = await generateTemplateElement(
    conv_id, // 会话ID
    conv_type, // 消息类型 1 2
    userProfile, // 发送方数据
    messageId, // UUID
    message,
    {}
  );
  console.log(templateElement);
  clearInputInfo();
  // 更新消息
  commit("SET_HISTORYMESSAGE", {
    type: "UPDATE_MESSAGES",
    payload: {
      convId: conv_id,
      message: templateElement,
    },
  });
  // 会话消息发送
  let { code, result } = await sendMsg({
    conv_id,
    conv_type,
    userProfile,
    message,
  });
  if (code == 200) {
    console.log("发送成功");
    console.log(result);
  }
};
</script>

<style lang="scss" scoped>
.Editor-style {
  height: 206px;
  .toolbar {
    // 表情包
    ::v-deep .w-e-bar-item {
      ::-webkit-scrollbar {
        width: 6px;
      }
      // 自定义滚动条
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
    ::v-deep .w-e-bar-item .w-e-panel-content-emotion li{
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
    ::v-deep .w-e-text-container p {
      margin: 0;
    }
    ::v-deep .w-e-text-placeholder {
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
