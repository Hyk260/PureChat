export default [
  { path: "/", redirect: "/chatstudio" },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "Login" */ "@/views/login/index"),
    meta: {
      title: "登录",
      icon: "Eleme",
    },
  },
  // {
  //   path: "/desktop",
  //   name: "desktop",
  //   component: () => import(/* webpackChunkName: "Desktop" */ "@/views/desktop/index"),
  //   meta: {
  //     title: "",
  //     locale: "",
  //     icon: "",
  //   },
  // },
];
