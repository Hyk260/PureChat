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
      @keyup.enter="handleEnter"
    />
    <el-tooltip
      effect="dark"
      content="按Enter发送消息,Enter+Shift换行"
      placement="left-start"
    >
      <el-button class="btn-send" @click="sendMessage">发送</el-button>
    </el-tooltip>
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css";
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
import { useStore } from "vuex";
import { sendMsg } from "@/api/chat";
import { useState } from "@/utils/hooks/useMapper";
import { generateUUID } from "@/utils/index";
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

  if (event?.clipboardData?.items) {
    const items = event.clipboardData.items;
    console.log(items);
    for (const key of items) {
      console.log(key);
      let { kind, type } = key;
      console.log(kind, type)
      if(kind === 'file'){
        if(type.match('^image/')){
          parsepicture()
        }else{
          parsefile(items)
        }
      }
      if(kind === 'string'){
        parsetext()
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

const parsefile = (item) => {
  let pasteFile = item?.getAsFile()
  console.log(pasteFile)
}
const parsetext = () => {

}
const parsepicture = () => {

}

// 回车
const handleEnter = () => {
  sendMessage();
};
// 清空输入框
const clearInputInfo = () => {
  editorRef.value.clear();
};
const sendMsgBefore = () => {
  const text = editorRef.value.getText();
  const message = getMessageElemItem("text", { text: text }); //文本
  console.log(message);
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
    // 表情
    ::v-deep .w-e-bar-item .w-e-drop-panel {
      top: -292px;
      margin: 0;
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
