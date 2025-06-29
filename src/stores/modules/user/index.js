import { nextTick } from "vue";
import { defineStore } from 'pinia'
import { useAppStore, useChatStore, useAuthStore } from '@/stores/index';
import { login, logout } from "@/service/api/index"
import { USER_MODEL } from "@/constants/index"
import { localStg } from "@/utils/storage"
import { SetupStoreId } from '@/stores/plugins/index';
import { timProxy } from '@/utils/IM/index';
import { setLocale } from "@/locales/index";

import router from "@/router"
import chat from "@/utils/IM/im-sdk/tim"
import emitter from "@/utils/mitt-bus"
import localAvatar from '@/assets/images/avatar.png';

export const useUserStore = defineStore(SetupStoreId.User, {
  state: () => ({
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
    getUserAvatar() {
      return this.userLocalStore.avatar || this.userLocalStore.native || this.userLocalStore.localAvatar
    }
  },
  actions: {
    setTimeline(val) {
      this.timeline = val;
    },
    setMarkdownRender(val) {
      this.markdownRender = val;
    },
    setCurrentPage(page) {
      this.currentPage = page
    },
    setVerifyCode(val) {
      this.verifyCode = val
    },
    setCurrentProfile(user) {
      this.userProfile = user
    },
    setUserLocalStore(data) {
      this.userLocalStore = { ...this.userLocalStore, ...data }
    },
    setLang(lang) {
      this.lang = lang
      setLocale(lang)
    },
    async handleSuccessfulAuth(data) {
      console.log("授权登录信息 handleSuccessfulAuth", data)
      const { code, msg, result } = data
      if (code === 200) {
        timProxy.init()
        await this.handleIMLogin({ userID: result.username, userSig: result.userSig })
        localStg.set(USER_MODEL, result)
        useAuthStore().setTokens(result?.accessToken, result?.refreshToken)
        // data?.remember && localStg.set(ACCOUNT, data)
      } else {
        console.log("授权登录失败")
        useAppStore().showMessage({ message: msg, type: "error" })
      }
    },
    async handleUserLogin(data) {
      console.log(data, "登录信息")
      const result = await login(data)
      this.handleSuccessfulAuth(result)
    },
    async handleUserLogout() {
      router.push("/login")
      setTimeout(() => {
        logout()
        emitter.all.clear()
        this.handleIMLogout()
      }, 500)
    },
    async handleIMLogin(user) {
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
        const data = localStg.get(USER_MODEL) || null
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