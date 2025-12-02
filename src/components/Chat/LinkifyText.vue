<template>
  <component :is="renderNodes" />
</template>

<script setup lang="ts">
import { linkifySegment } from "@/utils/linkifyUrls"
import { useGroupStore } from "@/stores/modules/group"

import type { GroupMember } from "@/stores/modules/group/type"
import type { LinkSegment } from "@/utils/linkifyUrls"

interface Props {
  text?: string
  atUserList?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  text: "",
  atUserList: () => [],
})

const groupStore = useGroupStore()

const findMemberByMention = (list: string[] = props.atUserList): GroupMember[] | [] => {
  if (list.length === 0) return []
  if (!groupStore.currentMemberList) return []

  return list
    .map((id) => groupStore.currentMemberList.find((member) => member.userID === id))
    .filter((member): member is GroupMember => member !== undefined)
}

const renderLink = (item: LinkSegment, index: number): VNode => {
  return h(
    "a",
    {
      key: `link-${index}`,
      class: "linkUrl link-url",
      href: item.url,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    item.content
  )
}

const renderMention = (item: LinkSegment, index: number): VNode => {
  const member = item.member
  return h(
    "a",
    {
      key: `mention-${index}`,
      class: "mention-text",
      title: member?.nick ? `@${member.nick} (${member?.userID})` : `@${member?.userID}`,
      onClick: (event) => {
        event.stopPropagation()
        console.log("member:", member)
      },
    },
    item.content
  )
}

const renderNodes = computed((): VNode => {
  const userList = findMemberByMention()
  const segments = linkifySegment(props.text, userList)

  if (!segments.length) {
    return h("span", { class: "linkify-text" }, props.text)
  }

  const children = segments.map((item, index) => {
    if (item.type === "link") {
      return renderLink(item, index)
    } else if (item.type === "mention") {
      return renderMention(item, index)
    } else {
      return h("span", { key: `text-${index}` }, item.content)
    }
  })

  return h("span", { class: "linkify-text" }, children)
})
</script>

<style lang="scss">
.linkUrl {
  cursor: pointer;
  text-decoration: underline;
  // word-wrap: break-word;
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
