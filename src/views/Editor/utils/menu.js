import { reactive, toRefs } from "vue";

/**
 * 左侧会话聊天列表数据
*/
const RIGHT_CLICK_CHAT_LIST = [
  { id: "pinged", text: "会话置顶" },
  { id: "disable", text: "消息免打扰" },
  { id: "remove", text: "移除会话" },
  { id: "clean", text: "清除消息" },
];

const RIGHT_CLICK_MENU_LIST = [
  {
    id: "copy",
    text: "复制",
  },
  {
    id: "revoke",
    text: "撤回",
  },
  {
    id: "delete",
    text: "删除",
  },
  // {
  //   id: 'transimit',
  //   text: '转发'
  // },
  // {
  //   id: 'reply',
  //   text: '回复'
  // },
  // {
  //   id: 'multiSelect',
  //   text: '多选'
  // }
];

const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  squareUrl:
    "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
  sizeList: ["small", "", "large"],
});
const { circleUrl, squareUrl, sizeList } = toRefs(state);

export { squareUrl, RIGHT_CLICK_CHAT_LIST, RIGHT_CLICK_MENU_LIST };
