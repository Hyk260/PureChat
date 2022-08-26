import storage from "storejs";

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
};

export default mutations;
