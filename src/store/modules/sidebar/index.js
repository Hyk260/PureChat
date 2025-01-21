const { DEV: isDev } = import.meta.env;
const docs = __APP_INFO__.pkg.docs

const outsideList = [
  {
    id: "chat",
    icon: "ChatDotSquare",
    title: "会话",
    class: "fix-ed",
    if_fixed: 1,
    type: "el-icon",
  },
  {
    id: "notebook",
    icon: "Notebook",
    title: "通讯录",
    // class: "fix-ed",
    // if_fixed: 1,
    type: "el-icon",
  },
  {
    id: "discover",
    icon: "Discover",
    title: "发现",
    svgIcon: 'Discover'
    // type: "el-icon",
  },
  {
    id: "document",
    icon: "Document",
    title: "文档",
    type: "el-icon",
    openType: "outside",
    url: docs,
  },
  {
    id: "test",
    icon: "SwitchFilled",
    title: "web",
    show: isDev ? "" : "hide",
    type: "el-icon",
  },
  {
    id: "more",
    icon: "MoreFilled",
    title: "更多",
    mode: "other",
    type: "el-icon",
  },
];

const moreList = [
  {
    id: "github",
    icon: "github",
    title: "github",
    openType: "outside",
    url: "https://github.com/Hyk260",
  },
  {
    id: "gitee",
    icon: "gitee",
    title: "gitee",
    // type: "el-icon",
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
    setOutsideList(state, list) {
      const data = state.outsideList.filter((t) => t.id === "more");
      state.outsideList = [...list, ...data];
    },
    setMoreList(state, list) {
      state.moreList = list;
    },
  },
};
