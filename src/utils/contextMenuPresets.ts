import { markRaw } from "vue"
import {
  AtSign,
  BellOff,
  BellRing,
  BrushCleaning,
  Copy,
  Download,
  Languages,
  ListChecks,
  MessageSquareQuote,
  Pin,
  PinOff,
  RefreshCw,
  Send,
  Share2 as Share,
  SquarePen,
  Trash2 as Trash,
  Undo,
} from "lucide-vue-next"

import type { MenuItem } from "@/types/contextMenu"

export const commonMenuItems: Record<string, MenuItem> = {
  edit: {
    key: "edit",
    label: "编辑",
  },
  delete: {
    key: "delete",
    label: "删除",
    danger: true,
  },
  copy: {
    key: "copy",
    label: "复制",
  },
  share: {
    key: "share",
    label: "分享",
  },
}

export function createMenuItem(key: string, label: string, options?: Partial<MenuItem>): MenuItem {
  return {
    key,
    label,
    ...options,
  }
}

export function createDivider(key: string): MenuItem {
  return { key, divider: true, label: "" }
}

/**
 * 会话列表上下文菜单项
 */
export const chatSessionListData: MenuItem[] = [
  {
    key: "pin",
    icon: markRaw(Pin),
    label: "置顶",
    hide: __LOCAL_MODE__,
  },
  {
    key: "unpin",
    icon: markRaw(PinOff),
    label: "取消置顶",
    hide: __LOCAL_MODE__,
  },
  {
    key: "mute",
    icon: markRaw(BellOff),
    label: "消息免打扰",
    hide: __LOCAL_MODE__,
  },
  {
    key: "unmute",
    icon: markRaw(BellRing),
    label: "允许消息提醒",
    hide: __LOCAL_MODE__,
  },
  {
    key: "delete",
    icon: markRaw(Trash),
    label: "删除会话",
    danger: true,
  },
  {
    key: "clean",
    icon: markRaw(BrushCleaning),
    label: "清除消息",
    hide: true,
  },
].filter((item) => !item.hide)

/**
 * 消息项上下文菜单项
 */
export const messageContextMenuItems: MenuItem[] = [
  {
    key: "copy",
    icon: markRaw(Copy),
    label: "复制",
  },
  {
    key: "revoke",
    icon: markRaw(Undo),
    label: "撤回",
  },
  {
    key: "refresh",
    label: "重新生成",
    hide: !__LOCAL_MODE__,
    icon: markRaw(RefreshCw),
  },
  {
    key: "share",
    label: "截图分享",
    hide: true,
    icon: markRaw(Share),
  },
  {
    key: "edit",
    label: "编辑",
    hide: !__LOCAL_MODE__,
    icon: markRaw(SquarePen),
  },
  {
    key: "translate",
    icon: markRaw(Languages),
    // hide: true,
    label: "翻译",
    children: [
      // {
      //   key: "auto",
      //   label: "自动检测",
      // },
      {
        key: "zh-CN",
        label: "简体中文",
      },
      {
        key: "en",
        label: "英语 (English)",
      },
    ],
  },
  {
    key: "saveAs",
    icon: markRaw(Download),
    label: "另存为",
  },
  {
    key: "quote",
    icon: markRaw(MessageSquareQuote),
    label: "引用",
  },
  // {
  //   key: "forward",
  //   icon: "Forward",
  //   label: "转发",
  // },
  {
    key: "multiSelect",
    icon: markRaw(ListChecks),
    label: "多选",
  },
  {
    key: "delete",
    icon: markRaw(Trash),
    label: "删除",
    danger: true,
  },
].filter((item) => !item.hide)

/**
 * 头像上下文菜单项
 */
export const avatarContextMenuItems: MenuItem[] = [
  {
    key: "send",
    icon: markRaw(Send),
    label: "发送消息",
  },
  {
    key: "at",
    icon: markRaw(AtSign),
    label: "TA",
  },
]
