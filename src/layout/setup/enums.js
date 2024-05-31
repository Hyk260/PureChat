import { $t } from "@/plugins/i18n";
import { computed } from "vue";
// const { title } = require("@/config/vueConfig");

export const list = computed(() => {
  return [
    {
      title: $t("common.currency"),
      icon: "ForkSpoon",
    },
    // {
    //   title: `${$t("common.about")} ${title}`,
    //   icon: "WarningFilled",
    // },
    // {
    //   title: "外观",
    //   icon: "IceCreamRound",
    // },
  ];
});

export const options = computed(() => {
  return [
    {
      value: "auto",
      label: $t("common.auto"),
    },
    {
      value: "light",
      label: $t("common.light"),
    },
    {
      value: "dark",
      label: $t("common.dark"),
    },
  ];
});

export const languages = [
  {
    value: "zh-CN",
    label: "简体中文",
  },
  {
    value: "en",
    label: "English",
  },
];
