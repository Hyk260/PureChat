import {
  createRouter,
  createWebHistory
} from "vue-router";
import storage from "storejs"
import NProgress from 'nprogress'

import { ACCESS_TOKEN } from '@/store/mutation-types'
const Home = () => import("@/views/home/index.vue")
const Login = () => import("@/views/login/index.vue")

// hack router push callback
const originalPush = createRouter.prototype.push
createRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
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
        component: () => import(`@/views/Assembly/draggable/index`),
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
];

const model = [
  {
    path: "/404",
    name: "notFound",
    // component: NotFound,
    meta: {
      title: '页面不存在'
    }
  },
]
// 登录验证白名单
const whiteList = ['login', 'home']
const loginRoutePath = '/login'
const defaultRoutePath = '/home'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

let isF = false  //这个是用于判断动态路由是否已经被获取
// 前置守卫
// router.beforeEach(async (to, from, next) => {
//   // return
//   if (from.path === to.path) return
//   NProgress.start()
//   const token = storage.get(ACCESS_TOKEN)
//   if (token) {
//     if (to.path === loginRoutePath) {
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       // if(store){
        
//       // }else{
//       //   next()
//       // }
//       // next()
//     }
//     next()
//   } else {
//     if (whiteList.includes(to.name)) {
//       next()
//       // next({ path: loginRoutePath })
//       // next({ path: loginRoutePath, query: { redirect: to.fullPath } })
//     } else {
//       next({ path: loginRoutePath, query: { redirect: to.fullPath } })
//       // next({ path: loginRoutePath})
//       NProgress.done()
//     }


//     // if (isF) {
//     //   next();
//     // } else {
//     //   const res = await getMenuNav();
//     //   const addRoute = addData(res.data);//获取动态路由
//     //   // 获取当前默认路由
//     //   const currenRoutes = router.options.routes
//     //   add.forEach((item) => {
//     //     // has用于判断当前路由中是否已经具有，避免重复
//     //     const has = currenRoutes.some(it => it.path == item.path)
//     //     if (!has) {
//     //       currenRoutes.push(item)
//     //     }
//     //   })
//     //   // 将404添加进去
//     //   //现在才添加的原因是：作为一级路由，当刷新，动态路由还未加载，路由就已经做了匹配，找不到就跳到了404
//     //   if (currenRoutes[currenRoutes.length - 1].path != '/:catchAll(.*)') {
//     //     currenRoutes.push({ path: "/:pathMatch(.*)", redirect: "/404" });
//     //   }
//     //   // 将新生成的路由替换原路由
//     //   currenRoutes.forEach(item => {
//     //     router.addRoute(item)
//     //   })
//     //   // 将新生成的路由保存到vuex中
//     //   store.dispatch('setRoutes', currenRoutes);
//     //   // 更改控制生成路由次数的值
//     //   isF = true
//     //   // 跳转
//     //   //确保addRoute()时动态添加的路由已经被完全加载上去，不然刷新页面可能会导致空白
//     //   next({ ...to, replace: true });
//     // }
//   }

// })

// 后置守卫
// router.afterEach(async (to, from, next) => {
//   NProgress.done() // finish progress bar
// })
// 应用场景，进入页面登录判断、管理员权限判断、浏览器判断

export default router;
