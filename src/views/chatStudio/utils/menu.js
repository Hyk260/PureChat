// 会话列表数据
export const chatSessionListData = [
  {
    id: "pinged",
    icon: "",
    svgIcon: "pinged",
    text: "置顶",
  },
  {
    id: "unpin",
    icon: "",
    svgIcon: "unpin",
    text: "取消置顶",
  },
  {
    id: "AcceptNotNotify",
    icon: "MuteNotification",
    text: "消息免打扰",
    hide: window?.__LOCAL_MODE
  },
  {
    id: "AcceptAndNotify",
    icon: "Bell",
    text: "允许消息提醒",
    hide: window?.__LOCAL_MODE
  },
  {
    id: "remove",
    icon: "Delete",
    text: "移除会话",
    class: "!text-[#f44336]",
  },
  // { id: "clean", text: "清除消息" },
].filter(item => !item.hide);

export const menuOptionsList = [
  {
    id: "copy",
    icon: "CopyDocument",
    text: "复制",
  },
  {
    id: "revoke",
    icon: "SortDown",
    text: "撤回",
  },
  // {
  //   id: "edit",
  //   icon: "Edit",
  //   text: "编辑",
  // },
  // {
  //   id: "translate",
  //   text: "翻译",
  // },
  {
    id: "saveAs",
    icon: "Download",
    text: "另存为",
  },
  {
    id: "reply",
    icon: "ChatDotSquare",
    text: "回复",
  },
  // {
  //   id: "forward",
  //   text: "转发",
  // },
  {
    id: "multiSelect",
    icon: "Finished",
    text: "多选",
  },
  {
    id: "delete",
    icon: "Delete",
    text: "删除",
    class: "!text-[#f44336]",
  },
];

export const avatarMenu = [
  {
    id: "send",
    text: "发送消息",
  },
  {
    id: "ait",
    text: "@TA",
  },
];

export const circleUrl = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
export const squareUrl = "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png";
export const emptyUrl = "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png";
