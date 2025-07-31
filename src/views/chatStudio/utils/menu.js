import { markRaw } from "vue";
import { CopyDocument, SortDown, Download, ChatDotSquare, Finished, Delete } from "@element-plus/icons-vue";
import { BellOff, BellRing } from 'lucide-vue-next';
// 会话列表数据
export const chatSessionListData = [
  {
    id: "pinged",
    icon: "",
    svgIcon: "pinged",
    text: "置顶",
    hide: __LOCAL_MODE__
  },
  {
    id: "unpin",
    icon: "",
    svgIcon: "unpin",
    text: "取消置顶",
    hide: __LOCAL_MODE__
  },
  {
    id: "AcceptNotNotify",
    icon: markRaw(BellOff),
    text: "消息免打扰",
    hide: __LOCAL_MODE__
  },
  {
    id: "AcceptAndNotify",
    icon: markRaw(BellRing),
    text: "允许消息提醒",
    hide: __LOCAL_MODE__
  },
  {
    id: "remove",
    icon: markRaw(Delete),
    text: "删除会话",
    style: "color: #f44336;",
  },
  // { id: "clean", text: "清除消息" },
].filter(item => !item.hide);

export const menuOptionsList = [
  {
    id: "copy",
    icon: markRaw(CopyDocument),
    text: "复制",
  },
  {
    id: "revoke",
    icon: markRaw(SortDown),
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
    icon: markRaw(Download),
    text: "另存为",
  },
  {
    id: "reply",
    icon: markRaw(ChatDotSquare),
    text: "回复",
  },
  // {
  //   id: "forward",
  //   text: "转发",
  // },
  {
    id: "multiSelect",
    icon: markRaw(Finished),
    text: "多选",
  },
  {
    id: "delete",
    icon: markRaw(Delete),
    text: "删除",
    style: "color: #f44336;",
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
