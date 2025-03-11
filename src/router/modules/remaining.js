export default [
  { path: "/", redirect: "/chat" },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      icon: "Eleme",
    },
  },
  {
    path: "/desktop",
    name: "desktop",
    component: () => import("@/views/desktop/index.vue"),
    meta: {
      title: "desktop",
      icon: "",
    },
  },
];
