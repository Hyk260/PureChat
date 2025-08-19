import type {
  LoginResult,
  UserState,
  UserProfile,
  UserLocalStore,
  HandleSuccessfulAuthPayload,
  HandleUserLoginPayload,
  HandleIMLoginPayload,
} from './type';

import { nextTick } from "vue";
import { defineStore } from 'pinia'
import { useAppStore, useChatStore, useAuthStore } from '@/stores/index';
import { login, logout } from "@/service/api/index"
import { localStg } from "@/utils/storage"
import { SetupStoreId } from '@/stores/enum';
import { timProxy } from '@/service/IM/index';
import { setLocale } from "@/locales/index";

import router from "@/router"
import chat from "@/service/IM/im-sdk/tim"
import emitter from "@/utils/mitt-bus"
import localAvatar from '@/assets/images/avatar.png';

export const useUserStore = defineStore(SetupStoreId.User, {
  state: (): UserState => ({
    lang: "zh-CN",
    timeline: false, // 时间线
    markdownRender: false, // Markdown 渲染输入消息
    verifyCode: "",
    currentPage: 0,
    userProfile: {},
    userLocalStore: {
      native: "",
      avatar: "",
      userName: "",
      localAvatar,
    },
  }),
  getters: {
    getUserAvatar(): string {
      return this.userLocalStore.avatar || this.userLocalStore.native || this.userLocalStore.localAvatar
    }
  },
  actions: {
    setTimeline(val: boolean): void {
      this.timeline = val;
    },
    setMarkdownRender(val: boolean): void {
      this.markdownRender = val;
    },
    setCurrentPage(page: number): void {
      this.currentPage = page
    },
    setVerifyCode(val: string): void {
      this.verifyCode = val
    },
    setCurrentProfile(user: UserProfile): void {
      this.userProfile = user
    },
    setUserLocalStore(data: Partial<UserLocalStore>): void {
      this.userLocalStore = { ...this.userLocalStore, ...data }
    },
    setLang(lang: string): void {
      this.lang = lang
      setLocale(lang)
    },
    async handleSuccessfulAuth(data: HandleSuccessfulAuthPayload): Promise<void> {
      console.log("授权登录信息 handleSuccessfulAuth", data)
      const { code, msg, result } = data
      if (code === 200) {
        timProxy.init()
        await this.handleIMLogin({ userID: result.username, userSig: result.userSig })
        localStg.set('User-Model', result)
        useAuthStore().setTokens(result?.accessToken, result?.refreshToken)
        // data?.remember && localStg.set(ACCOUNT, data)
      } else {
        console.log("授权登录失败")
        useAppStore().showMessage({ message: msg, type: "error" })
      }
    },
    async handleUserLogin(data: HandleUserLoginPayload): Promise<void> {
      console.log(data, "登录信息")
      const result = await login(data)
      this.handleSuccessfulAuth(result)
    },
    async handleUserLogout(): Promise<void> {
      router.push("/login")
      setTimeout(() => {
        logout()
        emitter.all.clear()
        this.handleIMLogout()
      }, 500)
    },
    async handleIMLogin(user: HandleIMLoginPayload): Promise<void> {
      try {
        const data = await chat.login(user)
        if (data.code === 0) {
          console.log("[chat] im登录成功 login", data)
          useAppStore().showMessage({ message: "登录成功" })
          router.push("/chat")
        } else {
          this.handleUserLogout()
        }
      } catch (error) {
        this.handleUserLogout()
        useAppStore().showMessage({ message: error, type: "error" })
        console.log("[chat] im登录失败 login", error)
      }
    },
    async handleIMLogout() {
      const data = await chat.logout()
      if (data.code === 0) {
        console.log("[chat] im退出登录 logout", data)
        this.$reset()
        useChatStore().$reset()
      } else {
        console.log("[chat] im退出登录失败 logout", data)
      }
    },
    async tryReconnect() {
      if (__LOCAL_MODE__) {
        timProxy.init()
        return
      }
      if (router.currentRoute.value.name === "login") return
      await nextTick()
      try {
        const data = localStg.get("User-Model") as LoginResult || null
        console.log("tryReconnect", data)
        if (data) {
          timProxy.init()
          await this.handleIMLogin({ userID: data.username, userSig: data.userSig })
        } else {
          this.handleUserLogout()
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  persist: true,
})