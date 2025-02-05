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
      :editor="editorRef"
    />
    <div class="send-button">
      <span class="tip">{{ placeholderMap[getOperatingSystem()] }}</span>
      <el-button
        :loading="loading"
        :class="{ 'pointer-events-none': disabled }"
        @click="handleEnter()"
      >
        <template #loading>
          <div class="iconify-icon svg-spinners mr-8"></div>
        </template>
        <span> {{ $t("chat.sending") }} </span>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { bytesToSize, isRobot, fileImgToBase64Url } from "@/utils/chat/index";
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
import { localStg } from "@/utils/storage";
import { useBoolean } from "@/utils/hooks/index";
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
  insertMention,
  isDataTransferItem,
} from "../utils/utils";

const editorRef = shallowRef(); // 编辑器实例，必须用 shallowRef
const valueHtml = ref(""); // 内容 HTML
const mode = "simple"; // 'default' 或 'simple'
const mentionRef = ref();

const [loading, setLoading] = useBoolean();
const [disabled, setDisabled] = useBoolean();

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
  currentMemberList,
} = useState({
  lang: (state) => state.user.lang,
  sessionDraftMap: (state) => state.conversation.sessionDraftMap,
  currentConversation: (state) => state.conversation.currentConversation,
  showCheckbox: (state) => state.conversation.showCheckbox,
  isChatBoxVisible: (state) => state.conversation.isChatBoxVisible,
  isShowModal: (state) => state.conversation.isShowModal,
  currentReplyMsg: (state) => state.conversation.currentReplyMsg,
  fullScreen: (state) => state.conversation.fullScreen,
  currentMemberList: (state) => state.groupinfo.currentMemberList,
});

const handleEditor = (editor, created = true) => {
  if (created) {
    editorRef.value = editor;
  } else {
    if (editor === null) return;
    editor?.destroy();
  }
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
const insertDraft = ({ data, editor = editorRef.value }) => {
  if (!data) return;
  if (!isMobile) editor?.focus(true);
  clearInputInfo();
  const draft = sessionDraftMap.value.get(data.conversationID);
  draft?.map((t) => editor.insertNode(t.children));
};
// 更新草稿
const updateDraft = debounce((data) => {
  commit("setSessionDraft", {
    ID: currentConversation?.value?.conversationID,
    payload: data,
  });
}, 300);

const handleAt = debounce((editor) => {
  if (currentType.value !== "GROUP") return;
  const filteredList = currentMemberList.value.filter(
    (member) => member.userID !== localStg.get("timProxy")?.userProfile?.userID
  );
  filterMentionList({
    str: editor.getText(),
    list: filteredList,
  });
}, 150);

const onChange = (editor) => {
  const content = editor.children;
  setDisabled(editor.isEmpty());
  updateDraft(content);
  handleAt(editor);
};

const handleFile = (item) => {
  const type = item.type;
  const _isRobot = isRobot(toAccount.value);
  const pasteFile = isDataTransferItem(item) ? item.getAsFile() : item;
  let typeText = "";
  if (type.match("^image/")) {
    typeText = "图片";
    if (_isRobot) {
      commit("showMessage", { message: `暂不支持${typeText}消息`, type: "warning" });
      return;
    }
    parsePicture(pasteFile);
  } else {
    typeText = "文件";
    if (_isRobot) {
      commit("showMessage", { message: `暂不支持${typeText}消息`, type: "warning" });
      return;
    }
    parseFile(pasteFile);
  }
};

const handleString = (item, editor) => {
  if (item.type === "text/plain") {
    item.getAsString((str) => {
      editor.insertText(str.trimStart());
      console.log("handleString text/plain:", str);
    });
  } else if (item.type === "text/html") {
    item.getAsString((html) => {
      console.log("handleString text/html:", html);
    });
  }
};

const customPaste = (editor, event, callback) => {
  console.log("ClipboardEvent 粘贴事件对象", event);
  // const text = event.clipboardData?.getData("text/plain"); // 获取粘贴的纯文本
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent DragEvent 拖拽
  // https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent ClipboardEvent 粘贴
  const items = event?.clipboardData?.items ?? event?.dataTransfer?.items;
  for (const item of items) {
    if (item.kind === "file") {
      handleFile(item, editor);
    } else if (item.kind === "string") {
      handleString(item, editor);
    }
  }
  event.preventDefault();
  callback?.(false);
};
// 拖拽事件
const dropHandler = (event) => {
  if (event.dataTransfer.getData("text/plain")) return;
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
    const base64Url = await fileImgToBase64Url(file);
    const element = {
      type: "attachment",
      fileName: file.name,
      fileSize: bytesToSize(file.size),
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
const handleEnter = (event, editor = editorRef.value) => {
  if (loading.value) return;
  if (event?.ctrlKey) return;
  if (isShowModal.value) {
    mentionRef.value.inputKeyupHandler(event);
    return;
  }
  const { isHave } = sendMsgBefore();
  if (!editor.isEmpty() && isHave) {
    sendMessage(editor);
  } else {
    clearInputInfo();
  }
};
// 清空输入框
const clearInputInfo = (editor = editorRef.value) => {
  commit("setReplyMsg", null);
  commit("setConversationValue", { key: "fullScreen", value: false });
  editor?.clear();
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
    dispatch("sendSessionMessage", {
      payload: {
        convId: currentConversation.value.conversationID,
        message: t,
        last: message.length - 1 === i,
      },
    });
  });
};

const setEditHtml = (text) => {
  if (!text) return;
  const editor = editorRef.value;
  editor.setHtml(`<p>${text}</p>`);
  editor.focus(true);
};

function onEmitter() {
  emitter.on("handleAt", ({ id, name }) => {
    insertMention({ id, name, backward: false, editor: editorRef.value });
  });
  emitter.on("handleSetHtml", (str) => {
    setEditHtml(str);
  });
  emitter.on("handleInsertDraft", (data) => {
    insertDraft({ data });
  });
  emitter.on("handleFileDrop", (file) => {
    handleFile(file);
  });
}

function offEmitter() {
  emitter.off("handleAt");
  emitter.off("handleSetHtml");
  emitter.off("handleInsertDraft");
  emitter.off("setHandleFile");
}

watch(isChatBoxVisible, () => {
  handleEditorKeyDown(isShowModal.value);
});
watch(lang, () => {
  handleToggleLanguage();
});
onActivated(() => {
  handleEditorKeyDown(isShowModal.value);
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
.send-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 10px 10px;
  gap: 8px;
  user-select: none;
  .tip {
    font-size: 12px;
  }
  span {
    color: rgb(153, 153, 153);
  }
}
</style>
