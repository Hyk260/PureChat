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
          keepAlive: true,
        },
      },
      {
        path: "/friends",
        name: "friends",
        component: () => import("@/views/friends/index.vue"),
        meta: {
          title: "friends",
        },
      },
      {
        path: "/discover",
        name: "discover",
        component: () => import("@/views/discover/index.vue"),
        meta: {
          title: "discover",
        },
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "about",
        },
      },
    ],
  },
]
