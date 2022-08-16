// 工具栏配置
export const toolbarConfig = {
  /* 显示哪些菜单，如何排序、分组 */
  toolbarKeys: [
    "emotion", // 表情
    "uploadImage", //上传图片
  ],
  insertKeys: {
    index: 3, // 插入的位置，基于当前的 toolbarKeys
    keys: ["menu1"],
  },
  /* 隐藏哪些菜单 */
  excludeKeys: [],
};

// 编辑器配置
export const editorConfig = {
  placeholder: "请输入内容...",
  /* 菜单配置 */
  MENU_CONF: {},
};
