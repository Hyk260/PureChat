/**
 * 
 * keepAlive 需要被缓存的组件
 * 
 */
const Home = () => import("@/views/home/index.vue")
const Login = () => import("@/views/login/index.vue")
const NotFound = () => import("@/views/notfound/index.vue")

const model = [
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      title: '首页'
    },
  },
  // 系统管理
  {
    path: '/system',
    name: 'system',
    component: Home,
    meta: {
      title: '系统管理'
    },
    redirect: '/system/user',
    children: [
      {
        path: '/system/user',
        name: 'user',
        component: () => import(`@/views/system/user/index`),
        meta: {
          icon: "el-icon-more",
          title: "用户权限"
        }
      },
      {
        path: '/system/menu',
        name: 'menu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          icon: "el-icon-more",
          title: "菜单列表"
        },
      },
      {
        path: '/system/role',
        name: 'role',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          icon: "el-icon-more",
          title: "角色权限"
        },
      },
    ],
  },
  // 个人中心
  {
    path: '/personal',
    name: 'personal',
    component: Home,
    meta: {
      title: "个人中心"
    }
  },
  // 组件
  {
    path: '/assembly',
    name: 'assembly',
    component: Home,
    redirect: '/assembly/draggable',
    children: [
      {
        path: '/assembly/draggable',
        name: 'draggable',
        component: () => import(`@/views/assembly/draggable/index`),
        meta: {
          icon: "el-icon-more",
          title: "拖拽"
        }
      },
    ],
  },
  // 编辑器
  {
    path: '/editor',
    name: 'editor',
    component: Home,
    meta: {
      icon: "el-icon-more",
      title: "编辑器"
    }
  },
  {
    path: "/404",
    name: "notFound",
    component: NotFound,
    meta: {
      title: '页面不存在'
    }
  },
]

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  // ...model
];


export default routes
