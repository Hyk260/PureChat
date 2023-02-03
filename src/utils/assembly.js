const home = () => import("@/views/home/index"); //首页

const views = {
  Home: home, //首页
  System: home, //系统管理
  // Menu: () => import(/* webpackChunkName: "Menu" */ `@/views/system/menu/index`), //菜单
  Menu: () => import(/* webpackChunkName: "Menu" */ `@/views/system/menu/indexcopy`), //菜单
  User: () => import(/* webpackChunkName: "User" */ `@/views/system/user/index`), //用户
  // Role: () => import(/* webpackChunkName: "Role" */ `@/views/system/role/index`), //角色
  Role: () => import(/* webpackChunkName: "Role" */ `@/views/system/role/indexcopy`), //角色
  ChatStudio: home, // 编辑器

  Personal: home, // 个人中心
  Assembly: home, // 组件
  Draggable: () => import(/* webpackChunkName: "Draggable" */ `@/views/assembly/draggable/index`), //拖拽
  Jigsaw: () => import(/* webpackChunkName: "Jigsaw" */ `@/views/assembly/Jigsaw/index`), //拼图游戏
  Animation: () => import(/* webpackChunkName: "Animation" */ `@/views/assembly/animation/index`), //动画
  About: home, //关于
};

export default views;
