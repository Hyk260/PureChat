import { isDev } from "@/config/env";

const outsideList = [
  {
    only: "message",
    icon: "ChatDotSquare",
    locale: "message",
    title: "消息",
    class: "fix-ed",
    if_fixed: 1,
    type: "el-icon",
  },
  {
    only: "notebook",
    icon: "Notebook",
    locale: "addressBook",
    title: "通讯录",
    class: "fix-ed",
    if_fixed: 1,
    type: "el-icon",
  },
  // {
  //   only: "prompt",
  //   icon: "MagicStick",
  //   locale: "",
  //   title: "AI助理",
  //   type: "el-icon",
  // },
  {
    only: "document",
    icon: "Document",
    locale: "document",
    title: "文档",
    type: "el-icon",
    openType: "outside",
    url: "https://hyk260.github.io/pure-docs",
  },
  {
    only: "test",
    icon: "SwitchFilled",
    title: "web",
    show: isDev ? "" : "hide",
    type: "el-icon",
  },
  {
    only: "more",
    icon: "MoreFilled",
    locale: "more",
    title: "更多",
    mode: "other",
    type: "el-icon",
  },
];
const moreList = [
  {
    only: "github",
    icon: "github",
    title: "github",
    openType: "outside",
    url: "https://github.com/Hyk260",
  },
  {
    only: "gitee",
    icon: "IceTea",
    title: "gitee",
    type: "el-icon",
    openType: "outside",
    url: "https://gitee.com/H260788/PureChat",
  },
];

export default {
  state: {
    outsideList,
    moreList,
  },
  mutations: {
    SET_OUT_SIDE_LIST(state, list) {
      const data = state.outsideList.filter((t) => t.only === "more");
      state.outsideList = [...list, ...data];
    },
    SET_MORE_LIST(state, list) {
      state.moreList = list;
    },
  },
};
