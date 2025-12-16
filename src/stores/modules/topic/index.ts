import { defineStore } from "pinia"
import { SetupStoreId } from "@/stores/enum"
import { useChatStore } from "@/stores/modules/chat"
import { useRouteStore } from "@/stores/modules/route"
import { TopicModel, type QueryTopicParams } from "@/database/models/topic"
// import { MessageModel } from "@/database/models/message"
import { SessionModel } from "@/database/models/session"
import emitter from "@/utils/mitt-bus"

import type { TopicState, Topic } from "./types"

export const useTopicStore = defineStore(SetupStoreId.Topic, {
  state: (): TopicState => ({
    rolePromptsSession: {},
    topicsSession: {},
    searchKeyword: "",
    topicId: "",
    defaultTopic: {
      id: "",
      sessionId: "",
      createdAt: 0,
      updatedAt: 0,
      favorite: false,
      title: "默认主题",
    },
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
        const date = new Date(topic.createdAt)
        const year = date.getFullYear().toString()

        if (!grouped[year]) {
          grouped[year] = []
        }
        grouped[year].push(topic)
      })

      // 按时间倒序排序每个分组
      Object.keys(grouped).forEach((year) => {
        const list = grouped[year]
        if (list) {
          list.sort((a, b) => b.createdAt - a.createdAt)
        }
      })

      return grouped
    },
  },
  actions: {
    setRolePrompt(prompt: string, sessionId?: string) {
      const chatStore = useChatStore()
      const sid = sessionId || chatStore.currentSessionId

      if (!sid) return

      this.rolePromptsSession[sid] = prompt
    },
    setTopicId(id: string) {
      this.topicId = id
    },
    async getTopics(params: QueryTopicParams): Promise<Topic[]> {
      return TopicModel.query(params)
    },
    async selectTopic(topic: Partial<Topic>, sessionId?: string) {
      if (!topic) return
      const chatStore = useChatStore()
      const routeStore = useRouteStore()
      const sid = sessionId || chatStore.sessionId
      this.topicId = topic.id || ""
      chatStore.updateConversationList({ conversationID: sid, topicId: topic.id })
      await SessionModel.update(sid, { topicId: topic.id })
      routeStore.routerPushQuery({
        path: "/chat",
        query: {
          session: sid,
          topicId: topic.id,
        },
      })
      emitter.emit("handleSelection")
      // const data = await MessageModel.queryByTopicId(topic.id)
      // console.log(data)
    },
    async addTopic(title: string, sessionId?: string) {
      const chatStore = useChatStore()
      const sid = sessionId || chatStore.currentSessionId
      if (!sid) return
      const data = await TopicModel.create({ title, sessionId: sid })
      this.selectTopic({ id: data.id })
      this.initDefaultTopic(sid)
    },
    async batchRemoveTopics(sessionId?: string) {
      const chatStore = useChatStore()
      const sid = sessionId || chatStore.currentSessionId
      const topics = await TopicModel.findBySessionId(sid)
      TopicModel.batchDelete(topics.map((t) => t.id))
      this.setTopicId("")
      this.selectTopic({ id: "" })
      this.initDefaultTopic(sid)
    },
    async clearTopics(sessionId?: string) {
      const chatStore = useChatStore()
      const sid = sessionId || chatStore.currentSessionId
      await TopicModel.batchDeleteBySessionId(sid)
      this.setTopicId("")
      this.selectTopic({ id: "" })
      this.initDefaultTopic(sid)
    },
    updateTopicTitle(id: string, text: string, sessionId?: string) {
      const chatStore = useChatStore()
      const sid = sessionId || chatStore.currentSessionId

      if (sid && this.topicsSession[sid]) {
        const topic = this.topicsSession[sid].find((t) => t.id === id)
        if (topic) {
          topic.title = text
          this.updateTopic(id, { ...topic, title: text })
        }
      }
    },
    async updateTopic(id: string, data: Partial<Topic>) {
      const favorite = typeof data.favorite !== "undefined" ? (data.favorite ? 1 : 0) : undefined

      return TopicModel.update(id, { ...data, favorite })
    },
    removeTopic(topicId: string, sessionId?: string) {
      const chatStore = useChatStore()
      const sid = sessionId || chatStore.currentSessionId

      if (!sid || !this.topicsSession[sid]) return

      this.topicsSession[sid] = this.topicsSession[sid].filter((t) => t.id !== topicId)
      TopicModel.delete(topicId)
      this.setTopicId("")
      this.selectTopic({ id: "" })
    },
    toggleFavorite(topicId: string, sessionId?: string) {
      const chatStore = useChatStore()
      const sid = sessionId || chatStore.currentSessionId

      if (!sid || !this.topicsSession[sid]) return

      const topic = this.topicsSession[sid].find((t) => t.id === topicId)
      if (topic) {
        const isFavorite = !topic.favorite
        topic.favorite = isFavorite
        TopicModel.toggleFavorite(topicId, isFavorite)
      }
    },
    async setSearchKeyword(keyword: string, sessionId?: string) {
      this.searchKeyword = keyword
      const chatStore = useChatStore()
      const sid = sessionId || chatStore.currentSessionId
      await TopicModel.queryByKeyword(keyword, sid)
    },
    async initDefaultTopic(sessionId?: string) {
      const chatStore = useChatStore()
      const sid = sessionId || chatStore.currentSessionId

      if (!sid) return
      if (!this.topicsSession[sid]) {
        this.topicsSession[sid] = []
      }

      const topics = await this.getTopics({ containerId: sid })
      this.topicsSession[sid] = topics
    },
  },
  persist: {
    pick: ["topicId"],
  },
  // persist: true,
})
