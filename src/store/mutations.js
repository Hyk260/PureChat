import router from '@/router';
import storage from "storejs";
import { tree } from "@/utils/ToTree";
import { USER_DATA, SET_UP } from '@/store/mutation-types';

const mutations = {
  // 更新用户设置
  updateSettings(state, { key, value }) {
    state.settings[key] = value;
    storage.set(SET_UP, state.settings);
  },
  // 更新用户信息
  updateData(state, { key, value }) {
    state.data[key] = value;
    storage.set(USER_DATA, state.data);
  },
  // 添加动态路由
  updataRoute() {
    const table = storage.get(USER_DATA);
    if (!table?.Routingtable) return;
    tree(table.Routingtable);
    table.Routingtable.forEach((item) => {
      router.addRoute(item);
    });
  }
};

export default mutations;
