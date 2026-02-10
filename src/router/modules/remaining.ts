export default [
  { path: "/", redirect: "/chat" },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "login",
    },
  },
]
