<template>
  <div v-show="isVisible" class="mention-modal" :style="{ top: top, left: left }">
    <ul ref="listRef" class="mention-list">
      <el-scrollbar>
        <div class="mention-list-box">
          <li
            v-for="(item, i) in searchedList"
            :key="item.joinTime"
            :class="{ 'mention-active': isActive(item) }"
            @mouseover="setActive(i)"
            @click="handleAit(item.userID, item.nick)"
          >
            <UserAvatar
              words="1"
              shape="square"
              class-name="mention-avatar"
              :url="item.avatar"
              :type="item.avatar ? 'single' : 'group'"
              :nick-name="item.userID === magAtAll ? '@' : item.nick || item.userID"
            />
            <span class="nick truncate">{{ item.nick || item.userID }}</span>
          </li>
        </div>
      </el-scrollbar>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside, useEventListener } from "@vueuse/core"
import { cloneDeep } from "lodash-es"
import { storeToRefs } from "pinia"
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watchEffect } from "vue"

import { useChatStore, useGroupStore } from "@/stores"
import type { GroupMember } from "@/stores/modules/group/type"
import { insertMention, prioritizeRBTUserID } from "@/utils/chat"
import emitter from "@/utils/mitt-bus"

const MSG_AT_ALL = "__kImSDK_MesssageAtALL__"

interface Props {
  isOwner?: boolean
  pinyinSearch?: boolean
  editor?: object
}

type FilteringType = "all" | "success" | "empty"

defineOptions({
  name: "MentionModal",
})

const props = withDefaults(defineProps<Props>(), {
  isOwner: false,
  pinyinSearch: false,
  editor: () => ({}),
})

const listRef = ref<HTMLElement>()
const top = ref("")
const left = ref("")
const list = ref<GroupMember[]>([])
const filtering = ref<FilteringType>("all")
const searchValue = ref(0) // 模糊搜索内容长度
const tabIndex = ref(0)
const magAtAll = MSG_AT_ALL
const allMembers = {
  joinTime: 0,
  userID: MSG_AT_ALL,
  nick: "全体成员",
}

const groupStore = useGroupStore()
const chatStore = useChatStore()
const { currentMemberList, currentMembersWithoutSelf } = storeToRefs(groupStore)

const searchedList = computed(() => {
  // 群成员小于2人，不显示@列表
  if (currentMemberList.value.length <= 1) return []
  return list.value
})

const isVisible = computed(() => {
  return filtering.value !== "empty" && currentMemberList.value.length > 1
})

const currentMembersWithoutSelfList = computed(() => {
  return currentMembersWithoutSelf.value.filter((t) => t.userID !== "@TLS#NOT_FOUND")
})

const initList = (owner = props.isOwner, data: GroupMember[] = []) => {
  list.value = filterList(data)
  // 仅群主支持@全员
  if (owner) list.value.unshift(allMembers)
}

const filterList = (data: GroupMember[]) => {
  if (data.length) {
    return prioritizeRBTUserID(data)
  } else {
    return filterData()
  }
}

const filterData = () => {
  const data = currentMembersWithoutSelfList.value
  return prioritizeRBTUserID(data)
}

const updateMention = async () => {
  // 获取光标位置，定位 modal
  const domSelection = document.getSelection()
  if (!domSelection || domSelection.rangeCount === 0) return

  const domRange = domSelection?.getRangeAt(0)
  if (domRange == null) return

  const selectionRect = domRange.getBoundingClientRect()
  // 等待DOM更新并获取高度，添加重试机制
  await nextTick()

  let height = 0
  let width = 168
  let retryCount = 0
  const maxRetries = 3

  // 重试获取高度，防止返回0
  while (height === 0 && retryCount < maxRetries) {
    if (listRef.value) {
      height = listRef.value.clientHeight || listRef.value.offsetHeight || listRef.value.scrollHeight
    }

    if (height === 0) {
      retryCount++
      await new Promise((resolve) => setTimeout(resolve, 10)) // 等待10ms后重试
    }
  }

  // 如果仍然获取不到高度，使用默认值
  if (height === 0) {
    height = 123 // 默认高度，基于CSS中的max-height
    console.warn("Unable to get list height, using fallback value:", height)
  }

  // 定位 modal
  top.value = `${Math.round(selectionRect.top - height - 15)}px`
  left.value = `${Math.round(selectionRect.left + 5)}px`
}

