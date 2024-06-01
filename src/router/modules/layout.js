export default [
  {
    path: "/",
    name: "home",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "home",
      icon: "Eleme",
    },
    children: [
      {
        path: "/chatStudio",
        name: "chatStudio",
        component: () => import("@/views/chatStudio/index.vue"),
        meta: {
          title: "聊天工作室",
          locale: "chatStudio",
          icon: "ForkSpoon",
          keep: true,
        },
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "关于",
          locale: "about",
          icon: "Warning",
        },
      },
    ],
  },
];
