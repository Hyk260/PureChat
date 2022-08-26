import storage from "storejs";
import initLocalStorage from "./data/initLocalStorage";

const data = storage.get("userdata") || initLocalStorage.data; // 账号信息
const settings = storage.get("setup") || initLocalStorage.settings; // 全局设置

const state = {
  data,
  settings,
};

export default state;
