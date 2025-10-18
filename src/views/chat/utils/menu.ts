import { markRaw } from "vue"
import {
  ChatDotSquare,
  CopyDocument,
  SortDown,
  // Download,
  // Finished,
  // DeleteFilled
} from "@element-plus/icons-vue"
import { AtSign, Download, ListChecks, MessageSquareQuote, Trash2 } from "lucide-vue-next"

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
    icon: markRaw(MessageSquareQuote),
    text: "引用",
  },
  // {
  //   id: "forward",
  //   text: "转发",
  // },
  {
    id: "multiSelect",
    icon: markRaw(ListChecks),
    text: "多选",
  },
  {
    id: "delete",
    icon: markRaw(Trash2),
    text: "删除",
    style: "color: #f44336;",
  },
]

export const avatarMenu = [
  {
    id: "send",
    icon: markRaw(ChatDotSquare),
    text: "发送消息",
  },
  {
    id: "ait",
    icon: markRaw(AtSign),
    text: "TA",
  },
]
