import { nextTick } from "vue"

import { defineStore } from "pinia"

import localAvatar from "@/assets/images/avatar.png"
import router from "@/router"
import { login, logout } from "@/service/api/index"
import { timProxy } from "@/service/chat"
import chat from "@/service/chat/PureChatService"
import { useAuthStore, useChatStore } from "@/stores"
import { SetupStoreId } from "@/stores/enum"
import emitter from "@/utils/mitt-bus"
import { localStg } from "@/utils/storage"

import type {
  HandleIMLoginPayload,
  HandleSuccessfulAuthPayload,
  HandleUserLoginPayload,
  LoginResult,
  UserLocalStore,
  UserState,
} from "./type"
import type { Profile } from "@/types/tencent-cloud-chat"

export const useUserStore = defineStore(SetupStoreId.User, {
  state: (): UserState => ({
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
    },
  },
  actions: {
    setCurrentPage(page: number) {
      this.currentPage = page
    },
    setVerifyCode(val: string) {
      this.verifyCode = val
    },
    setCurrentProfile(user: Profile) {
      this.userProfile = user
    },
    setUserLocalStore(data: Partial<UserLocalStore>) {
      this.userLocalStore = { ...this.userLocalStore, ...data }
    },
    async handleSuccessfulAuth(data: HandleSuccessfulAuthPayload) {
      console.log("授权登录信息 handleSuccessfulAuth", data)
      const { code, msg, result } = data
      if (code === 200) {
        timProxy.init()
        await this.handleIMLogin({ userID: result.username, userSig: result.userSig })
        localStg.set("User-Model", result)
        useAuthStore().setTokens(result?.accessToken, result?.refreshToken)
        // data?.remember && localStg.set(ACCOUNT, data)
      } else {
        console.log("授权登录失败")
        window.$message?.error(msg || "授权登录失败")
      }
    },
    async handleUserLogin(data: HandleUserLoginPayload) {
      console.log(data, "登录信息")
      const result = (await login(data)) as unknown as HandleSuccessfulAuthPayload
      this.handleSuccessfulAuth(result)
    },
    handleUserLogout() {
      router.push("/login")
      setTimeout(() => {
        logout()
        emitter.all.clear()
        this.handleIMLogout()
      }, 500)
    },
    async handleIMLogin(user: HandleIMLoginPayload, redirect: boolean = true) {
      try {
        const data = await chat.login(user)
        if (data.code === 0) {
          console.log("[chat] im登录成功 login", data)
          if (redirect) {
            window.$message?.success("登录成功")
            router.push("/chat")
          }
        } else {
          this.handleUserLogout()
        }
      } catch (error) {
        this.handleUserLogout()
        window.$message?.error(error || "登录失败")
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
        const data = (localStg.get("User-Model") as LoginResult) || null
        console.log("tryReconnect", data)
        if (data) {
          timProxy.init()
          await this.handleIMLogin({ userID: data.username, userSig: data.userSig }, false)
        } else {
          this.handleUserLogout()
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  persist: true,
})
