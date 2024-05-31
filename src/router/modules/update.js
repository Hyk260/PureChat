export default [
  {
    path: "/update",
    name: "Update",
    component: "",
    meta: {
      title: "更新",
      icon: "CloudDownloadOutlined",
    },
    children: [
      {
        path: "/update/full",
        name: "updateFull",
        component: "",
        meta: {
          title: "全量更新",
          icon: "CloudDownloadOutlined",
        },
      },
      {
        path: "/update/increment",
        name: "updateIncrement",
        component: "",
        meta: {
          title: "增量更新",
          icon: "CloudDownloadOutlined",
        },
      },
    ],
  },
];
