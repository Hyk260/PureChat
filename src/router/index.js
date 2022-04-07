import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: "/home",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/home/index.vue"),
  },
  // {
  //   path: '/explore',
  //   name: 'explore',
  //   component: () => import(/* webpackChunkName: "explore" */ '@/views/explore/index'),
  // },
  // {
  //   path: '/library',
  //   name: 'library',
  //   component: () => import(/* webpackChunkName: "library" */ '@/views/library/index'),
  // },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
