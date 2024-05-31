import { computed } from "vue";
import { $t } from "@/plugins/i18n";
const operates = computed(() => {
  return [
    // {
    //   title:  $t('login.phoneLogin'),
    //   currentPage: 1,
    // },
    {
      title: $t("login.qRCodeLogin"),
      currentPage: 2,
    },
    {
      title: $t("login.register"),
      currentPage: 3,
    },
  ];
});

const thirdParty = [
  // {
  //   title: "微信",
  //   icon: "wechat",
  // },
  {
    title: "GitHub",
    icon: "github",
  },
  // {
  //   title: "Gitee",
  //   icon: "gitee",
  // },
  // {
  //   title: "QQ",
  //   icon: "qq",
  // },
];

export { operates, thirdParty };
