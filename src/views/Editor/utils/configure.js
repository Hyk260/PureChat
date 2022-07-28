// 工具栏配置
export const toolbarConfig = {
  /* 显示哪些菜单，如何排序、分组 */
  toolbarKeys: [
    "emotion", // 表情
    "uploadImage", //上传图片
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
export const editorConfig = {
  placeholder: "请输入内容...",
  /* 菜单配置 */
  MENU_CONF: {},
};
