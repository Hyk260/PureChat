<template>
  <div
    class="wangeditor"
    :class="{ 'wang-h-full': fullScreen }"
    id="editor"
    v-show="!showCheckbox"
    v-if="isChatBoxVisible"
  >
    <!-- 自定义工具栏 -->
    <RichToolbar @setToolbar="setToolbar" />
    <Editor
      class="editor-content"
      v-model="valueHtml"
      :mode="mode"
      :defaultConfig="editorConfig"
      @drop="dropHandler"
      @onChange="onChange"
      @onCreated="handleEditor"
      @customPaste="customPaste"
      @customAlert="customAlert"
      @keyup.enter="handleEnter"
    />
    <!-- @提及弹框 -->
    <MentionModal
      ref="mentionRef"
      v-if="isShowModal"
      :pinyinSearch="true"
      :isOwner="isOwner"
      @insertMention="insertMention"
    />
    <div class="btn-send">
      <span class="mr-8 text-[12px]">{{ placeholderMap[getOperatingSystem()] }}</span>
      <el-button @click="handleEnter()"> {{ $t("chat.sending") }} </el-button>
    </div>
  </div>
</template>

<script setup>
import { bytesToSize, fileImgToBase64Url } from "@/utils/chat/index";
import { isMobile } from "@/utils/common";
import { useGetters, useState } from "@/utils/hooks/useMapper";
import emitter from "@/utils/mitt-bus";
import { Editor } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
import { debounce } from "lodash-es";
import {
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  ref,
  shallowRef,
  watch,
} from "vue";
import { useStore } from "vuex";
import MentionModal from "../components/MentionModal.vue";
import RichToolbar from "../components/RichToolbar.vue";
import { editorConfig, placeholderMap } from "../utils/configure";
import "../utils/custom-menu";
import {
  convertEmoji,
  customAlert,
  extractAitInfo,
  extractFilesInfo,
  extractImageInfo,
  extractVideoInfo,
  filterMentionList,
  getOperatingSystem,
  handleEditorKeyDown,
  handleToggleLanguage,
  sendChatMessage,
} from "../utils/utils";

const editorRef = shallowRef(); // 编辑器实例，必须用 shallowRef
const valueHtml = ref(""); // 内容 HTML
const mode = "simple"; // 'default' 或 'simple'
const mentionRef = ref();

const { dispatch, commit } = useStore();
const { isOwner, toAccount, currentType } = useGetters(["isOwner", "toAccount", "currentType"]);
const {
  lang,
  currentConversation,
  isChatBoxVisible,
  showCheckbox,
  isShowModal,
  currentReplyMsg,
  sessionDraftMap,
  fullScreen,
} = useState({
  lang: (state) => state.user.lang,
  sessionDraftMap: (state) => state.conversation.sessionDraftMap,
  currentConversation: (state) => state.conversation.currentConversation,
  showCheckbox: (state) => state.conversation.showCheckbox,
  isChatBoxVisible: (state) => state.conversation.isChatBoxVisible,
  isShowModal: (state) => state.conversation.isShowModal,
  currentReplyMsg: (state) => state.conversation.currentReplyMsg,
  fullScreen: (state) => state.conversation.fullScreen,
});

const handleEditor = (editor, created = true) => {
  if (created) {
    editorRef.value = editor;
  } else {
    if (editor === null) return;
    editor?.destroy();
  }
};

const insertMention = ({ id, name, backward = true, deleteDigit = 0 }) => {
  const editor = editorRef.value;
  const mentionNode = {
    type: "mention",
    value: `${name} `,
    info: { id },
    children: [{ text: "" }],
  };
  // 恢复选区
  editor?.restoreSelection();
  if (deleteDigit) {
    for (let i = 0; i < deleteDigit; i++) {
      editor.deleteBackward("character");
    }
  } else if (backward) {
    // 删除 '@'
    editor.deleteBackward("character");
  }
  // 插入 mention
  editor.insertNode(mentionNode);
  // 移动光标
  editor.move(1);
};

