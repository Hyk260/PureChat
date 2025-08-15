import { defineStore } from "pinia";
import { localStg } from "@/utils/storage";
import { useUserStore } from "../user/index";
import { SetupStoreId } from '@/stores/enum';

export const useAuthStore = defineStore(SetupStoreId.Auth, {
  state: () => ({
    accessToken: localStg.get('Access-Token') || "",
    refreshToken: localStg.get('Refresh-Token') || "",
    // accessToken: "",
    // refreshToken: "",
  }),
  actions: {
    setTokens(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      localStg.set('Access-Token', accessToken);
      localStg.set('Refresh-Token', refreshToken);
    },
    clearTokens() {
      this.accessToken = '';
      this.refreshToken = '';
      localStg.remove('Access-Token');
      localStg.remove('Refresh-Token');
    },
    logout() {
      this.clearTokens();
      useUserStore().handleUserLogout();
    }
  },
  // persist: {
  //   pick: ['accessToken', "refreshToken"]
  // },
});
