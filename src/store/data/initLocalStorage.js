const localStorage = {
  // 设置
  settings: {
    sidebar: true, //侧边栏
    logoIcon: true,
  },
  // 用户信息
  data: {
    user: null,
    token: null,
    elTag: [],
    isCollapse: false, //侧边栏是否折叠
    Routingtable: null, //路由表
  },
};

export default localStorage;