const setToolbar = (item) => {
  const { data, key } = item;
  switch (key) {
    case "setEmoj":
      setEmoj(data.url, data.item);
      break;
    case "setPicture":
      parsePicture(data.files);
      break;
    case "setParsefile":
      parseFile(data.files);
      break;
  }
};

// 插入草稿
const insertDraft = (value) => {
  if (!value) return;
  const editor = editorRef.value;
  editor && !isMobile && editor.focus(true);
  const { conversationID: ID } = value;
  const draftMap = sessionDraftMap.value;
  const draft = draftMap.get(ID);
  clearInputInfo();
  draft?.forEach((item) => {
    editor.insertNode(item.children);
  });
};
// 更新草稿
const updateDraft = debounce((data) => {
  commit("setSessionDraft", {
    ID: currentConversation?.value?.conversationID,
    payload: data,
  });
}, 300);

const handleAt = debounce((editor) => {
  filterMentionList(editor.getText(), editor.getHtml());
}, 150);

const onChange = (editor) => {
  const content = editor.children;
  updateDraft(content);
  handleAt(editor);
};

const parsetext = (text, editor) => {
  let str = "";
  str = text.trimStart();
  editor.insertText(str);
};

const handleFile = (item) => {
  const type = item.type;
  let trans = Object.prototype.toString.call(item) === "[object DataTransferItem]";
  let pasteFile = trans ? item.getAsFile() : item;
  if (type.match("^image/")) {
    parsePicture(pasteFile);
  } else {
    parseFile(pasteFile);
  }
};

const handleString = (item, editor) => {
  if (item.type === "text/plain") {
    item.getAsString((text) => {
      parsetext(text, editor);
      console.log("plain:", text);
    });
  } else if (item.type === "text/html") {
    item.getAsString((html) => {
      console.log("html:", html);
    });
  }
};

const kindHandlers = {
  file: handleFile,
  string: handleString,
};

const customPaste = (editor, event, callback) => {
  console.log("ClipboardEvent 粘贴事件对象", event);
  // const text = event.clipboardData?.getData("text/plain"); // 获取粘贴的纯文本
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent DragEvent 拖拽
  // https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent ClipboardEvent 粘贴
  const items = event?.clipboardData?.items ?? event?.dataTransfer?.items;
  for (const item of items) {
    kindHandlers[item.kind]?.(item, editor);
  }
  event.preventDefault();
  callback?.(false);
};
// 拖拽事件
const dropHandler = (event) => {
  let draggedText = event.dataTransfer.getData("text/plain");
  if (draggedText) return;
  customPaste(editorRef.value, event);
  event.preventDefault();
};
// 插入文件
const parseFile = async (file, editor = editorRef.value) => {
  if (file.size / (1024 * 1024) > 100) {
    commit("showMessage", { message: "文件不能大于100MB", type: "warning" });
    return;
  }
  try {
    const editor = editorRef.value;
    const { size, name } = file;
    const fileSize = bytesToSize(size);
    const base64Url = await fileImgToBase64Url(file);
    const element = {
      type: "attachment",
      fileName: name,
      fileSize: fileSize,
      link: base64Url,
      children: [{ text: "" }],
    };
    editor.restoreSelection(); // 恢复选区
    editor.insertNode(element);
    editor.move(1); // 移动光标
  } catch (error) {
    console.log("parseFile:", error);
  }
};
// 插入表情包
const setEmoj = (url, item) => {
  const editor = editorRef.value;
  const element = {
    type: "image",
    class: "EmoticonPack",
    src: url,
    alt: item,
    href: "",
    style: { width: "26px" },
    children: [{ text: "" }],
  };
  editor.restoreSelection();
  editor.insertNode(element);
  editor.focus(true);
};
// 插入图片
const parsePicture = async (file, editor = editorRef.value) => {
  const base64Url = await fileImgToBase64Url(file);
  const element = {
    type: "image",
    class: "img",
    src: base64Url,
    alt: "",
    href: "",
    style: { width: "125px" },
    children: [{ text: "" }],
  };
  editor.restoreSelection(); // 恢复选区
  editor.insertNode(element);
  editor.move(1); // 移动光标
};
// 回车
const handleEnter = (event) => {
  if (event?.ctrlKey) return;
  if (isShowModal.value) {
    mentionRef.value.inputKeyupHandler(event);
    return;
  }
  const editor = editorRef.value;
  const empty = editor.isEmpty(); // 判断当前编辑器内容是否为空
  const { isHave } = sendMsgBefore();
  if (!empty && isHave) {
    sendMessage(editor);
  } else {
    clearInputInfo();
  }
};
// 清空输入框
const clearInputInfo = () => {
  commit("setReplyMsg", null);
  commit("setConversationValue", { key: "fullScreen", value: false });
  const editor = editorRef.value;
  editor && editor.clear();
};

