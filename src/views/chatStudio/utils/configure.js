import { computed } from "vue";
import { useChatStore } from '@/stores/modules/chat/index';
import { $t } from "@/locales/index";

export const placeholderMap = computed(() => {
  return {
    Windows: $t("chat.buttonPrompt"),
    macOS: $t("chat.buttonPromptMac"),
    input: $t("chat.PromptInputContent")
  };
});

// 编辑器配置
export const editorConfig = {
  placeholder: placeholderMap.value['input'],
  // 配置编辑器是否只读，默认为 false
  // readOnly: true,
  /* 菜单配置 */
  MENU_CONF: {},
  EXTEND_CONF: {
    mentionConfig: {
      pinyinSearch: true,
      showModal,
      hideModal,
    },
  },
  hoverbarKeys: {
    link: {
      // 重写 link 元素的 hoverbar
      menuKeys: ["editLink", "unLink", "viewLink"],
    },
    image: {
      // 清空 image 元素的 hoverbar
      // menuKeys: [],
    },
  },
};

// 代码语言
editorConfig.MENU_CONF["codeSelectLang"] = {};

// 显示 modal
function showModal(e) {
  // console.log("[@] 显示 showModal:", e.getText());
  useChatStore().toggleMentionModal(true)
}
// 隐藏 modal
function hideModal(e) {
  // console.log("[@] 隐藏 hideModal:", e.getText());
  useChatStore().toggleMentionModal(false)
}
