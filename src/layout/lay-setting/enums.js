import { $t } from "@/locales/index";
import { computed } from "vue";
import { ModelProvider } from "@/ai/constant";
import { PROVIDER_IDS } from "@/config/webSearchProviders";

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

export const optionsProviders = computed(() => {
  return Object.entries(PROVIDER_IDS).map(([key, value]) => {
    return {
      value,
      label: value,
    };
  }).filter((item) => item.value !== "test");
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
