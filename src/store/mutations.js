import router from '@/router';
import storage from "storejs";
import { tree } from "@/utils/ToTree";
import { USER_DATA, SET_UP } from '@/store/mutation-types';

const mutations = {
  // 更新用户设置
  updateSettings(state, { key, value }) {
    state.settings[key] = value;
  },
  // 更新用户信息
  updateData(state, { key, value }) {
    state.data[key] = value;
  },
  // 添加动态路由
  updataRoute() {
    try {
      const { Routingtable } = storage.get(USER_DATA);
      if (!Routingtable) return;
      tree(Routingtable);
      Routingtable.forEach((item) => {
        router.addRoute(item);
      });
    } catch (error) {
      console.log(error)
    }
  }
};

export default mutations;