const initMention = () => {
  updateMention()
  onClickOutside(listRef, () => {
    setMentionStatus()
  })
  useEventListener(document, "keydown", (e) => {
    handleKeydown(e)
  })
  emitter.on("handleInputKeyupHandler", (data: KeyboardEvent) => {
    inputKeyupHandler(data)
  })
  emitter.on("setMentionModal", (data: { content: GroupMember[]; type: FilteringType; searchlength: number }) => {
    const { content = [], type, searchlength = 0 } = cloneDeep(data)
    filtering.value = type // all success empty
    if (type === "all") {
      initList()
    } else if (type === "empty") {
      setMentionStatus()
    } else if (type === "success") {
      initList(false, content)
      searchValue.value = searchlength
    }
    nextTick(() => {
      updateMention()
    })
  })
}

const setMentionStatus = (status = false) => {
  chatStore.toggleMentionModal(status)
}

const inputKeyupHandler = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    const firstOne = searchedList.value[tabIndex.value]
    if (!firstOne) return
    const { userID, nick } = firstOne
    handleAit(userID, nick)
  }
}

const handleAit = (id: string, name: string | undefined) => {
  let nick = name ? name : id
  insertMention({ id, name: nick, deleteDigit: searchValue.value, editor: props.editor })
  setMentionStatus()
  searchValue.value = 0
}

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowUp": // 上
      if (tabIndex.value > 0) {
        tabIndex.value--
        scrollToSelectedItem()
      }
      break
    case "ArrowDown": //下
      if (tabIndex.value < searchedList.value?.length - 1) {
        tabIndex.value++
        scrollToSelectedItem()
      }
      break
    case "Escape":
      setMentionStatus()
      break
  }
}

const setActive = (i: number) => {
  tabIndex.value = i
}

const isActive = (item: GroupMember) => {
  if (!item) return
  if (tabIndex.value > -1) {
    return item?.userID == searchedList.value[tabIndex.value]?.userID
  } else {
    return false
  }
}

const scrollToSelectedItem = () => {
  const element = document.querySelector(".mention-active")
  if (!element) return
  element.scrollIntoView({ behavior: "smooth", block: "center" })
}

onMounted(() => {
  initList()
  document.body.appendChild(document.querySelector(".mention-modal") as HTMLElement)
  initMention()
})

onBeforeUnmount(() => {
  emitter.off("handleInputKeyupHandler")
  emitter.off("setMentionModal")
  setMentionStatus() // 隐藏 modal
})

watchEffect(() => {
  if (isVisible.value) {
    nextTick(() => {
      updateMention()
    })
  }
})
</script>

<style lang="scss" scoped>
.mention-modal {
  position: fixed;
  z-index: 11;
  width: 168px;
  padding: 5px;
  border-radius: 5px;
  background-color: var(--color-body-bg);
  box-shadow: var(--el-box-shadow-lighter);
  border: 1px solid var(--color-border-default);
}
.mention-input {
  border: 1px solid #60626652;
  border-radius: 3px;
  width: 100px;
  outline: none;
}
.mention-list {
  .mention-list-box {
    max-height: 123px;
  }
  .nick {
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-left: 5px;
    max-width: 125px;
  }
  li {
    cursor: pointer;
    padding: 3px 3px;
    text-align: left;
    height: 24px;
    border-radius: 4px;
    display: flex;
  }
}
.mention-active {
  background: var(--color-mention-active);
}
</style>
