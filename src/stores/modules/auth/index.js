import { defineStore } from "pinia";
import { localStg } from "@/utils/storage";
import { REFRESH_TOKEN, ACCESS_TOKEN } from '@/constants/index';
import { useUserStore } from "../user/index";
import router from "@/router"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStg.get(ACCESS_TOKEN) || "",
    refreshToken: localStg.get(REFRESH_TOKEN) || "",
  }),
  actions: {
    setTokens(accessToken, refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      localStg.set(ACCESS_TOKEN, accessToken);
      localStg.set(REFRESH_TOKEN, refreshToken);
    },
    clearTokens() {
      this.accessToken = '';
      this.refreshToken = '';
      localStg.remove(ACCESS_TOKEN);
      localStg.remove(REFRESH_TOKEN);
    },
    logout() {
      this.clearTokens();
      useUserStore().handleUserLogout();
    }
  },
});