const sendMsgBefore = (editor = editorRef.value) => {
  const text = editor.getText(); // 纯文本内容
  const { aitStr, aitlist } = extractAitInfo(editor);
  const { files } = extractFilesInfo(editor);
  const { video } = extractVideoInfo(editor);
  const { images } = extractImageInfo(editor);
  const emoticons = convertEmoji(editor);
  const have =
    video.length || images.length || files.length || aitlist.length || aitStr || emoticons || text;
  return {
    convId: toAccount.value,
    convType: currentType.value,
    textMsg: emoticons || text,
    image: images,
    aitStr: aitlist.length ? emoticons || aitStr : "",
    aitlist,
    files: files,
    video,
    reply: currentReplyMsg.value,
    isHave: Boolean(have),
  };
};
// 发送消息
const sendMessage = async () => {
  const data = sendMsgBefore();
  console.log("sendMsgBefore:", data);
  const message = await sendChatMessage(data);
  console.log("sendChatMessage:", message);
  clearInputInfo();
  message.map((t, i) => {
    dispatch("SESSION_MESSAGE_SENDING", {
      payload: {
        convId: currentConversation.value.conversationID,
        message: t,
        last: message.length - 1 === i,
      },
    });
  });
};
const setEditHtml = (text) => {
  const editor = editorRef.value;
  editor.setHtml(`<p>${text}</p>`);
  editor.focus(true);
};
const onEmitter = () => {
  emitter.on("handleAt", ({ id, name }) => {
    insertMention({ id, name, backward: false });
  });
  emitter.on("handleSetHtml", (text) => {
    text && setEditHtml(text);
  });
  emitter.on("handleInsertDraft", (value) => {
    value && insertDraft(value);
  });
  emitter.on("handleFileDrop", (file) => {
    handleFile(file);
  });
};
function offEmitter() {
  emitter.off("handleAt");
  emitter.off("handleSetHtml");
  emitter.off("handleInsertDraft");
  emitter.off("setHandleFile");
}

watch(isChatBoxVisible, () => {
  handleEditorKeyDown();
});
watch(lang, () => {
  handleToggleLanguage();
});
onActivated(() => {
  handleEditorKeyDown();
});
onDeactivated(() => {
  offEmitter();
});
onMounted(() => {
  onEmitter();
});
onBeforeUnmount(() => {
  handleEditor(editorRef.value, false);
});
</script>

<style lang="scss" scoped>
.wang-h-full {
  height: calc(100% - 60px) !important;
}
.wangeditor {
  position: relative;
  z-index: 2;
  word-break: break-all;
  border-top: 1px solid var(--color-border-default);
  height: 200px;
  display: flex;
  flex-direction: column;
}
.editor-content {
  flex: 1;
  overflow-y: hidden;
  :deep(.w-e-text-container p) {
    margin: 0;
  }
  :deep(.w-e-image-dragger) {
    display: none;
  }
  :deep(.w-e-text-placeholder) {
    font-style: normal;
    font-size: 15px;
    top: 5px;
  }
  :deep(.w-e-selected-image-container) {
    overflow: visible;
  }
}
.btn-send {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 10px 10px;
  span {
    color: rgb(153, 153, 153);
  }
}
</style>
