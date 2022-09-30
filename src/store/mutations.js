import { tree } from "@/utils/ToTree";
import storage from "storejs";
import router from '@/router';

const mutations = {
  // 更新用户设置
  updateSettings(state, { key, value }) {
    state.settings[key] = value;
    storage.set("setup", state.settings);
  },
  // 更新用户信息
  updateData(state, { key, value }) {
    state.data[key] = value;
    storage.set("userdata", state.data);
  },
  ADD_ROUTE() {
    const table = storage.get("userdata");
    if (!table?.Routingtable) return;
    tree(table.Routingtable);
    table.Routingtable.forEach((item) => {
      router.addRoute(item);
    });
  }
};

export default mutations;
