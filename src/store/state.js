import storage from "storejs";

const localStorage = {
  // 设置
  settings: {
    lang: "zh-CN", // 默认语言
    sidebar: true, // 侧边栏隐藏
    logoIcon: true, // login图标
    appearance: "auto", // 主题颜色
    isCollapse: true, // 侧边栏是否折叠
    setswitch: false, // 设置按钮开关
  },
  // 用户信息
  data: {
    // 前端生成的验证码（按实际需求替换）
    verifyCode: '',
    user: null,
    token: null,
    elTag: [], // Tag 标签
    Routingtable: null, // 路由表
  },
};

const data = storage.get("userdata") || localStorage.data; // 账号信息
const settings = storage.get("setup") || localStorage.settings; // 全局设置

const state = {
  data,
  settings,
};

export default state;
