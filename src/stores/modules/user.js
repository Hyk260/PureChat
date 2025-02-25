import { defineStore } from 'pinia'
import { login, logout } from "@/api/node-admin-api/index"
import { ACCOUNT, TIM_PROXY, USER_MODEL } from "@/constants/index"
import { localStg } from "@/utils/storage"
import { verification } from "@/utils/message/index"
import { initThemeSettings } from "@/theme/settings"
import { SetupStoreId } from '../plugins/index';
import { timProxy } from '@/utils/IM/index';
import { setTheme } from "@/utils/common";
import { changeLocale } from "@/locales/index";
import router from "@/router"
import chat from "@/utils/IM/im-sdk/tim"
import emitter from "@/utils/mitt-bus"

export const useUserStore = defineStore(SetupStoreId.User, {
  state: () => ({
    userProfile: localStg.get(TIM_PROXY)?.userProfile || {},
    lang: localStg.get('lang') || "zh-CN",
    themeScheme: initThemeSettings(),
  }),

  actions: {
    setCurrentProfile(user) {
      this.userProfile = user
    },

    setLang(lang) {
      this.lang = lang
      changeLocale(lang)
    },

    setThemeScheme(theme) {
      this.themeScheme = theme
      setTheme(lang)
    },

    setLoading(val) {
      this.loading = val
    },

    reset() {
      this.userProfile = {}
    },

    async authorized(data) {
      const { code, msg, result } = data
      console.log({ code, msg, result }, "授权登录信息")
      if (code == 200) {
        timProxy.init() 
        await this.handleIMLogin({
          userID: result.username,
          userSig: result.userSig
        })
        localStg.set(USER_MODEL, result)
        router.push("/chat")
        verification(code, msg)
      } else {
        verification(code, msg)
      }
    },

    async handleUserLogin(data) {
      this.setLoading(true)
      const { code, msg, result } = await login(data)
      console.log({ code, msg, result }, "登录信息")
      if (code == 200) {
        timProxy.init()
        await this.handleIMLogin({
          userID: result.username,
          userSig: result.userSig
        })
        localStg.set(USER_MODEL, result)
        data?.keep && localStg.set(ACCOUNT, data)
        router.push("/chat")
        verification(code, msg)
      } else {
        verification(code, msg)
        setTimeout(() => {
          this.setLoading(false)
        }, 1000)
      }
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
        const { code, data } = await chat.login(user)
        if (code == 0) {
          console.log("[chat] im登录成功 login", data)
        } else {
          this.handleUserLogout()
        }
      } catch (error) {
        this.handleUserLogout()
        console.log("[chat] im登录失败 login", error)
      }
    },

    async handleIMLogout() {
      const { code, data } = await chat.logout()
      if (code == 0) {
        console.log("[chat] im退出登录 logout", data)
        this.reset()
        // 清除消息记录
        // TODO: 需要调用conversation store的clearHistory
      }
    },

    async reLoginHandler() {
      if (__LOCAL_MODE__) return
      try {
        const data = localStg.get(USER_MODEL) || {}
        if (data) {
          const { username: userID, userSig } = data
          console.log("reLoginHandler", { userID, userSig })
          timProxy.init()
          await this.handleIMLogin({ userID, userSig })
        } else {
          this.handleUserLogout()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}) 