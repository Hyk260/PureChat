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
        path: "/chat",
        name: "chat",
        component: () => import("@/views/chatStudio/index.vue"),
        meta: {
          title: "chat",
          locale: "chat",
          icon: "ForkSpoon",
          keep: true,
        },
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "about",
          locale: "about",
          icon: "Warning",
        },
      },
    ],
  },
];
