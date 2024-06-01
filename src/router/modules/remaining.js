export default [
  { path: "/", redirect: "/chatstudio" },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      icon: "Eleme",
    },
  },
];
