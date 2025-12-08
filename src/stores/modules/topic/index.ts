import { defineStore } from "pinia"
import { SetupStoreId } from "@/stores/enum"
import { useChatStore } from "@/stores/modules/chat"
import type { TopicState, Topic } from "./types"

export const useTopicStore = defineStore(SetupStoreId.Topic, {
  state: (): TopicState => ({
    rolePromptsSession: {},
    topicsSession: {},
    searchKeyword: "",
  }),
  getters: {
    // 获取当前会话的角色设定 prompt
    rolePrompt(): string {
      const chatStore = useChatStore()
      const sessionId = chatStore.currentSessionId
      return this.rolePromptsSession[sessionId] || ""
    },
    // 获取当前会话的话题列表
    currentTopics(): Topic[] {
      const chatStore = useChatStore()
      const sessionId = chatStore.currentSessionId || ""
      return this.topicsSession[sessionId] || []
    },
    // 获取过滤后的话题列表（根据搜索关键词）
    filteredTopics(): Topic[] {
      if (!this.searchKeyword.trim()) {
        return this.currentTopics
      }
      const keyword = this.searchKeyword.toLowerCase()
      return this.currentTopics.filter((topic) => topic.title.toLowerCase().includes(keyword))
    },
    // 按时间分组的话题
    groupedTopicsByTime(): Record<string, Topic[]> {
      const topics = this.filteredTopics
      const grouped: Record<string, Topic[]> = {}

      topics.forEach((topic) => {
        const date = new Date(topic.createdAt * 1000)
        const year = date.getFullYear().toString()

        if (!grouped[year]) {
          grouped[year] = []
        }
        grouped[year].push(topic)
      })

      // 按时间倒序排序每个分组
      Object.keys(grouped).forEach((year) => {
        grouped[year].sort((a, b) => b.createdAt - a.createdAt)
      })

      return grouped
    },
    // 获取默认话题
    defaultTopic(): Topic | null {
      return this.currentTopics.find((t) => t.isDefault) || this.currentTopics.find((t) => t.isTemporary) || null
    },
  },
  actions: {
    // 设置角色设定 prompt
    setRolePrompt(prompt: string, sessionId?: string) {
      const chatStore = useChatStore()
      const sid = sessionId || chatStore.currentSessionId

      if (!sid) return

      this.rolePromptsSession[sid] = prompt
    },
    // 添加话题
    addTopic(title: string, sessionId?: string) {
      const chatStore = useChatStore()
      const sid = sessionId || chatStore.currentSessionId

      if (!sid) return

      const newTopic: Topic = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title,
        createdAt: Math.floor(Date.now() / 1000),
        isFavorite: false,
        isTemporary: false,
      }

      if (!this.topicsSession[sid]) {
        this.topicsSession[sid] = []
      }

      this.topicsSession[sid].push(newTopic)
      return newTopic
    },
    // 删除话题
    removeTopic(topicId: string, sessionId?: string) {
      const chatStore = useChatStore()
      const sid = sessionId || chatStore.currentSessionId

      if (!sid || !this.topicsSession[sid]) return

      this.topicsSession[sid] = this.topicsSession[sid].filter((t) => t.id !== topicId)
    },
    // 切换收藏状态
    toggleFavorite(topicId: string, sessionId?: string) {
      const chatStore = useChatStore()
      const sid = sessionId || chatStore.currentSessionId

      if (!sid || !this.topicsSession[sid]) return

      const topic = this.topicsSession[sid].find((t) => t.id === topicId)
      if (topic) {
        topic.isFavorite = !topic.isFavorite
      }
    },
    // 设置搜索关键词
    setSearchKeyword(keyword: string) {
      this.searchKeyword = keyword
    },
    // 初始化默认话题
    initDefaultTopic(sessionId?: string) {
      const chatStore = useChatStore()
      const sid = sessionId || chatStore.currentSessionId

      if (!sid) return

      if (!this.topicsSession[sid]) {
        this.topicsSession[sid] = []
      }

      // 检查是否已有默认话题
      const hasDefault = this.topicsSession[sid].some((t) => t.isDefault || t.isTemporary)

      if (!hasDefault) {
        const defaultTopic: Topic = {
          id: `default-${sid}`,
          title: "默认话题",
          createdAt: Math.floor(Date.now() / 1000),
          isFavorite: false,
          isDefault: false,
          isTemporary: true,
        }
        this.topicsSession[sid].unshift(defaultTopic)
      }
    },
  },
  persist: true,
})
