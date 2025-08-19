import type { AppState, MessageOptions } from './type';
import { defineStore } from 'pinia';
import { ElMessage } from "element-plus";
import { setLocale } from "@/locales";
import { SetupStoreId } from '@/stores/enum';

export const useAppStore = defineStore(SetupStoreId.App, {
  state: (): AppState => ({
    message: null,
    lang: "zh-CN",
    timeline: true,
    markdownRender: false, // Markdown 渲染输入消息
  }),
  actions: {
    setLang(lang: string) {
      this.lang = lang
      setLocale(lang)
    },
    setTimeline(val: boolean) {
      this.timeline = val;
    },
    setMarkdownRender(val: boolean) {
      this.markdownRender = val;
    },
    showMessage(options: MessageOptions) {
      if (this.message) {
        this.message.close()
      }
      this.message = ElMessage({
        message: options.message,
        type: options.type || "success",
        duration: options.duration || 2000,
        offset: 30
      } as any)
    }
  },
  persist: {
    pick: ['lang', "timeline", 'markdownRender']
  },
});