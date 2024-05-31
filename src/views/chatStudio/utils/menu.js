import { reactive, toRefs, ref } from "vue";

/**
 * 左侧会话聊天列表数据
 */
const RIGHT_CLICK_CHAT_LIST = [
  { id: "pinged", text: "会话置顶" },
  { id: "disable", text: "消息免打扰" },
  { id: "remove", text: "移除会话" },
  // { id: "clean", text: "清除消息" },
];

const MENU_LIST = [
  {
    id: "copy",
    text: "复制",
  },
  {
    id: "revoke",
    text: "撤回",
  },
  // {
  //   id: "translate",
  //   text: "翻译",
  // },
  {
    id: "saveAs",
    text: "另存为",
  },
  {
    id: "reply",
    text: "回复",
  },
  // {
  //   id: "forward",
  //   text: "转发",
  // },
  {
    id: "multiSelect",
    text: "多选",
  },
  {
    id: "delete",
    text: "删除",
  },
];

const AVATAR_LIST = [
  {
    id: "send",
    text: "发送消息",
  },
  {
    id: "ait",
    text: "@TA",
  },
];

const RIGHT_CLICK_MENU_LIST = ref([]);

const state = reactive({
  circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
});
const { circleUrl, squareUrl } = toRefs(state);

export {
  squareUrl,
  circleUrl,
  RIGHT_CLICK_CHAT_LIST,
  MENU_LIST,
  AVATAR_LIST,
  RIGHT_CLICK_MENU_LIST,
};
