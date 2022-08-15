import storage from "storejs";

export default (store) => {
  store.subscribe((mutation, state) => {
    // storage.set("settings", state.settings); // 全局设置
    // storage.set("data", state.data); // 用户信息
    // console.log(mutation);
  });
};
