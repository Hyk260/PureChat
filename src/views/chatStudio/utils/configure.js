import { computed } from "vue";
import store from "@/store/index";
import { $t } from "@/plugins/i18n";
import { getOperatingSystem } from "./utils";
const systemOs = getOperatingSystem();

export const placeholderMap = computed(() => {
  return {
    Windows: $t("chat.buttonPrompt"),
    macOS: $t("chat.buttonPromptMac"),
  };
});
// 编辑器配置
export const editorConfig = {
  // 请输入内容...
  placeholder: placeholderMap.value[systemOs] || $t("chat.buttonPrompt"),
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
  store.commit("SET_MENTION_MODAL", true);
}
// 隐藏 modal
function hideModal(e) {
  // console.log("[@] 隐藏 hideModal:", e.getText());
  store.commit("SET_MENTION_MODAL", false);
}
