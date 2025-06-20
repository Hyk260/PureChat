import { computed } from "vue";
import { $t } from "@/locales/index";
import { ModelProvider } from "@/ai/constant";

export const list = computed(() => {
  return [
    {
      id: "currency",
      title: $t("common.currency"),
      icon: "Operation",
    },
    {
      id: "webSearch",
      title: $t("settings.webSearch.title"),
      svg_icon: "internet",
    },
    {
      id: "provider",
      title: $t("settings.provider.title"),
      icon: "Postcard",
    },
    {
      id: "about",
      title: $t("common.about"),
      icon: "Warning",
    },
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

export const optionsModel = computed(() => {
  return Object.entries(ModelProvider).map(([key, value]) => {
    return {
      value,
      label: value,
    };
  });
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
