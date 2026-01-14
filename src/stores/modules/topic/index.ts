import { defineStore } from "pinia"
import { SetupStoreId } from "@/stores/enum"
import { useChatStore } from "@/stores/modules/chat"
import { useRouteStore } from "@/stores/modules/route"
import { SessionModel, TopicModel, type QueryTopicParams } from "@pure/database/models"
import { groupTopicsByTime } from "@pure/utils"
import { TopicDisplayMode } from "@pure/types"
import emitter from "@/utils/mitt-bus"

import type { ChatTopic, GroupedTopic } from "@pure/types"
import type { TopicState, Topic } from "./types"

const currentFavTopics = (s: ChatTopic[]) => s.filter((s) => s.favorite) || []

const currentUnFavTopics = (s: ChatTopic[]) => s.filter((s) => !s.favorite) || []

export const useTopicStore = defineStore(SetupStoreId.Topic, {
  state: (): TopicState => ({
    rolePromptsSession: {},
    topicsSession: {},
    topicDisplayMode: TopicDisplayMode.ByTime,
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
    groupedTopicsSelector(): GroupedTopic[] {
      const topics = this.filteredTopics

      if (!topics) return []
      const favTopics = currentFavTopics(topics)
      const unfavTopics = currentUnFavTopics(topics)

      return favTopics.length > 0
        ? [
            {
              children: favTopics,
              id: "favorite",
              title: "收藏",
            },
            ...groupTopicsByTime(unfavTopics),
          ]
        : groupTopicsByTime(topics)
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
    setTopicDisplayMode(val: TopicDisplayMode) {
      this.topicDisplayMode = val
    },
    async getTopics(params: QueryTopicParams): Promise<Topic[]> {
      return TopicModel.query(params)
    },
    async selectTopic(topic: Partial<Topic>, sessionId?: string) {
      if (!topic) return
      const chatStore = useChatStore()
      const routeStore = useRouteStore()
      const sid = sessionId || chatStore.sessionId
      this.setTopicId(topic.id || "")
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
