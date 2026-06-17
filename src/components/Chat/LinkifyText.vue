<template>
  <Component :is="renderNodes" />
</template>

<script setup lang="ts">
import { Popover } from "ant-design-vue"
import { linkifySegment, type LinkSegment } from "@pure/utils"
import { useGroupStore } from "@/stores/modules/group"
import CitationTooltip from "@/components/CitationTooltip/index.vue"

import type { GroupMemberType as GroupMember } from "@pure/database/schemas"

defineOptions({
  name: "LinkifyText",
})

interface Props {
  text?: string
  atUserList?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  text: "",
  atUserList: () => [],
})

const groupStore = useGroupStore()

const matchedMembers = computed<GroupMember[]>(() => {
  const list = props.atUserList
  if (list.length === 0) return []
  if (!groupStore.currentMemberList) return []

  return list
    .map((id) => groupStore.currentMemberList.find((member) => member.userID === id))
    .filter((member): member is GroupMember => member !== undefined)
})

const renderLink = (item: LinkSegment, index: number): VNode => {
  const linkElement = h(
    "a",
    {
      key: `link-${index}`,
      class: "linkUrl link-url",
      href: item.url ?? "#",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    item.content
  )

  return h(
    Popover,
    {
      key: `popover-${index}`,
      placement: "top",
      arrow: false,
      trigger: "hover",
      // trigger: "click",
    },
    {
      default: () => linkElement,
      content: () => h(CitationTooltip, { url: item.url ?? "" }),
    }
  )
}

const handleMentionClick = (member?: GroupMember) => {
  // TODO: 添加实际功能，如滚动到该成员消息或弹出成员信息
  // emitter.emit("scroll-to-member", member?.userID)
}

const renderMention = (item: LinkSegment, index: number): VNode => {
  const member = item.member
  return h(
    "a",
    {
      key: `mention-${index}`,
      class: "mention-text",
      title: member?.nick ? `@${member.nick} (${member?.userID})` : `@${member?.userID}`,
      onClick: (event: MouseEvent) => {
        event.stopPropagation()
        handleMentionClick(member)
      },
    },
    item.content
  )
}

const segments = computed<LinkSegment[]>(() => {
  try {
    return linkifySegment(props.text, matchedMembers.value)
  } catch (error) {
    console.error("[LinkifyText] Failed to parse text segments:", error)
    return [{ content: props.text, type: "text" as const }]
  }
})

const renderNodes = computed((): VNode => {
  const segList = segments.value

  if (!segList.length) {
    return h("span", { class: "text" }, props.text)
  }
  if (segList.length === 1 && segList[0].type === "text") {
    return h("span", { class: "text" }, segList[0].content)
  }

  const children = segList.map((item, index) => {
    if (item.type === "link") {
      return renderLink(item, index)
    } else if (item.type === "mention") {
      return renderMention(item, index)
    }
    return h("span", { key: `text-${index}` }, item.content)
  })

  return h("span", { class: "linkify-text" }, children)
})
</script>

<style scoped lang="scss">
.linkUrl {
  cursor: pointer;
  text-decoration: underline;
  word-break: break-all;
  color: var(--el-color-primary);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

.mention-text {
  cursor: pointer;
  color: var(--el-color-primary);
  font-weight: 500;
  padding: 0 2px;
  border-radius: 3px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--el-color-primary-light-9);
  }
}
</style>
