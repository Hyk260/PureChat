const home = () => import('@/views/home/index') //首页

const views = {
  Home: home, //首页
  SystemManage: home, //系统管理
  Menu: () => import(`@/views/system/menu/index`), //菜单
  User: () => import(`@/views/system/user/index`), //用户
  Role: () => import(`@/views/system/role/index`), //角色
  Editor: home, //编辑器
  Personal: home, // 个人中心
  Assembly: home, //组件
  Draggable: () => import(`@/views/Assembly/draggable/index`), //拖拽
}

export default views;