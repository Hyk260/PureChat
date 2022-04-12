import { 
  createRouter,
  createWebHistory 
} from "vue-router";

const Home = () => import("@/views/home/index.vue");
const Login = () => import("@/views/login/index.vue")

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];
let abc =[
    // 系统管理
  {
    path: '/systemManage',
    name: 'systemManage',
    component: Home,
    redirect:'/systemManage/user',
    children:[
      {
        path: '/systemManage/user',
        name:'user',
        component: () => import(`@/views/user/index`),
        meta:{
          icon: "el-icon-more",
          title: "用户权限"
        }
      },
      {
        path: '/systemManage/menu',
        name: 'menu',
        component: () => import('@/views/menu/index.vue'),
        meta: {
          icon: "el-icon-more",
          title: "菜单列表"
        },
      },
      {
        path: '/systemManage/role',
        name: 'role',
        component: () => import('@/views/role/index.vue'),
        meta: {
          icon: "el-icon-more",
          title: "角色权限"
        },
      },
    ],
  },
  // 个人中心
  {
    path: '/homepage',
    name: 'homepage',
    component: Home,
  },
  // 组件
  {
    path: '/assembly',
    name: 'assembly',
    component: Home,
    children:[
      {
        path: '/assembly/draggable',
        name:'draggable',
        component: () => import(`@/views/draggable/index`),
        meta:{
          icon: "el-icon-more",
          title: "拖拽"
        }
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
