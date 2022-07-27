const home = () => import("@/views/home/index"); //首页
const Editor = () => import("@/views/Editor/index"); //编辑器

const views = {
  Home: home, //首页
  System: home, //系统管理
  Menu: () => import(`@/views/system/menu/index`), //菜单
  User: () => import(`@/views/system/user/index`), //用户
  Role: () => import(`@/views/system/role/index`), //角色
  Editor: home, // 编辑器

  Personal: home, // 个人中心
  Assembly: home, // 组件
  Draggable: () => import(`@/views/assembly/draggable/index`), //拖拽
  Jigsaw: () => import(`@/views/assembly/Jigsaw/index`), //拼图游戏
  Animation: () => import(`@/views/assembly/animation/index`), //动画
  About: home, //关于
};

export default views;
