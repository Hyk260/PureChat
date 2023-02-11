import store from "@/store/index";
// 工具栏配置
export const toolbarConfig = {
  /* 显示哪些菜单，如何排序、分组 */
  toolbarKeys: [
    "emotion", // 表情
    // "uploadImage", //上传图片
  ],
  // insertKeys: {
  //   index: 3, // 插入的位置，基于当前的 toolbarKeys
  //   keys: ["menu1"],
  // },
  /* 隐藏哪些菜单 */
  excludeKeys: [],
};
// 显示 modal 弹框
function showModal() {
  store.commit("SET_MENTION_MODAL", true);
}
// 隐藏 modal
function hideModal() {
  store.commit("SET_MENTION_MODAL", false);
}
// 编辑器配置
export const editorConfig = {
  placeholder: "请输入内容...",
  /* 菜单配置 */
  MENU_CONF: {},
  EXTEND_CONF: {
    mentionConfig: {
      showModal, // 必须
      hideModal, // 必须
    },
  },
};

// 自定义表情
// editorConfig.MENU_CONF['emotion'] = {
//   emotions: `😀 😃 😄 🌞 😁 😆 🤖 😅 😂 🤣 😊 😇 🙂 🙃 😉`.split(' ') // 数组
// }
// 行高
// editorConfig.MENU_CONF['lineHeight'] = {
//   lineHeightList: ['1', '1.5', '2', '2.5']
// }

// console.log(editorConfig.MENU_CONF['emotion'])
